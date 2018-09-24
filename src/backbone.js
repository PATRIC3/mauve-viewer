
import {schemeCategory20} from './colors';
import {marginTop, trackOffset, yPosOffset, lcbHeight} from './consts';

export class BackBone {

    constructor(params) {
        this.d3 = params.d3;
        this.svg = params.svg;

        this.data = params.data;
        //this.x = params.scale
        this.tracks = params.tracks;

        this.render(this.data);

        return this;
    }

    render(data) {
        // local (not const)
        let x = this.x,
            tracks = this.tracks;

        // compute all LCB midpoints as list of objects through backbone
        let midSets = [];
        data.forEach((lcbs) => {
            let lcbMids = [];
            lcbs.forEach(l => {
                if (l.hidden) return;

                let x = tracks[l.lcb_idx - 1].getZoomScale();

                lcbMids.push({
                    lcb_idx: l.lcb_idx,
                    start: l.start,
                    end: l.end,
                    x:  x(l.start) + ( (x(l.end) - x(l.start))  / 2 ) ,
                    y: marginTop + this._getRegionYPos(l.lcb_idx, l.strand) + (lcbHeight/2)
                });
            })

            midSets.push(lcbMids);
        })

        // draw connections using lineFunction
        // keep line function for scaling
        this.lineFunction = this.d3.line()
            .x(d => d.x)
            .y(d => d.y)

        midSets.forEach((set, i) => {
            this.svg.datum(set)
                .insert("path",":first-child")
                .attr('class', `lcb-line id-${i}`)
                .attr("d", this.lineFunction(set))
                .attr("stroke-width", 1)
                .attr('stroke', schemeCategory20[i % 20])
                .attr('fill', 'none')

        })

        return midSets;
    }

    scale(newScale) {
        this.svg.selectAll('path.lcb-line')
            .attr("d", d => {
                let set = d.map(p => {
                    let newScale = this.tracks[p.lcb_idx - 1].getZoomScale();
                    return {
                        start: p.start,
                        end: p.end,
                        x: newScale(p.start) + ( (newScale(p.end) - newScale(p.start))  / 2 ),
                        y: p.y
                    }
                })

                return this.lineFunction(set)
            });
    }

    getLineFunction() {
        return this.lineFunction;
    }

    _getRegionYPos(trackIdx, strandDirection) {
        return (strandDirection === '-' ? yPosOffset + lcbHeight : yPosOffset) + ((trackIdx-1) * trackOffset);
    }

    /*
    renderTest() {
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
            .force("link", d3.forceLink().id(function(d) { return d.id; }))
            //.force("charge", d3.forceManyBody().strength(-1000))

        let color = d3.scaleOrdinal(schemeCategory20);

        let link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(graph.links)
            .enter().append("line")
            .attr('stroke', '#999')
            .attr("stroke-width", function(d) { return 3; });


        let ticked = () => {
            link.attr("x1", function(d) {
                    console.log('x1', d.source.x)
                    return d.source.x;
                    })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

        }

        simulation
            .nodes(graph.nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(graph.links);
    }*/

}
