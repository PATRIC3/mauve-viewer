# mauve-viewer

A JavaScript Mauve/.xmfa viewer for multiple whole genome alignments.   The UI is highly inspired by the original [Mauve](http://darlinglab.org/mauve/mauve.html) viewer, with web/application integration in mind.  Note this is a __work in progress__.

[Demo](https://nconrad.github.io/mauve-viewer/demo/)


## Why?

The original viewer [Mauve](http://darlinglab.org/mauve/mauve.html) viewer is great, but it's written and Java and doesn't run in the browser.  I'm particularly interested in creating a general purpose solution for genome alignment tools, such as [Mummer4](https://github.com/mummer4/mummer).

Collaboration is welcome!



## Features

- panning, scaling, zoom
- tooltips (TODO: make customizable)

#### Upcoming:

- SVG Download
- Performance improvements?


## Dependencies


- [d3](https://github.com/d3/d3) v5.0+

MauveViewer does not currently package d3.js and takes a reference to `d3` when instantiating the viewer.  See below.


## Usage

*First, sure the CSS is included:*
```
<link rel="stylesheet" type="text/css" href="dist/heatmap.css">
```


#### Global

Add the required CSS/JS:

```
<script src="https://d3js.org/d3.v5.min.js"></script>
<script src="dist/heatmap.js"></script>
```

#### ES6

```
import * as d3 from 'd3';
import Heatmap from 'dist/heatmap';
```

#### AMD

```javascript
requirejs.config({
    baseUrl: 'dist',
});

requirejs([
    'heatmap', 'path/to/d3'
], function (Heatmap, d3) {
    ...
})
```

### Basic Example Config

```javascript
let mauveViewer = new MauveViewer({
    d3: d3,
    ele: document.querySelector('mauve-viewer'),
    lcbs: [
        [
            {
                "name": "track 1",
                "start": 200,
                "end": 300,
                "strand": "+",
                "lcb_idx": 1
            },
            {
                "name": "track 2",
                "start": 100,
                "end": 200,
                "strand": "+",
                "lcb_idx": 2
            }
        ]
    ]
})
```

### Config

| Param                 | Type                              | Required? |
|-----------------------|-----------------------------------|-----------|
| d3                    | instance of d3                    | &check;   |
| ele                   | DOM element                       | &check;   |
| [lcbs](#lcbs)         | LCBs (list of lists)              | &check;   |
| [labels](#labels)     | Object (see below)                | -         |
| [features](#features) | Object (see below)                | -         |
| [contigs](#contigs)   | Object (see below)                | -         |


### Event Callbacks

| Param          | Type                | Required? | Default |
|----------------|---------------------|-----------|---------|
| onFeatureClick | function(Object) {} | -         | -       |


##### lcbs

Each LCB is grouped as an Array of Objects.  To parse `.xmfa` files, one option is using this [script](https://github.com/PATRIC3/p3_mauve/blob/master/scripts/mauve-parser.js), which is based on [biojs-io-xmfa](https://github.com/erasche/biojs-io-xmfa) (and embraces the same format).  It can be ran like so:

```
npm install
./mauve-parser.js --input <path_to_xmfa> > output.xmfa
```


```javascript
[
    [
        {
            "name": "224914.11.fasta",
            "start": 200,
            "end": 300,
            "strand": "+",
            "lcb_idx": 1
        },
        {
            "name": "organism2.fasta",
            "start": 100,
            "end": 200,
            "strand": "+",
            "lcb_idx": 2
        }
    ], ...
]
```

##### labels (optional)

This is a mapping from the `name` of the fasta file to a more meaningful name (such as organism name)

```javascript
{
    "204722.5.fasta": "Brucella suis 1330",
    "444178.3.fasta": "Brucella ovis ATCC 25840",
    "224914.11.fasta": "Brucella melitensis bv. 1 str. 16M",
    "262698.4.fasta": "Brucella abortus bv. 1 str. 9-941",
    "483179.4.fasta": "Brucella canis ATCC 23365"
}
````

##### features (optional)

```javascript
{
    "224914.11": [
        {
            "annotation": "PATRIC",
            "feature_type": "tRNA",
            "patric_id": "fig|224914.11.rna.23",
            "product": "tRNA-Met-CAT",
            "strand": "+",
            "sequence_id": "NC_003317",
            "start": 558758,
            "end": 558834,
            "accession": "NC_003317",
            "xStart": 558758,
            "xEnd": 558834
        },
        ...
    ], ...
}
```

##### contigs (optional)

```javascript
{
    "224914.11": [
        {
            "gi": 17986284,
            "sequence_type": "chromosome",
            "topology": "circular",
            "chromosome": "I",
            "length": 2117144,
            "sequence_id": "NC_003317",
            "description": "Brucella melitensis 16M chromosome I, complete sequence.",
            "accession": "NC_003317",
            "gc_content": 57.2,
            "xStart": 1,
            "xEnd": 2117144
        }, ...
    ], ...
}
```



## Development

### Local Installation

```
npm install
```


### Development

```
npm start
```


### Build

```
npm run build
```

This creates a new build in `dist/`.


## Author(s)

[nconrad](https://github.com/nconrad)



## Citation

Paper pending.  In the meantime, please cite this repo:

N. Conrad, A Whole Genome Alignment Visualization Tool for the Web, (2019), GitHub repository, https://github.com/nconrad/mauve-viewer


## License

Released under [the MIT license](https://github.com/nconrad/mauve-viewer/blob/master/LICENSE).



