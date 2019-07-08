
import axios from 'axios';

const api = 'https://p3.theseed.org/services/data_api';

const featureSelect = [
    'patric_id', 'sequence_id', 'start', 'end',
    'strand', 'annotation', 'feature_type',
    'product', 'accession', 'refseq_locus_tag', 'gene'
];

const contigSelect = [
    'topology', 'gi', 'accession', 'length',
    'sequence_id', 'gc_content', 'chromosome',
    'sequence_type', 'chromosome', 'description'
];

export function getFeatures(genomeIDs) {
    genomeIDs = Array.isArray(genomeIDs) ? genomeIDs : [genomeIDs];

    let proms = genomeIDs.map(id => {
        let url = `${api}/genome_feature/?eq(genome_id,${id})` +
            `&select(${featureSelect})&eq(annotation,PATRIC)&ne(feature_type,source)&limit(25000)`;
        return axios.get(url).then(res => res.data);
    });

    return axios.all(proms);
}

export function getContigs(genomeIDs) {
    genomeIDs = Array.isArray(genomeIDs) ? genomeIDs : [genomeIDs];

    let proms = genomeIDs.map(id => {
        let url = `${api}/genome_sequence/?eq(genome_id,${id})` +
            `&select(${contigSelect.join(',')})&sort(-length,+sequence_id)&limit(25000)`;
        return axios.get(url).then(res => res.data);
    });

    return axios.all(proms);
}

export function getGenomeLabels({genomeIDs, ext}) {
    let url = `${api}/genome/?in(genome_id,(${genomeIDs.join(',')}))` +
        `&select(genome_id,genome_name)`;
    return axios.get(url)
        .then(res => res.data)
        .then(data => {
            let mapping = {};
            data.forEach(org => {
                mapping[`${org.genome_id}.${ext}`] = org.genome_name;
            });
            return mapping;
        });
}

export function setFeaturePositions(contigs, features) {
    let newFeatures = [];
    let ntPos = 0;
    contigs.forEach(c => {
        // get all features in this contig
        let contigFeatures = features.filter(f => f.sequence_id == c.sequence_id);

        // set xStart/xEnd using contig's start/end
        contigFeatures = contigFeatures.map(f => {
            f.xStart = ntPos + f.start;
            f.xEnd = ntPos + f.end;
            return f;
        });

        newFeatures = newFeatures.concat(contigFeatures);
        ntPos += c.length;
    });

    return newFeatures;
}

function setContigPositions(contigs) {
    let ntPos = 1;
    contigs.forEach(c => {
        c.xStart = ntPos;
        c.xEnd = ntPos + c.length - 1;
        ntPos += c.length;
    });

    return contigs;
}

export function getData({genomeIDs, ext}) {
    let nameProm = getGenomeLabels({genomeIDs, ext});

    let featProm = getFeatures(genomeIDs)
        .then(data => {
            let mapping = {};
            genomeIDs.forEach((id, i) => { mapping[id] = data[i]; });

            return mapping;
        });

    let contigProm = getContigs(genomeIDs)
        .then(data => {
            let mapping = {};
            genomeIDs.forEach((id, i) => { mapping[id] = data[i]; });
            return mapping;
        });

    return axios.all([nameProm, featProm, contigProm])
        .then(([labels, featuresObj, contigsObj]) => {
            // update contig metas with locations of contigs
            let contigs = {};
            genomeIDs.forEach((genomeID, i) => {
                contigs[genomeID] = setContigPositions(contigsObj[genomeID]);
            });

            // update feature metas with locations of features
            let features = {};
            Object.keys(contigs).forEach(gid => {
                features[gid] = setFeaturePositions(contigs[gid], featuresObj[gid]);
            });

            return {labels, contigs, features};
        });
}

