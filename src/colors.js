
let schemeCategory20 = [
    'rgb(31, 119, 180)',
    'rgb(174, 199, 232)',
    'rgb(255, 127, 14)',
    'rgb(255, 187, 120)',
    'rgb(44, 160, 44)',
    'rgb(152, 223, 138)',
    'rgb(214, 39, 40)',
    'rgb(255, 152, 150)',
    'rgb(148, 103, 189)',
    'rgb(197, 176, 213)',
    'rgb(140, 86, 75)',
    'rgb(196, 156, 148)',
    'rgb(227, 119, 194)',
    'rgb(247, 182, 210)',
    'rgb(127, 127, 127)',
    'rgb(199, 199, 199)',
    'rgb(188, 189, 34)',
    'rgb(219, 219, 141)',
    'rgb(23, 190, 207)',
    'rgb(158, 218, 229)'
];

const schemeCategory20Hex = [
    '#1f77b4',
    '#aec7e8',
    '#ff7f0e',
    '#ffbb78',
    '#2ca02c',
    '#98df8a',
    '#d62728',
    '#ff9896',
    '#9467bd',
    '#c5b0d5',
    '#8c564b',
    '#c49c94',
    '#e377c2',
    '#f7b6d2',
    '#7f7f7f',
    '#c7c7c7',
    '#bcbd22',
    '#dbdb8d',
    '#17becf',
    '#9edae5'
];

function darken() {
    let factor = 0.45;
    let alpha = 0.5;

    let darker = schemeCategory20.map(str => {
        let parts = str.replace('rgb(', '').replace(')', '').split(', ');
        let r = Math.round(parts[0] * factor),
            g = Math.round(parts[1] * factor),
            b = Math.round(parts[2] * factor);

        return `rgb(${r},${g},${b},${alpha})`;
    });

    return darker;
}
// schemeCategory20 = darken()

module.exports = {
    schemeCategory20
};
