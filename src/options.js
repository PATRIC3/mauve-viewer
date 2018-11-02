
export class Options {
    constructor({ele, tracks, backbone, getLabel}) {
        this.ele = ele;
        this.tracks = tracks;
        this.backbone = backbone;
        this.getLabel = getLabel;

        this.init();

        return this;
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
            if (dd.contains(evt.target)) return;

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
                    return;
                }
                self.tracks.forEach(track => track.hideContigs() );
            };
    }
}
