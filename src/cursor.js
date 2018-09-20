// Todo: listen for mousemove on track container

import {marginTop, yPosOffset, lcbHeight, trackOffset} from './consts';

export class Cursor {

    constructor(params) {
        this.container = params.container;
        this.d3 = params.d3;
        this.svg = params.svg;
        this.scale = params.scale;
        this.trackCount = params.trackCount;

        this.hoverLines = [];

        this.render();

        return this;
    }

    render() {
        // draw the track cursor once and update
        // position for better performance
        for (let i=1; i <= this.trackCount; i++) {
            let yPos = this._getRegionYPos(i, '-');
            let line = this.svg.append('line')
                .attr('class', 'hover-line')
                .style('stroke', '#222' )
                .attr('y1', marginTop + yPos - 30)
                .attr('y2', marginTop + yPos + 30)

            this.hoverLines.push(line);
        }

        this.resetHover(this.scale);
    }

    resetHover(scale) {
        let svg = this.svg,
            d3 = this.d3,
            lines = this.hoverLines;

        svg.selectAll('.track')
            .on("mouseover", null)
            .on("mousemove", null)
            .on("mouseout", null);

        let lengthNode = this.container.querySelector('.lcb-length'),
            ntPosNode = this.container.querySelector('.nt-pos');

        let x = scale;

        svg.selectAll('.track')
            .on("mouseover", function(d) {
                for (let i=0; i < lines.length; i++) {
                    lines[i].attr("opacity", 1.0)
                }
            })
            .on("mousemove", function() {
                let clientX = d3.event.clientX,
                    clientY = d3.event.clientY;
                let ele = document.elementFromPoint(clientX, clientY);
                let d = d3.select(ele).data()[0];

                if (!ele) return;

                // ignore non-regions
                if (ele.tagName !== 'rect' || !d || !('lcb_idx' in d)) {
                    if (ele.classList.contains('cursor-line')) {
                        return;
                    }

                    // if not region, hide cursors
                    for (let i=0; i < lines.length; i++) {
                        lines[i].attr("opacity", 0);
                    }
                    return;
                }

                let xPos = d3.mouse(this)[0],
                    trackIdx = d.lcb_idx,
                    hoverStrand = d.strand;

                // base xPos on nearest integer in range
                xPos = x(Math.round(x.invert(xPos)));

                // position relative to lcb
                let relXPos = xPos - x(d.start);

                // draw cursor line for rect being hovered
                lines[trackIdx - 1]
                    .attr('class', 'cursor-line')
                    .attr('x1', xPos)
                    .attr('x2', xPos);

                // draw cursor line for other rects
                let groupID = d.groupID;
                svg.selectAll(`.group-${groupID}`).each(d => {
                    // need to skip rect that is being hovered on
                    if (d.lcb_idx === trackIdx) return;

                    // need to compute relative position based on strand
                    let nextXPos;
                    if (hoverStrand !== d.strand) {
                        nextXPos = x(d.end) - relXPos; // start + positition relative to other blocks
                    } else {
                        nextXPos = x(d.start) + relXPos; // start + positition relative to other blocks
                    }

                    lines[d.lcb_idx-1]
                        .attr('x1', nextXPos)
                        .attr('x2', nextXPos)
                })

                // set cursor-info
                lengthNode.innerHTML = d.end - d.start + 1;
                ntPosNode.innerHTML = Math.round(x.invert(xPos));
            })
            .on("mouseout", function(d) {
                // ignore hover on line
                if (d3.event.relatedTarget &&
                    d3.event.relatedTarget.classList.contains('cursor-line')) {
                    return;
                }

                for (let i=0; i < lines.length; i++) {
                    lines[i].attr("opacity", 0);
                }

                lengthNode.innerHTML = '-';
                ntPosNode.innerHTML = '-';
            });
    }

    _getRegionYPos(trackIdx, strandDirection) {
        return (strandDirection === '-' ? yPosOffset + lcbHeight : yPosOffset) + ((trackIdx-1) * trackOffset);
    }
}
