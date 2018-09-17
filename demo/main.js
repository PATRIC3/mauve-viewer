
import MauveViewer from '../src/mauve-viewer';

const api = 'https://p3.theseed.org/services/data_api/genome/'

function main() {

    Promise.all([import('d3'), import('axios')]).then(([d3, axios]) => {

        axios.get(`more-brucella.json`).then(res => {
            let data = res.data;
            let ele = document.getElementById('chart');

            // use different labels for each track (optional)
            // Todo: store list of names in alginment file
            let ext;
            let ids = [...data.map(
                lcbs => lcbs.map(lcb => {
                    ext = lcb.name.split('.').pop();
                    return lcb.name.replace(`.${ext}`, '');
                })
            )].filter((val, i, a) => a.indexOf(val) === i)

            let url = `${api}?in(genome_id,(${ids.join(',')}))&select(genome_id,genome_name)`;
            axios.get(url)
                .then(res => {
                    let mapping = {};
                    res.data.forEach(org => {
                        mapping[`${org.genome_id}.${ext}`] = org.genome_name;
                    })

                    new MauveViewer({ele, data, d3, labels: mapping});
                })

        }).catch(e => {
            alert(`Could not fetch alignment json: ${e.message}`)
        })
    }).catch(error => 'An error occurred while loading the component');

}

main();