
import {schemeCategory20} from './colors';
import {marginTop, trackOffset, yPosOffset, lcbHeight} from './consts';

export class BackBone {

    constructor(params) {
        this.d3 = params.d3;
        this.svg = params.svg;

        this.data = params.data;
        this.x = params.scale

        this.render(this.data);

        return this;
    }

    render(data) {
        // local (not const)
        let x = this.x;

        // compute all LCB midpoints as list of objects through backbone
        let midSets = [];
        data.forEach((lcbs) => {
            let lcbMids = [];
            lcbs.forEach(l => {
                if (l.hidden) return;

                lcbMids.push({
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
                .attr('class', 'lcb-line')
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


    _getRegionYPos(trackIdx, strandDirection) {
        return (strandDirection === '-' ? yPosOffset + lcbHeight : yPosOffset) + ((trackIdx-1) * trackOffset);
    }
}
