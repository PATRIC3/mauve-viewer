
requirejs.config({
    // By default load any module IDs from js/lib
    baseUrl: '../../dist',
    // except, if the module ID starts with "app",
    // load it from the js/app directory. paths
    // config is relative to the baseUrl, and
    // never includes a ".js" extension since
    // the paths config could be for a directory.

});

// Start the main app logic.
requirejs([
    'mauve-viewer', '../../node_modules/d3/dist/d3', '../../node_modules/axios/dist/axios'
], function(MauveViewer, d3, axios) {
    let ele = document.getElementById('chart');

    axios.get(`../data/brucella-lcbs.json`).then(res => {
        let lcbs = res.data;
        let chart = new MauveViewer({
            d3: d3,
            lcbs: lcbs,
            ele: ele
        });
    }).catch(error => { alert('An error occurred while loading the component') });
});
