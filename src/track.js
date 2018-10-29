import {trackOffset, yPosOffset, lcbHeight, featureHeight} from './consts';


const showGaps = false;

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
        this.features = params.features;
        this.yPos = params.yPos;

        this.backbone = params.backbone;


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

        let g = this.track = svg.append('g')
            .attr('class', d => `track id-${this.id}`)

        g.append('g').attr('class', 'regions')

        this.gX = g.append("g")
            .attr('class', `axis axis-x-${this.id}`)
            .call(this.xAxis)
            .attr('transform', `translate(0, ${this.yPos})`);

        // add names
        this.setLabel(this.label || this.name)

        if (this.regions)
            this.addRegions(this.regions);
    }

    addRegions(regions) {
        // add regions
        this.track.select('.regions').selectAll('rect')
            .data(regions)
            .enter()
            .append('rect')
            .attr('class', d => `region track-id-${this.id} group-${d.groupID} id-${d.id}`)
            .attr('x', d => this.x(d.start))
            .attr('y', d => this._getRegionYPos(d.strand))
            .attr('width', d => this.x(d.end - d.start + 1))
            .attr('height', lcbHeight)
            .attr('stroke', '#fffff')
            .attr('fill', d =>  d.color)
           //.attr('opacity', .5)

        this.regions = regions;

        // if object does not have gaps list, we're done
        // if (regions.length && !('gaps' in regions[0])) return;
        if (showGaps) this.addGaps();
    }


    updateFeatures(start, end) {
        this.rmFeatureHoverEvent();

        let features = this.features.filter(f =>
            (f.start < start && f.end >= start) ||
            (f.start < end && f.end >= end) ||
            (f.start >= start && f.end <= end)
        )

        let feats = this.track.selectAll('.feature')
            .data(features)

        feats.exit().remove();

        feats = feats.enter().append('rect')
            .attr('class', d => `feature`)
            .merge(feats)
            .attr('x', d => this.x(d.start))
            .attr('y', d =>  this._getFeatureYPos(d.strand) + lcbHeight*2 + 5)
            .attr('width', d => this.x(d.end - d.start + 1))
            .attr('height', 10)
            .attr('stroke', '#000')
            .attr('fill', d => '#777' )
            .attr('opacity', .5)

        this.addFeatureHoverEvent();
        this.showAnnotations = true;

        // also hide connections
        this.svg.selectAll('.lcb-line').attr('opacity', 0)

    }


    rmFeatures() {
        this.svg.selectAll('.feature').remove();
        this.rmFeatureHoverEvent();
        this.showAnnotations = false;

        // show connections again
        this.svg.selectAll('.lcb-line').attr('opacity', 1.0)
    }

    addGaps() {
        let g = this.track.append('g')
            .attr('class', `gaps`)

        regions.forEach((region, i)=> {
            //console.log('region', regi
            // add in track index
            region.gaps.forEach(gap => {
                gap.lcb_idx = region.lcb_idx;

                // Todo: fix parser offset
                if (gap.end > region.end) {
                    console.warn('gap issue (region , gap):', region, gap)
                }

                // local relative start/end, considering direction
                gap.s = region.strand == '+' ? gap.start : region.end - gap.start;
                gap.e = region.strand == "+" ? gap.end : region.end - gap.end;

                // global start/end
                gap.start = region.start + gap.s;
                gap.end = region.start + gap.e;
            });

            this.track.selectAll('rect.gap'+i)
                .data(region.gaps)
                .enter()
                .append('rect')
                .attr('class', d => `region gap`)
                .attr('x', d => this.x(d.start))
                .attr('y', d => this._getRegionYPos(region.strand))
                .attr('width', d => this.x(d.e - d.s + 1))
                .attr('height', lcbHeight)
                .attr('fill', d =>  '#666')
        })
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
        if (this.hidden) return;

        let srcEvent = this.d3.event.sourceEvent;
        let newScale = this.d3.event.transform.rescaleX(this.x);

        // get start and stop of zoomed domain
        let s = newScale.domain()[0],
            e = newScale.domain()[1];

        // add features based on zoomed domain
        let meetsThres = (e - s <= 100000);
        if (meetsThres) {
            this.updateFeatures(s, e);
        } else if (!meetsThres && this.showAnnotations ){
            this.rmFeatures();
        }

        this.gX.call(this.xAxis.scale(newScale));

        // scale this track's regions
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
            .attr("width", (d) => newScale(d.end + 1)  - newScale(d.start))

        this.track.selectAll('.feature')
            .attr('x', (d) => newScale(d.start))
            .attr("width", (d) => newScale(d.end + 1)  - newScale(d.start));
    }

    _panRegions(newScale) {
        this.track.selectAll('.region')
            .attr("x", (d) => newScale(d.start) );

        this.track.selectAll('.feature')
            .attr("x", (d) => newScale(d.start) )
            .attr("width", (d) => newScale(d.end + 1)  - newScale(d.start));
    }

    _getRegionYPos(strandDirection) {
        return this.yPos + (strandDirection === '-' ? yPosOffset + lcbHeight : yPosOffset);
    }
    _getFeatureYPos(strandDirection) {
        return this.yPos + (strandDirection === '-' ? yPosOffset + featureHeight : yPosOffset);
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

        this.gX.transition().tween("axis", (d) => {
            let i = d3.interpolate(domain1, domain2);
            return (t) => {
                this.x.domain(i(t));
                this.gX.call(this.xAxis);

                this.zoomScale = this.x
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

    setLabel(label) {
        this.track.selectAll('.track-label').remove();

        this.track.append('text')
            .attr('class', 'track-label')
            .attr('x', 0)
            .attr('y', this.yPos - 3 ) // -3 padding
            .text(label)
            .attr('font-family', "sans-serif")
            .attr('font-size', "10px")
            .attr('fill', '#888');
    }


    addFeatureHoverEvent() {
        let d3 = this.d3;

        let tooltip = d3.select('.mauve-viewer')
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        this.svg.selectAll('.feature')
            .on('mouseover', (d) => {
                tooltip.transition()
                    .style("opacity", .9);


                let pageX = d3.event.pageX,
                    pageY = d3.event.pageY;

                tooltip.html(
                        `${d.feature_type} [${d.start}, ${d.end}]<br>
                        ${d.product}`
                    )
                    .style("left", pageX  - 150+ "px")
                    .style("top", pageY - 28 + "px");
            }).on('mouseout', (d) => {
                tooltip.transition()

                .style("opacity", 0);
            });
    }


    rmFeatureHoverEvent() {
        this.svg.selectAll('.feature')
            .on('mouseover', null)
            .on('mouseout', null)

        this.d3.selectAll('.tooltip').remove()
    }

}


