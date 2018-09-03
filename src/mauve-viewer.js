/**
 * mauve-viewer.js
 *
 * A JS/d3.js Mauve Viewer
 *
 * Author(s): nconrad
 *
 */

import {schemeCategory20} from './colors';

export default class MauveViewer {
    constructor(params){
        this.ele = params.ele;
        this.data = params.data;
        this.d3 = params.d3;
    }

    init() {
        console.log('data', this.data)
        this.render(this.d3, this.data);
    }

    render(d3, data) {
        const genomeRegions = this.getGenomeRegions(data);
        const trackCount = Object.keys(genomeRegions).length;

        // number of LCBs; assuming every track has same number of regions
        const numOfLCBs = genomeRegions[1].length;

        // get highest end value
        const endMax = Math.max( ...[].concat.apply([], data).map(region => region.end));
        let xLength = endMax + 100;


        // clear svg
        d3.select('svg').remove();
        const svg = d3.select("#chart").append("svg")
            .attr('width', 1000)
            .attr('height', trackCount * 165)


        const width = +svg.attr("width"),
            height = +svg.attr("height");


        let zoom = d3.zoom()
            .scaleExtent([1, 150])
            .translateExtent([[-2000, 0], [width + 90, height + 100]])
            .on("zoom", zoomed)

        svg.on("dblclick.zoom", null);


        let x;
        let trackOffset = 140,
            marginTop = 20;


        // create axises
        let axises = [],
            gXs = [],
            xScales = [];

        for (let i = 0; i < trackCount; i++) {
            x = d3.scaleLinear()
                .domain([0, xLength])
                .range([0, width + 1]);

            let xAxis = d3.axisBottom(x)
                .ticks((width + 2) / (height + 2) * 10)
                .tickSize(10)

            let gX = svg.append("g")
                .attr("class", `axis axis-x-${i}`)
                .call(xAxis)
                .attr("transform", `translate(0, ${(marginTop + i * (trackOffset + 0 ))})`);

            // add names
            svg.append('text')
                .attr('x', 10)
                .attr('y', marginTop + i * (trackOffset) - 2) // -2 padding
                .text(genomeRegions[i+1][0].name)
                .attr("font-family", "sans-serif")
                .attr("font-size", "10px")
                .attr("fill", '#aaaaaa');

            axises.push(xAxis);
            gXs.push(gX);
            xScales.push(x);
        }


        let yPos = 50, // distance from x-axis
            h = 20; // height of rectangles (regions)

        // for each track, generate rectangles
        for (let trackIdx = 1; trackIdx <= trackCount; trackIdx++) {
            let regions = genomeRegions[trackIdx];

            let g = svg.select('g')
                .append('g')
                .attr('class', `track track-${trackIdx}`)

            // add regions
            g.selectAll('rect')
                .data(regions)
                .enter()
                .append('rect')
                .attr('class', d => `region region-track-${trackIdx} region-${d.id} group-${d.groupID}`)
                .attr('x', d => x(d.start))
                .attr('y', d => getRegionYPos(trackIdx, d.strand))
                .attr('width', d => x(d.end - d.start))
                .attr('height', h)
                .attr('stroke', '#fffff')
                .attr('fill', d =>  schemeCategory20[(d.groupID % numOfLCBs) % 20] )
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

        // compute all LCB midpoints as list of objects
        let midSets = [];
        data.forEach((lcb) => {

            let lcbMids = []
            lcb.forEach(l => {
                let i = l.lcb_idx - 1;  // make indexed
                lcbMids.push({
                    start: l.start,
                    end: l.end,
                    x:  x(l.start) + ( (x(l.end) - x(l.start))  / 2 ) ,
                    y: marginTop + getRegionYPos(i+1, l.strand) + (h/2)
                });
            })

            midSets.push(lcbMids);
        })

        // draw connections
        let lineFunction = d3.line()
            .x(d => d.x)
            .y(d => d.y)

        midSets.forEach((set, i) => {
            svg.datum(set)
                .insert("path",":first-child")
                .attr('class', 'lcb-line')
                .attr("d", lineFunction(set))
                .attr("stroke-width", 1)
                .attr('stroke', schemeCategory20[i % 20])
                .attr('fill', 'none')

        })

        d3.select('#reset-btn')
            .on("click", reset);


        svg.call(zoom);

        /*
        d3.select('#shift-btn').on("click", shift)
        function shift() {
            // update axis
            gXs[0].transition().tween("axis", function(d) {
                let i = d3.interpolate(
                    [xScales[0].domain()[0], xScales[0].domain()[1]],
                    [xScales[0].domain()[0] - 300000, xScales[0].domain()[1] - 300000]
                );

                return function(t) {
                    xScales[0].domain(i(t));
                    gXs[0].call(axises[0]);

                    let newScale = xScales[0];

                    // Need to update contents as well
                    d3.selectAll('.region-track-1')
                        .attr("x", (d) => newScale(d.start) );


                    // scale lines
                    d3.selectAll('path.lcb-line')
                        .attr("d", d => {

                            let old = d[0];
                            // only rescale first track
                            d[0] = {
                                start: old.start,
                                end: old.end,
                                x: newScale(old.start) + ( (newScale(old.end) - newScale(old.start))  / 2 ),
                                y: old.y
                            }

                            return lineFunction(d)
                        });

                    resetHover(newScale);
                }
            });
        }
        */

        function zoomed() {

            let newScale = d3.event.transform.rescaleX(xScales[2]);

            // for each axis, scale
            for (let i = 0; i < axises.length; i++) {
                let gX = gXs[i],
                    xAxis = axises[i],
                    x = xScales[i];
                gX.call(xAxis.scale(d3.event.transform.rescaleX(x)));
            }

            // scale rectangles
            let srcEvent = d3.event.sourceEvent;
            if (!srcEvent || srcEvent.type === 'wheel' || srcEvent.type === 'click') {
                d3.selectAll('.region')
                    .attr('x', (d) => newScale(d.start))
                    .attr("width", (d) => newScale(d.end) - newScale(d.start))
            } else if ((d3.event.sourceEvent.type === 'mousemove')) {
                d3.selectAll('.region')
                    .attr("x", (d) => newScale(d.start) );
            }

            // scale lines
            d3.selectAll('path.lcb-line')
                .attr("d", d => {
                    let set = d.map(p => {
                        return {
                            start: p.start,
                            end: p.end,
                            x: newScale(p.start) + ( (newScale(p.end) - newScale(p.start))  / 2 ),
                            y: p.y
                        }
                    })

                    return lineFunction(set)
                });

            // rescale hover events
            d3.selectAll('.region')
                .on("mousemove", null)
                .on("mouseover", null)
                .on("mouseenter", null)
                .on("mouseleave", null)
                .on("mouseout", null)
            resetHover(newScale);
        }



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


        svg.selectAll('.hover-line').on('contextmenu', function() {
            d3.event.preventDefault();

            showContextMenu.bind(this)()
        })


        // show / hide context menu
        svg.selectAll('.region').on('contextmenu', function(data, index) {
            d3.event.preventDefault();

            showContextMenu.bind(this)()
        });


        /* content menu
        d3.select('#nucleotide-align').on('click', (d) => {
            d3.select('#mv-context-menu').style('display', 'none');
        })

        function showContextMenu() {
            let pos = d3.mouse(this);
            d3.select('#mv-context-menu')
                .style('position', 'absolute')
                .style('left', `${pos[0]}px`)
                .style('top', `${pos[1]}px`)
                .style('display', 'block');

            // close on click
            svg.on('click', () => {
                d3.select('#mv-context-menu').style('display', 'none');
            })
        }
        */

        function reset() {
            zoom.transform(svg, d3.zoomIdentity);
        }

        function getRegionYPos(trackIdx, strandDirection ) {
            return (strandDirection === '-' ? yPos + h : yPos) + ((trackIdx-1) * trackOffset);
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
