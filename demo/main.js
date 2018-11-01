
import MauveViewer from '../src/mauve-viewer';
import { getMauveData } from './utils';


Promise.all([import('d3'), import('axios')]).then(([d3, axios]) => {

    // get alignment
    axios.get(`data/more-brucella.json`).then(res => {
        let data = res.data;
        let ele = document.getElementById('chart');

        // use organism labels for each track (optional)
        let ext;
        let ids = []
        data.forEach(lcbs => {
            lcbs.forEach(r => {
                ext = r.name.split('.').pop();
                let name = r.name.replace(`.${ext}`, '');
                if (!ids.includes(name)) ids.push(name);
            })
        })

        getMauveData({genomeIDs: ids, ext})
            .then(({labels, contigs, features}) => {
                new MauveViewer({
                    ele, data, d3,
                    labels, features, contigs
                });
            }).catch(e => {
                alert('Could not fetch associated genome data.')
            })
    })

}).catch(error => 'An error occurred while loading the component');
