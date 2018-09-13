import {schemeCategory20} from './colors';
import {trackOffset, yPos, lcbHeight} from './consts';


export class Track {

    constructor(params) {
        this.d3 = params.d3;
        this.svg = params.svg;

        this.id = params.id;
        this.name = params.name;
        this.label = params.label;
        this.pos = params.pos;
        this.width = params.width;
        this.height = params.height;
        this.xLength = params.xLength;

        // render and expose axis/scale
        let parts = this.render();
        this.x = parts.x;
        this.xAxis = parts.xAxis;
        this.gX = parts.gX;

        this.regions;

        return this;
    }

    render() {
        let d3 = this.d3;

        let x = d3.scaleLinear()
            .domain([0, this.xLength])
            .range([0, this.width + 1]);

        let xAxis = d3.axisBottom(x)
            .ticks((this.width + 2) / (this.height + 2) * 10)
            .tickSize(10)

        let gX = this.svg.append("g")
            .attr("class", `axis axis-x-${this.id}`)
            .call(xAxis)
            .attr("transform", `translate(0, ${this.pos})`);

        // add names
        this.svg.append('text')
            .attr('x', 10)
            .attr('y', this.pos - 2) // -2 padding
            .text(this.label || this.name)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", '#aaaaaa');

        return {x, gX, xAxis};
    }

    addRegions(regions) {
        let numOfLCBs = regions.length;

        let g = this.svg.select('g')
            .append('g')
            .attr('class', d => `track`)

        // add regions
        g.selectAll('rect')
            .data(regions)
            .enter()
            .append('rect')
            .attr('class', d => `region region-track-${d.lcb_idx} region-${d.id} group-${d.groupID}`)
            .attr('x', d => this.x(d.start))
            .attr('y', d => this._getRegionYPos(d.lcb_idx, d.strand))
            .attr('width', d => this.x(d.end - d.start))
            .attr('height', lcbHeight)
            .attr('stroke', '#fffff')
            .attr('fill', d =>  schemeCategory20[(d.groupID % numOfLCBs) % 20] )

        this.regions = regions;
    }

    rescaleAxis() {
        this.gX.call(this.xAxis.scale(this.d3.event.transform.rescaleX(this.x)));
    }

    _getRegionYPos(trackIdx, strandDirection) {
        return (strandDirection === '-' ? yPos + lcbHeight : yPos) + ((trackIdx-1) * trackOffset);
    }
}
