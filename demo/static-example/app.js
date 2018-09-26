
requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: '../../dist',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.

});

// Start the main app logic.
requirejs(['../../node_modules/d3/dist/d3', '../../node_modules/axios/dist/axios'],
function(d3, axios) {
    console.log('here', document)

        let ele = document.getElementById('chart');
        console.log('chart',ele)

        axios.get(`../brucella-lcbs.json`).then(res => {
            console.log('response', res)
            let data = res.data;
            let chart = new MauveViewer.default({data, d3, ele})
        })


});