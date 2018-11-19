
import MauveViewer from '../src/mauve-viewer';
import { getMauveData, getGenomeLabels } from './utils';
import * as d3 from 'd3';
import axios from 'axios';


document.addEventListener('DOMContentLoaded', () => {
    let ele = document.getElementById('chart');
    let statusHandle = loading(ele);

    // get alignment
    let lcbsPath = ele.getAttribute('data-lcb-file');
    axios.get(lcbsPath).then(res => {
        let data = res.data;

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
                clearInterval(statusHandle);
                new MauveViewer({
                    ele, d3, data,
                    labels, features, contigs
                });
            }).catch(e => {
                clearInterval(statusHandle);
                ele.innerHTML = `<br>Something has gone wrong. ` +
                    `Please feel free to report this.<br><br>` +
                    `Error: ${e.message}`;
            });
    });
});


function loading(ele) {
    let i = 0;
    let handle = setInterval(() => {
        ele.innerHTML = `<br>loading${'.'.repeat(i % 4)}`;
        i += 1;
    }, 300);

    return handle;
}
