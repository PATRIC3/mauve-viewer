/**
 * mauve-viewer.js
 *
 * A Javascript Mauve/xmfa Whole Genome Alignment Viewer
 *
 * Author(s): nconrad
 *
 */

import {Track} from './track';
import {TrackCtrl} from './track-ctrl';
import {Cursor} from './cursor';
import {BackBone} from './backbone';
import {Options} from './options';

import template from './container.html';
import {schemeCategory20} from './colors';
import {marginTop, trackOffset, hideTrackOffset} from './consts';


export default class MauveViewer {
    constructor(params) {
        this.d3 = params.d3;
        this.ele = params.ele;

        this.data = params.lcbs;
        this.features = params.features;
        this.contigs = params.contigs;
        this.labels = params.labels;
        this.onFeatureClick = params.onFeatureClick;

        this.svg;
        this.tracks = [];
        this.trackCount;
        this.hiddenTracks = [];
        this.backbone;
        this.cursor;
        this.zoom;

        this.init();
    }

    init() {
        let {regions} = this.getGenomeRegions(this.data);
        this.genomeRegions = regions;
        this.trackCount = Object.keys(this.genomeRegions).length;

        // set first genome as reference
        this.setReference(1, true);

        // add container
        this.ele.innerHTML = template;

        // render
        this.render();
        this.rendered = true;

        // global options
        new Options({
            ele: this.ele,
            tracks: this.tracks,
            backbone: this.backbone,
            getLabel: this.getLabel.bind(this),
            zoom: this.zoom,
            d3: this.d3
        });
    }

    render() {
        const d3 = this.d3,
            data = this.data;

        const genomeRegions = this.genomeRegions;
        const trackCount = this.trackCount;

        // get highest end value
        const endMax = Math.max(...[].concat.apply([], data).map(region => region.end));
        const xLength = endMax + 100;

        // create svg dom element
        d3.select(this.ele.querySelector('.mv-chart svg')).remove();
        const svg = this.svg = d3.select(this.ele.querySelector('.mv-chart')).append('svg')
            .attr('width', 1000)
            .attr('height', trackCount * 165);

        const width = +svg.attr('width'),
            height = +svg.attr('height');

        /**
         *  ctrl-mousewheel for zoom
         */
        let zoom = this.zoom = d3.zoom()
            .scaleExtent([1, xLength / 10])
            .translateExtent([[-width, 0], [width * 2, 0]])
            .on('zoom', zoomed)
            .filter(() => (
                d3.event.ctrlKey ||
                d3.event.type === 'mousedown' ||
                d3.event.type === 'dblclick'
            ));

        svg.call(zoom);
        svg.on('dblclick.zoom', null);

        /**
         *  create tracks (axises, scales, gXs)
         */
        let tracks = this.tracks;

        let yPos = marginTop;
        for (let id = 1; id <= trackCount; id++) {
            let isHidden = this.hiddenTracks.includes(id),
                name = genomeRegions[id][0].name,
                label = this.getLabel(name),
                genomeID = name.slice(0, name.lastIndexOf('.'));

            yPos += id === 1 ? 0 : (isHidden ? hideTrackOffset : trackOffset);

            let track = new Track({
                d3, yPos, svg, id, name, label,
                container: this.ele,
                width, xLength,
                hidden: isHidden,
                regions: genomeRegions[id],
                features: this.features ? this.features[ genomeID ] : null,
                contigs: this.contigs ? this.contigs[ genomeID ] : null,
                onFeatureClick: id => { this.onFeatureClick(id); }
            });
            tracks.push(track);

            // only create track ctrls once
            if (this.rendered) continue;

            new TrackCtrl({
                id, yPos, height, container: this.ele,
                svg: this.ele.querySelector('svg'),
                trackCount: this.trackCount,
                isReference: id === 1,
                onMoveUp: id => { this.moveTrackUp(id); },
                onMoveDown: id => { this.moveTrackDown(id); },
                onSetReference: id => { this.setReference(id); },
                onHide: id => { this.hideTrack(id); },
                onShow: id => { this.showTrack(id); }
            });
        }

        // add hover cursor lines, initially without x position
        this.cursor = new Cursor({
            d3, trackCount, svg,
            container: this.ele,
            tracks: this.tracks,
            onclick: (posDict) => {
                // this.onCursorClick(posDict);
            }
        });

        // add backbone of lcb lines
        let backbone = this.backbone = new BackBone({
            tracks, data, d3, svg
        });

        // call zoom transform if being re-rendered
        zoom.transform(svg, d3.zoomIdentity);

        function zoomed() {
            // scale each track
            for (let i = 0; i < tracks.length; i++) {
                tracks[i].rescaleAxis();
            }

            // scale lines
            backbone.scale();
        }

        d3.select(this.ele.querySelector('.reset-btn'))
            .on('click', () => { this.reset(); });

        d3.selectAll('button.pan')
            .on('click', (d, i, nodes) => {
                this.pan(nodes[i]);
            });

        d3.selectAll('button.zoom')
            .on('click', (d, i, nodes) => {
                this.zoomTo(width / 2, nodes[i]);
            });
    }

    moveTrackUp(id) {
        let swapID = id - 1;
        if (swapID < 1) return;

        this.swapTrack(id, swapID);
        this.swapBackbones(id, swapID);
        this.render();
    }

    moveTrackDown(id) {
        let swapID = id + 1;
        if (swapID > this.trackCount) return;

        this.swapTrack(id, swapID);
        this.swapBackbones(id, swapID);
        this.render();
    }

    swapTrack(id, newID) {
        let swapTrack = this.genomeRegions[newID];
        this.genomeRegions[newID] = this.genomeRegions[id];
        this.genomeRegions[id] = swapTrack;
    }

    swapBackbones(oldID, newID) {
        this.data.forEach(lcb => {
            lcb.forEach(region => {
                if (region.lcb_idx === oldID)
                    region.lcb_idx = newID;
                else if (region.lcb_idx === newID)
                    region.lcb_idx = oldID;
            });

            lcb.sort((a, b) => a.lcb_idx - b.lcb_idx);
        });
    }

    setReference(id, noRerender) {
        this.data.forEach(lcb => {
            let flipped = false;

            // first determine if reference's (region)
            // strand direction is made positive
            lcb.forEach(region => {
                if (region.lcb_idx !== id) return;

                if (region.strand !== '+') {
                    region.strand = '+';
                    flipped = true;
                }
            });

            if (!flipped) return;

            // otherwise, need to flip corresponding regions
            lcb.forEach(region => {
                if (region.lcb_idx === id) return;
                region.strand = region.strand === '-' ? '+' : '-';
            });
        });

        if (noRerender) return;

        this.render();
    }

    hideTrack(id) {
        this.data.forEach(lcbs => {
            lcbs.forEach(region => {
                if (region.lcb_idx == id)
                    region.hidden = true;
            });
        });

        this.hiddenTracks.push(id);
        this.render();
    }

    showTrack(id) {
        this.data.forEach(lcbs => {
            lcbs.forEach(region => {
                if (region.lcb_idx == id)
                    delete region.hidden;
            });
        });

        this.hiddenTracks.splice( this.hiddenTracks.indexOf(id));
        this.render();
    }

    reset() {
        this.tracks.forEach(track => { track.reset(); });
        this.zoom.transform(this.svg, this.d3.zoomIdentity);
    }

    zoomTo(xPos, srcElement) {
        let zoom = this.zoom,
            svg = this.svg;

        let zoomTransform = this.d3.zoomTransform(svg.node());

        let scale = zoomTransform.k,
            extent = zoom.scaleExtent(),
            x = zoomTransform.x,
            factor = srcElement.classList.contains('zoom-in') ? 1.5 : 1 / 1.5,
            targetScale = scale * factor;

        // Don't pass scaling extent in either direction
        if (targetScale < extent[0] || targetScale > extent[1]) {
            return false;
        }

        // If the factor is too much, scale it down to reach the extent exactly
        let clampedTargetScale = Math.max(extent[0], Math.min(extent[1], targetScale));

        if (clampedTargetScale != targetScale) {
            targetScale = clampedTargetScale;
            factor = targetScale / scale;
        }

        // Center each vector, stretch, then put back
        x = (x - xPos) * factor + xPos;

        zoomTransform.k = targetScale;
        zoomTransform.x = x;
        zoom.transform(svg, zoomTransform);
    }

    pan(srcElement) {
        let zoom = this.zoom,
            svg = this.svg;

        let zoomTransform = this.d3.zoomTransform(svg.node());

        let x = zoomTransform.x,
            shiftAmount = srcElement.classList.contains('pan-right') ? -100 : 100;

        zoomTransform.x = x + shiftAmount;
        zoom.transform(svg, zoomTransform);
    }

    onCursorClick({trackID, relativeXs, lcbID, xPos, scales}) {
        if (!trackID) return;

        // reset hack
        // this.tracks.forEach((track) => track.reset())
        // this.zoom.transform(this.rect, this.d3.zoomIdentity);

        // shift all tracks to relative position
        this.tracks.forEach((track, i) => {
            // skip track clicked on
            // if (track.id === trackID) return;
            let shiftX = relativeXs[i];

            // there may not be a corresponding LCB
            if (!shiftX) return;

            let complete = 1;
            let scaleToUse = this.tracks[trackID - 1];

            track.shift(shiftX, scales[i], () => {
                complete += 1;
                this.rect.transition().call(
                    this.zoom.transform, this.d3.zoomTransform({k: 1, x: 0, y: 0})
                );
            });
        });
    }

    // gets lcbs that have entry for every organism
    // deprecated(?)
    getSharedLCBs(data) {
        let maxRows = Math.max( ...data.map(lcb => lcb.length) );
        let filtered = data.filter(lcbs => lcbs.length == maxRows);
        return filtered;
    }

    // gets regions for each organism (index); adding ids
    // also returns connections of regions
    getGenomeRegions(lcbs) {
        let regions = {};
        let regionID = 0;
        let lcbID = 0;
        lcbs.forEach((lcb, groupID) => {
            lcbID += 1;
            if (lcb.length < 2) return;

            lcb.forEach((region) => {
                // increment/add ids to regions
                regionID += 1;
                region.id = regionID;
                region.groupID = groupID;
                region.color = schemeCategory20[groupID % 20];

                let index = region.lcb_idx;
                if (index in regions)
                    regions[index].push(region);
                else
                    regions[index] = [region];
            });
        });

        return {regions, regionCount: regionID, lcbCount: lcbID};
    }

    getLabel(name) {
        let orgID = name.slice(0, name.lastIndexOf('.'));
        let label = this.labels ? `${this.labels[name]} [${orgID}]` : '';
        return label;
    }
}
