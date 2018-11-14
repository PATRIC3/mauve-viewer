
import MauveViewer from '../src/mauve-viewer';
import { getMauveData, getGenomeLabels } from './utils';
import * as d3 from 'd3';
import axios from 'axios';


// get alignment
axios.get(`data/more-brucella.json`).then(res => {
    let data = res.data;
    let ele = document.getElementById('chart');

    // use organism labels for each track (optional)
    let ext;
    let ids = [];
    data.forEach(lcbs => {
        lcbs.forEach(r => {
            ext = r.name.split('.').pop();
            let name = r.name.replace(`.${ext}`, '');
            if (!ids.includes(name)) ids.push(name);
        });
    });

    getMauveData({genomeIDs: ids, ext})
        .then(({labels, contigs, features}) => {
            new MauveViewer({
                ele, data, d3,
                labels, features, contigs
            });
        });
});
