
import panLeft from './static/icons/chevron_left.svg';
import panRight from './static/icons/chevron_right.svg';
import zoomIn from './static/icons/zoom_in.svg';
import zoomOut from './static/icons/zoom_out.svg';


export class Options {
    constructor({ele, d3, zoom, tracks, backbone, getLabel}) {
        this.ele = ele;
        this.d3 = d3;
        this.tracks = tracks;
        this.backbone = backbone;
        this.getLabel = getLabel;

        this.zoom = zoom;

        this.setSVGs();
        this.init();

        return this;
    }

    setSVGs() {
        let node = this.ele;
        node.querySelector('.pan-left').innerHTML = panLeft;
        node.querySelector('.pan-right').innerHTML = panRight;
        node.querySelector('.zoom-in').innerHTML = zoomIn;
        node.querySelector('.zoom-out').innerHTML = zoomOut;
    }

    init() {
        let self = this;
        let node = this.ele;
        let optsBtn = node.querySelector('.opts-btn'),
            dd = node.querySelector('.dropdown');

        if (!optsBtn) return;

        optsBtn.onclick = () => {
            node.querySelector('.dd-content').classList.toggle('show');
        };

        // close all dropdown contents on outside click
        document.onclick = (evt) => {
            if (!evt.target.matches('.dd-btn')) {
                var dds = node.getElementsByClassName('dd-content');
                Array.from(dds).forEach(dd => { dd.classList.remove('show'); });
            }
        };

        dd.querySelector('[name=showGenomeID]')
            .onclick = function() {
                if (this.checked) {
                    self.tracks.forEach(track => {
                        let name = track.name,
                            label = self.getLabel(name);
                        track.setLabel(label);
                    });
                    return;
                }
                self.tracks.forEach(track => {
                    let label = track.label,
                        orgName = label.slice(0, label.lastIndexOf('[') - 1);
                    track.setLabel(orgName);
                });
            };

        dd.querySelector('[name=showLCBLines]')
            .onclick = function() {
                if (this.checked) {
                    self.backbone.show();
                    return;
                }
                self.backbone.hide();
            };

        dd.querySelector('[name=showFeatures]')
            .onclick = function() {
                if (this.checked) {
                    self.tracks.forEach(track => track.showFeatures());
                    return;
                }
                self.tracks.forEach(track => track.hideFeatures() );
            };

        dd.querySelector('[name=showContigs]')
            .onclick = function() {
                if (this.checked) {
                    self.tracks.forEach(track => track.showContigs());
                    let svg = node.querySelector('svg');
                    self.zoom.transform(self.d3.select(svg), self.d3.zoomTransform(svg));
                    return;
                }
                self.tracks.forEach(track => track.hideContigs() );
            };
    }
}
