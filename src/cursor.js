
import {marginTop, yPosOffset, lcbHeight, trackOffset} from './consts';

export class Cursor {

    constructor(params) {
        this.d3 = params.d3;
        this.svg = params.svg;
        this.scale = params.scale;
        this.trackCount = params.trackCount;

        this.hoverLines = [];

        this.render();

        return this;
    }

    render() {
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

        let x = scale;

        svg.selectAll('.region').on("mousemove", function(d) {
            let groupID = d.groupID;

            let xPos = d3.mouse(this)[0],
                trackIdx = d.lcb_idx,
                hoverStrand = d.strand;

            // need relative position for other tracks
            let relXPos = xPos - x(d.start);

            // draw cursor line for rect being hovered
            lines[trackIdx-1]
                .attr('x1', xPos)
                .attr('x2', xPos)

            // draw cursor line for other rects
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
        })

        svg.selectAll('.region')
            .on("mouseover", function(d) {
                for (let i=0; i < lines.length; i++) {
                    lines[i].attr("opacity", 1.0);
                }
            })
            .on("mouseout", function(d) {
                for (let i=0; i < lines.length; i++) {
                    lines[i].attr("opacity", 0);
                }
            });
    }

    _getRegionYPos(trackIdx, strandDirection) {
        return (strandDirection === '-' ? yPosOffset + lcbHeight : yPosOffset) + ((trackIdx-1) * trackOffset);
    }
}
