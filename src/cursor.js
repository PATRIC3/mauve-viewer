// Todo: listen for mousemove on track container
import {marginTop, yPosOffset, lcbHeight, trackOffset} from './consts';


const debug = false;

export class Cursor {

    constructor(params) {
        this.container = params.container;
        this.d3 = params.d3;
        this.svg = params.svg;
        this.trackCount = params.trackCount;
        this.onclick = params.onclick;


        // cursor class uses tracks for scales
        this.tracks = params.tracks;
        this.zoom = params.zoom;

        // set on hover
        this.hoverXPos;   // position of mouse cursor
        this.hoverTrackID;
        this.hoverLCBID;
        this.scales = []
        this.relativeXs = []

        this.hoverLines = [];

        this.render();

        return this;
    }

    render() {
        // draw the track cursor once and update
        // position for better performance
        let self = this;

        let d3 = this.d3

        for (let i=1; i <= this.trackCount; i++) {
            let yPos = this._getRegionYPos(i, '-');

            let line = this.svg.append('line')
                .attr('class', 'cursor-line')
                .style('stroke', '#222' )
                .attr('y1', marginTop + yPos - 30)
                .attr('y2', marginTop + yPos + 30)

            this.hoverLines.push(line);
        }

        this.resetHover(this.scale);


        // click event callback
        this.svg.on('click', (event) => {
            this.onclick({
                event: event,
                trackID: this.hoverTrackID,
                lcbID: this.hoverLCBID,
                xPos: this.hoverXPos,
                relativeXs: this.relativeXs,
                scales: this.scales
            })
        })
    }

    resetHover() {
        console.log('reset hover')
        let svg = this.svg,
            d3 = this.d3,
            lines = this.hoverLines;

        svg.selectAll('.track')
            .on("mouseover", null)
            .on("mousemove", null)
            .on("mouseout", null);

        let lengthNode = this.container.querySelector('.lcb-length'),
            ntPosNode = this.container.querySelector('.nt-pos');

        let self = this;
        svg.selectAll('.track')
            .on("mouseover", () => {
                d3.selectAll('.cursor-line')
                    .attr("opacity", 1.0)
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

                let xPos = d3.mouse(this)[0];
                let trackID = self.hoverTrackID = d.lcb_idx;
                let hoverStrand = d.strand;

                let x = self.tracks[trackID -1].getScale();
                //console.log('Scale for hovered track', trackID , 'is', x.domain())

                // base xPos on nearest integer in range
                xPos = x(Math.round(x.invert(xPos)));

                // store position property of mouse cursor
                self.hoverXPos = xPos;
                self.relativeXs[trackID - 1] = 0;
                self.scales[trackID - 1] = x;

                // position relative to lcb
                let relXPos = xPos - x(d.start);

                // draw cursor line for rect being hovered
                lines[trackID - 1]
                    .attr('class', 'cursor-line')
                    .attr('x1', xPos)
                    .attr('x2', xPos);

                // draw cursor line for other rects
                let groupID = self.hoverLCBID = d.groupID;
                svg.selectAll(`.group-${groupID}`).each(function(d, i) {
                    //console.log('d', this)
                    // need to skip rect that is being hovered on
                    if (d.lcb_idx === trackID) return;

                    // need to compute relative position based on strand
                    // store the relative position on other tracks as well
                    let x = self.tracks[i].getScale();
                    //console.log('Scale for relative lcb', i+1, 'is', x.domain())

                    let nextXPos;
                    if (hoverStrand !== d.strand) {
                        nextXPos = x(d.end) - relXPos;
                    } else {
                        nextXPos = x(d.start) + relXPos;
                    }

                    let diff = xPos - nextXPos ;
                    self.relativeXs[d.lcb_idx - 1] = diff;
                    self.scales[d.lcb_idx - 1] = x;
                    //console.log('diff for track', i+1, diff);

                    lines[d.lcb_idx-1]
                        .attr('x1', nextXPos )
                        .attr('x2', nextXPos )
                })

                // highlight lcbs
                svg.selectAll(`.group-${groupID}`).each(function(d) {
                    this.parentNode.appendChild(this);
                    d3.select(this)
                        .attr('stroke', '#222')
                        .attr('stroke-width', 2)
                })

                // highlight backbone
                svg.selectAll(`.lcb-line.id-${groupID}`)
                    .attr('stroke-width', 3)

                // set cursor-info
                lengthNode.innerHTML = d.end - d.start + 1;
                ntPosNode.innerHTML = Math.round(x.invert(xPos));


                if (debug) {
                    self.relativeXs.forEach((xp,i) => {
                        if (i > 4) return
                        console.log(i, xp)
                    })
                }
            })
            .on("mouseout", function(d) {
                // ignore hover on line
                if (d3.event.relatedTarget &&
                    d3.event.relatedTarget.classList.contains('cursor-line')) {
                    return;
                }

                d3.selectAll('.cursor-line')
                    .attr("opacity", 0)
                    .attr('x1', -2)
                    .attr('x2', -2)

                // remove highlighting
                svg.selectAll(`.region`)
                    .attr('stroke', null)
                svg.selectAll(`.lcb-line`)
                    .attr('stroke-width', 1)

                lengthNode.innerHTML = '-';
                ntPosNode.innerHTML = '-';
            });
    }



    _getRegionYPos(trackID, strandDirection) {
        return (strandDirection === '-' ? yPosOffset + lcbHeight : yPosOffset) + ((trackID-1) * trackOffset);
    }
}
