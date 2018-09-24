import {schemeCategory20} from './colors';
import {marginTop, trackOffset, yPosOffset, lcbHeight} from './consts';

export class MasterTrack {

    constructor(params) {
        this.d3 = params.d3;
        this.svg = params.svg;

        this.hidden = params.hidden;
        this.id = params.id;
        this.name = params.name;
        this.label = params.label;
        this.width = params.width;
        this.xLength = params.xLength;
        this.regions = params.regions;
        this.yPos = params.yPos || marginTop + (this.id - 1) * trackOffset;


        // render and expose axis/scale
        this.x;
        this.xAxis;
        this.gX;
        this.track;
        this.render();

        return this;
    }

    render() {
        if (this.hidden) {
            this.hiddenTrack();
            return;
        }

        let d3 = this.d3;

        this.x = d3.scaleLinear()
            .domain([0, this.xLength])
            .range([1, this.width + 1]);

        this.xAxis = d3.axisBottom(this.x)
            .ticks(5)
            .tickSize(10)
            .tickFormat(d3.format("d"));

        let g = this.track = this.svg.append('g')
            .attr('class', d => `track master-track id-${this.id}`)

        this.gX = g.append("g")
            .attr('class', `axis axis-x-${this.id}`)
            .call(this.xAxis)
            .attr('transform', `translate(0, ${this.yPos})`);

        // add names
        g.append('text')
            .attr('x', 0)
            .attr('y', this.yPos + trackOffset - 5) // -2 padding
            .text(this.label || this.name)
            .attr('font-family', "sans-serif")
            .attr('font-size', "10px")
            .attr('fill', '#888');

        if (this.regions)
            this.addRegions(this.regions);
    }


    rescaleAxis() {
        console.log('called zoom')
        if (this.hidden) return;

        let srcEvent = this.d3.event.sourceEvent;
        let newScale = this.d3.event.transform.rescaleX(this.x);

        this.gX.call(this.xAxis.scale(newScale));
    }


    _getRegionYPos(trackIdx, strandDirection) {
        return this.yPos + (strandDirection === '-' ? yPosOffset + lcbHeight : yPosOffset);
    }

    reset() {
        this.x = this.d3.scaleLinear()
            .domain([0, this.xLength])
            .range([1, this.width + 1]);
        this.gX.call(this.xAxis);
    }

    getScale() {
        //return this.x

        if (this.zoomScale) {
            //console.log('returning zoom scale')
            return this.zoomScale
        } else {

            //console.log('returning normal scale')
            return this.x

        }


    }


    random(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

}


