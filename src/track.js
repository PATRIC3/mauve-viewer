import {schemeCategory20} from './colors';
import {marginTop, trackOffset, yPosOffset, lcbHeight} from './consts';

export class Track {

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

        let d3 = this.d3,
            svg =this.svg



        this.x = d3.scaleLinear()
            .domain([0, this.xLength])
            .range([1, this.width + 1]);

        this.xAxis = d3.axisBottom(this.x)
            .ticks(5)
            .tickSize(10)
            .tickFormat(d3.format("d"));

        let g = this.track = this.svg.append('g')
            .attr('class', d => `track id-${this.id}`)

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

    addRegions(regions) {
        let numOfLCBs = regions.length;

        // add regions
        this.track.selectAll('rect')
            .data(regions)
            .enter()
            .append('rect')
            .attr('class', d => `region track-id-${this.id} group-${d.groupID} id-${d.id}`)
            .attr('x', d => this.x(d.start))
            .attr('y', d => this._getRegionYPos(this.id, d.strand))
            .attr('width', d => this.x(d.end - d.start))
            .attr('height', lcbHeight)
            .attr('stroke', '#fffff')
            .attr('fill', d =>  schemeCategory20[(d.groupID % numOfLCBs) % 20] )

        this.regions = regions;
    }

    hiddenTrack() {
        let g = this.track
            .append('g')
            .attr('class', d => `hidden-track`)

        g.append('rect')
            .attr('class', d => `hidden-track track-${this.id}`)
            .attr('x', 0)
            .attr('y', d => (this.id-1) * trackOffset )
            .attr('width', d => 10000)
            .attr('height', 20)
            .attr('stroke', '#fffff')
            .attr('fill', d =>  '#aaa')

        g.append('text')
            .attr('x', 10)
            .attr('y', this.yPos - 2) // -2 padding
            .text(this.label || this.name)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", '#222');
    }

    rescaleAxis() {
        console.log('called zoom')
        if (this.hidden) return;

        let srcEvent = this.d3.event.sourceEvent;
        let newScale = this.d3.event.transform.rescaleX(this.x);

        this.gX.call(this.xAxis.scale(newScale));

        // scale this track's rectangles
        if (!srcEvent || srcEvent.type === 'wheel' || srcEvent.type === 'click') {
            this._scaleRegions(newScale)
        } else if ((this.d3.event.sourceEvent.type === 'mousemove')) {
            this._panRegions(newScale)
        }

       this.zoomScale = newScale;
    }

    _scaleRegions(newScale) {
        this.track.selectAll('.region')
            .attr('x', (d) => newScale(d.start))
            .attr("width", (d) => newScale(d.end) - newScale(d.start))
    }

    _panRegions(newScale) {
        this.track.selectAll('.region')
            .attr("x", (d) => newScale(d.start) );
    }


    _getRegionYPos(trackIdx, strandDirection) {
        return this.yPos + (strandDirection === '-' ? yPosOffset + lcbHeight : yPosOffset);
    }

    // shifts track by xPos,
    // takes new shift position and call back
    // call back returns new scale
    shift(newX, scaleToUse, cb) {
        let d3 = this.d3;

        let scale = this.getZoomScale();
        let xPos = scale.invert(newX)

        let domain1 = [scale.domain()[0], scale.domain()[1]],
            domain2 = [scale.domain()[0] - xPos, scale.domain()[1]- xPos];

        console.log(domain1, domain2)

        console.log('scale before transition', this.id, 'is', this.x.domain())
        this.gX.transition().tween("axis", (d) => {
            let i = d3.interpolate(domain1, domain2);
            return (t) => {
                this.x.domain(i(t));
                this.gX.call(this.xAxis);

                this.zoomScale = this.x
                console.log('newscale for', this.id, 'is', this.x.domain())
                cb()
            }
        })
    }

    reset() {
        this.x = this.d3.scaleLinear()
            .domain([0, this.xLength])
            .range([1, this.width + 1]);

        this.gX.call(this.xAxis);
    }

    getScale() {
        return this.x
    }

    getZoomScale() {
        if (this.zoomScale) {
            return this.zoomScale
        } else {
            return this.x
        }
    }

    random(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

}


