/**
 * mauve-viewer.js
 *
 * A JS/d3.js Mauve Viewer
 *
 * Author(s): nconrad
 *
 */

import {Track} from './track';
import {BackBone} from './backbone';
import {marginTop, trackOffset, yPos, lcbHeight} from './consts';


export default class MauveViewer {

    constructor(params){
        this.ele = params.ele;
        this.data = params.data;
        this.d3 = params.d3;

        this.tracks = [];

        this.init();
    }

    init() {
        this.ele.innerHTML = `
            <div class="mauve-viewer">
                <div class="mv-header" style="text-align: left;">
                    <h4 class="title">Mauve Viewer (Alpha)</h4>
                    <div class="help-text">
                        <b>Tips:</b> click and drag to pan; use ctrl-scroll or double click to zoom.
                    </div><br>
                    <button class="reset-btn">Reset</button><br>
                </div>
                <br>
                <div class="mv-chart">
                    <svg></svg>

                    <div style="position: relative;">
                        <div class="mv-context-menu" style="display: none;">
                            <ul>
                                <li id="nucleotide-align">Align by nucleotide</li>
                                <li>Another item</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>`

        this.render(this.d3, this.data);
    }


    render(d3, data) {
        const genomeRegions = this.getGenomeRegions(data);
        const trackCount = Object.keys(genomeRegions).length;

        // number of LCBs; assuming every track has same number of regions
        const numOfLCBs = genomeRegions[1].length;

        // get highest end value
        const endMax = Math.max( ...[].concat.apply([], data).map(region => region.end));
        const xLength = endMax + 100;

        // create svg dom element
        d3.select(this.ele.querySelector('svg')).remove();
        const svg = d3.select(this.ele.querySelector('.mv-chart')).append("svg")
            .attr('width', 1000)
            .attr('height', trackCount * 165)


        const width = +svg.attr("width"),
            height = +svg.attr("height");

        // ctrl-mousewheel for zoom
        let zoom = d3.zoom()
            .scaleExtent([1, 150])
            .translateExtent([[-2000, 0], [width + 90, height + 100]])
            .on("zoom", zoomed)
            .filter(() => (
                d3.event.ctrlKey ||
                d3.event.type === 'mousedown' ||
                d3.event.type == 'dblclick')
            )

        svg.call(zoom);

        d3.select(this.ele.querySelector('.reset-btn'))
            .on("click", reset);

        /**
         *  create tracks (axises, scales, gXs)
         */
        let axises = [],
            gXs = [],
            xScales = [],
            tracks = [];

        for (let i = 0; i < trackCount; i++) {
            let pos = (marginTop + i * (trackOffset + 0 )),
                name = genomeRegions[i+1][0].name


            let track = new Track({
                d3, svg, id: i, name,
                pos, width, height, xLength,
            })

            axises.push(track.xAxis);
            gXs.push(track.gX);
            xScales.push(track.x);

            tracks.push(track);
        }

        // x scale is same for all tracks
        let x = xScales[0];


        /**
         * add regions
         */
        // for each track, add rectangles (lcbs), get midpoint
        for (let trackIdx = 1; trackIdx <= trackCount; trackIdx++) {
            let regions = genomeRegions[trackIdx];

            let track = tracks[trackIdx - 1];
            track.addRegions(regions);

            tracks[trackIdx - 1]
        }

        // add hover cursor lines, initially without x position
        let hoverLines = [];
        for (let i=1; i <= trackCount; i++) {
            let yPos = getRegionYPos(i, '-');
            let line = svg.append('line')
                .attr('class', 'hover-line')
                .style('stroke', '#222' )
                .attr('y1', yPos - 20)
                .attr('y2', yPos + 65)

            hoverLines.push(line);
        }

        resetHover(x);

        // add backbone of lcb lines
        let backbone = new BackBone({
            scale: x, data, d3, svg
        })


        function resetHover(scale) {
            let x = scale;
            let lines = hoverLines;

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



        function reset() {
            zoom.transform(svg, d3.zoomIdentity);
        }

        function getRegionYPos(trackIdx, strandDirection ) {
            return (strandDirection === '-' ? yPos + lcbHeight : yPos) + ((trackIdx-1) * trackOffset);
        }

        function zoomed() {
            let srcEvent = d3.event.sourceEvent;
            let newScale = d3.event.transform.rescaleX(xScales[0]);

            // scale each axis
            for (let i = 0; i < tracks.length; i++) {
                tracks[i].rescaleAxis();
            }

            // scale all rectangles
            if (!srcEvent || srcEvent.type === 'wheel' || srcEvent.type === 'click') {
                d3.selectAll('.region')
                    .attr('x', (d) => newScale(d.start))
                    .attr("width", (d) => newScale(d.end) - newScale(d.start))
            } else if ((d3.event.sourceEvent.type === 'mousemove')) {
                d3.selectAll('.region')
                  .attr("x", (d) => newScale(d.start) );
            }

            // scale lines
            backbone.scale(newScale);

            // rescale hover events
            d3.selectAll('.region')
                .on("mousemove", null)
                .on("mouseover", null)
                .on("mouseenter", null)
                .on("mouseleave", null)
                .on("mouseout", null)
            resetHover(newScale);
        }
    }


    // gets lcbs that have entry for every organism
    // deprecated(?)
    getSharedLCBs(data) {
        let maxRows = Math.max( ...data.map(lcb => lcb.length) );
        let filtered = data.filter(lcbs => lcbs.length === maxRows);
        return filtered;
    }

    // gets regions for each organism (index); adding ids
    // also returns connections of regions
    getGenomeRegions(lcbs) {
        let regions = {};
        let regionID = 0;
        lcbs.forEach((lcb, groupID) => {
            //lcb.reverse(); // consider last index reference genome

            lcb.forEach((region) => {
                // increment/add ids to regions
                regionID += 1;
                region.id = regionID;
                region.groupID = groupID;

                let index = region.lcb_idx;
                if (index in regions)
                    regions[index].push(region);
                else
                    regions[index] = [region];
            })
        })

        return regions;
    }


}
