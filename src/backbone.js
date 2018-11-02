
import {marginTop, trackOffset, yPosOffset, lcbHeight} from './consts';


export class BackBone {
    constructor(params) {
        this.d3 = params.d3;
        this.svg = params.svg;

        this.data = params.data;
        this.tracks = params.tracks;

        this.render(this.data);

        return this;
    }

    render(data) {
        let tracks = this.tracks;

        // compute all LCB midpoints as list of objects through backbone
        let midSets = [];
        data.forEach((lcbs) => {
            let lcbMids = [];
            lcbs.forEach((l, i) => {
                if (l.hidden) return;

                let x = tracks[l.lcb_idx - 1].getZoomScale();
                let xPos = x(l.start) + ( (x(l.end) - x(l.start)) / 2 );

                // if first track
                if (l.lcb_idx == 1) {
                    lcbMids.push({
                        color: l.color,
                        lcb_idx: l.lcb_idx,
                        start: l.start,
                        end: l.end,
                        x: xPos,
                        y: marginTop + this._getRegionYPos(l.lcb_idx, l.strand) + (lcbHeight / 2)
                    });

                    lcbMids.push({
                        color: l.color,
                        lcb_idx: l.lcb_idx,
                        start: l.start,
                        end: l.end,
                        x: xPos,
                        y: marginTop + this._getRegionYPos(l.lcb_idx, l.strand) + lcbHeight + 10
                    });
                    return;
                }

                // if last track
                if (l.lcb_idx == this.tracks.length) {
                    lcbMids.push({
                        color: l.color,
                        lcb_idx: l.lcb_idx,
                        start: l.start,
                        end: l.end,
                        x: xPos,
                        y: marginTop + this._getRegionYPos(l.lcb_idx, l.strand) - lcbHeight -
                            (l.strand === '-' ? 10 : 0)
                    });

                    lcbMids.push({
                        color: l.color,
                        lcb_idx: l.lcb_idx,
                        start: l.start,
                        end: l.end,
                        x: xPos,
                        y: marginTop + this._getRegionYPos(l.lcb_idx, l.strand) + (lcbHeight / 2)
                    });
                    return;
                }

                /**
                 *  if middle track
                 */
                lcbMids.push({
                    color: l.color,
                    lcb_idx: l.lcb_idx,
                    start: l.start,
                    end: l.end,
                    x: xPos,
                    y: marginTop + this._getRegionYPos(l.lcb_idx, l.strand) - lcbHeight -
                        (l.strand === '-' ? 10 : 0)
                });

                lcbMids.push({
                    color: l.color,
                    lcb_idx: l.lcb_idx,
                    start: l.start,
                    end: l.end,
                    x: xPos,
                    y: marginTop + this._getRegionYPos(l.lcb_idx, l.strand) + (lcbHeight / 2)
                });

                if (i == lcbs.length - 1) return;

                lcbMids.push({
                    color: l.color,
                    lcb_idx: l.lcb_idx,
                    start: l.start,
                    end: l.end,
                    x: xPos,
                    y: marginTop + this._getRegionYPos(l.lcb_idx, l.strand) + lcbHeight + 10 +
                        (l.strand === '+' ? 10 : 0)
                });
            });

            midSets.push(lcbMids);
        });

        // draw connections using lineFunction.
        // keep line function for scaling
        this.lineFunction = this.d3.line()
            .x(d => d.x)
            .y(d => d.y);

        let g = this.svg.insert('g', ':first-child')
            .attr('class', 'lcb-lines');

        midSets.forEach((set, i) => {
            g.datum(set)
                .append('path')
                .attr('class', `lcb-line id-${i}`)
                .attr('d', this.lineFunction(set))
                .attr('stroke-width', 1)
                .attr('stroke', d => d[0].color)
                .attr('fill', 'none');
        });

        return midSets;
    }

    scale(newScale) {
        this.svg.selectAll('path.lcb-line')
            .attr('d', d => {
                let set = d.map(p => {
                    let newScale = this.tracks[p.lcb_idx - 1].getZoomScale();
                    return {
                        start: p.start,
                        end: p.end,
                        x: newScale(p.start) + ( (newScale(p.end) - newScale(p.start)) / 2 ),
                        y: p.y
                    };
                });

                return this.lineFunction(set);
            });
    }

    getLineFunction() {
        return this.lineFunction;
    }

    _getRegionYPos(trackIdx, strandDirection) {
        return (strandDirection === '-' ? yPosOffset + lcbHeight : yPosOffset) + ((trackIdx - 1) * trackOffset);
    }

    hide() {
        this.svg.selectAll('path.lcb-line')
            .attr('opacity', 0);
    }

    show() {
        this.svg.selectAll('path.lcb-line')
            .attr('opacity', 1.0);
    }
}
