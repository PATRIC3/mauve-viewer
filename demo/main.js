
import MauveViewer from '../src/mauve-viewer';


function main() {

    Promise.all([import('d3'), import('axios')]).then(([d3, axios]) => {
        axios.get(`more-brucella.json`).then(res => {
            let ele = document.getElementById('chart');
            let data = res.data;
            let chart = new MauveViewer({ele, data, d3});
        }).catch(e => {
            console.log('error!', e)
        })
    }).catch(error => 'An error occurred while loading the component');

}


main();


