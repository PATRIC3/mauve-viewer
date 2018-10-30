
// mauve-viewer.js scratch


//Todo: testing, remove
//this.data.forEach(lcb => {
//    lcb.forEach(region => {
//        region.strand = '+';
//    })
//})

var rect = this.rect = svg.append("rect")
            .attr('class', 'zoom-box')
            .attr("width",  1000)
            .attr("height", trackCount * 165)
            .style("fill", 'none')
            .style("pointer-events", "all");


let masterTrack = this.masterTrack =  new MasterTrack({
    d3, svg,
    yPos: yPos += trackOffset,
    id: trackCount+1,
    name: 'master',
    label: 'master',
    container: this.ele,
    width, xLength
})
tracks.push(masterTrack)



function renderTest() {
    let d3 = this.d3,
        svg = this.svg,
        x = this.x;

    let graph = {nodes: [], links: []};

    let node =[]

    let self = this;
    this.data.forEach((group,i) => {
        svg.selectAll(`.group-${i}`).each(function(l) {
            graph.nodes.push({
                id: l.id,
                start: l.start,
                end: l.end,
                x:  x(l.start) + ( (x(l.end) - x(l.start))  / 2 )  ,
                y: marginTop + self._getRegionYPos(l.lcb_idx, l.strand) + (lcbHeight/2)
            });

            node.push(this)
        })
    })
    node = d3.select(node);

    this.data.forEach(group => {

        group.forEach((lcb, i)=> {
            // ignore empty regions
            if (lcb.end == 0) return;

            if (i == 0) return;
            graph.links.push({source: group[i-1].id, target: lcb.id});
        })
    })


    let simulation = d3.forceSimulation()
        .force('link', d3.forceLink().id(function(d) { return d.id; }))
        //.force('charge', d3.forceManyBody().strength(-1000))

    let color = d3.scaleOrdinal(schemeCategory20);

    let link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(graph.links)
        .enter().append('line')
        .attr('stroke', '#999')
        .attr('stroke-width', function(d) { return 3; });


    let ticked = () => {
        link.attr('x1', function(d) { return d.source.x; })
            .attr('y1', function(d) { return d.source.y; })
            .attr('x2', function(d) { return d.target.x; })
            .attr('y2', function(d) { return d.target.y; });

    }

    simulation
        .nodes(graph.nodes)
        .on('tick', ticked);

    simulation.force('link')
        .links(graph.links);
    }


    data.forEach((lcbs) => {
        let lcbMids = [];
        lcbs.forEach((l, i) => {
            if (l.hidden) return;

            let x = tracks[l.lcb_idx - 1].getZoomScale();

            let obj = {
                color: l.color,
                lcb_idx: l.lcb_idx,
                start: l.start,
                end: l.end,
                x: x(l.start) + ( (x(l.end + 1) - x(l.start))  / 2 ),
                y: null
            }

            // if first track
            if (l.lcb_idx == 1) {
                obj.y =  this._getRegionYPos(l.lcb_idx, l.strand) + (lcbHeight/2);
                lcbMids.push(obj);

                obj.y = marginTop + this._getRegionYPos(l.lcb_idx, l.strand) + lcbHeight + 10;
                lcbMids.push(obj);
                return;
            }

            // if last track
            if (l.lcb_idx == this.tracks.length) {
                obj.y = marginTop + this._getRegionYPos(l.lcb_idx, l.strand) - lcbHeight - 10;
                lcbMids.push(obj);

                obj.y = marginTop + this._getRegionYPos(l.lcb_idx, l.strand) + (lcbHeight/2)
                lcbMids.push(obj);
                return
            }




            obj.y = marginTop + this._getRegionYPos(l.lcb_idx, l.strand) - lcbHeight - 10;
            lcbMids.push(obj);
            obj.y = marginTop + this._getRegionYPos(l.lcb_idx, l.strand) + (lcbHeight/2);
            lcbMids.push(obj);
            obj.y = marginTop + this._getRegionYPos(l.lcb_idx, l.strand) + lcbHeight + 10
            lcbMids.push(obj);
        })
    })
}
