
import {marginTop, trackOffset, ctrlPadding} from './consts';

const btnStyle = 'width: 26px; height: 23px;';


export class TrackCtrl {
    constructor(params) {
        this.id = params.id;

        this.container = params.container;
        this.svg = params.svg;
        this.trackCount = params.trackCount;
        this.yPos = params.yPos || marginTop + (this.id - 1) * trackOffset;

        this.ctrls;
        this.isReference = params.isReference || false;
        this.hidden;

        // control callbacks
        this.onMoveUp = params.onMoveUp;
        this.onMoveDown = params.onMoveDown;
        this.onSetReference = params.onSetReference;
        this.onHide = params.onHide;
        this.onShow = params.onShow;

        this.init();
        return this;
    }

    init() {
        this.destroy(); // don't allow more than one controller
        this.render();
    }

    render() {
        let mvPos = this.container.querySelector('.mauve-viewer').getBoundingClientRect(),
            svgPos = this.svg.getBoundingClientRect(),
            relativeTop = svgPos.top - mvPos.top;

        // add container
        let ele = this.node = document.createElement('div');
        ele.setAttribute('class', `track-ctrl ctrl-${this.id}`);
        ele.style.top = relativeTop + this.yPos + ctrlPadding + 'px';
        ele.style.left = '-35px';
        ele.style.width = '25px';
        ele.style.height = trackOffset + 'px';
        ele.style.position = 'absolute';

        this._addMainButtons();

        this.container.querySelector('.mauve-viewer').appendChild(ele);
    }

    _addMainButtons() {
        let {upBtn, downBtn, hideBtn, refBtn} = this.ctrls = this._getButtons();
        this.node.appendChild(upBtn);
        // this.node.appendChild(hideBtn);
        this.node.appendChild(refBtn);
        this.node.appendChild(downBtn);

        if (this.isReference)
            refBtn.classList.add('active');
    }

    _getButtons() {
        let upBtn = document.createElement('button');
        upBtn.title = 'Move this genome up';
        upBtn.style = btnStyle;
        upBtn.innerHTML = '▲';
        upBtn.disabled = this.id === 1 || false;
        upBtn.onclick = this.moveTrackUp.bind(this);

        let hideBtn = document.createElement('button');
        hideBtn.title = 'Hide this genome';
        hideBtn.style = btnStyle;
        hideBtn.innerHTML = '−';
        hideBtn.onclick = this.hideTrack.bind(this);

        let refBtn = document.createElement('button');
        refBtn.title = 'Set reference genome';
        refBtn.classList.add('ref-btn');
        refBtn.style = btnStyle;
        refBtn.innerHTML = 'R';
        refBtn.onclick = this.refTrack.bind(this);

        let downBtn = document.createElement('button');
        downBtn.title = 'Move this genome down';
        downBtn.style = btnStyle;
        downBtn.innerHTML = '▼';
        downBtn.disabled = this.id === this.trackCount || false;
        downBtn.onclick = this.moveTrackDown.bind(this);

        return {upBtn, downBtn, hideBtn, refBtn};
    }

    _getShowButton() {
        let showBtn = document.createElement('button');
        showBtn.title = 'Show this genome';
        showBtn.classList.add('show-btn');
        showBtn.style = btnStyle;
        showBtn.innerHTML = '+';
        showBtn.onclick = this.showTrack.bind(this);
        return showBtn;
    }

    moveTrackUp() {
        this._selectNewRef(this.id, this.id - 1);
        this.onMoveUp(this.id);
    }

    moveTrackDown() {
        this._selectNewRef(this.id, this.id + 1);
        this.onMoveDown(this.id);
    }

    hideTrack() {
        this.node.innerHTML = '';
        let showBtn = this._getShowButton();
        this.node.appendChild(showBtn);

        this.hidden = true;
        this.onHide(this.id);
    }

    showTrack() {
        this.node.innerHTML = '';
        this._addMainButtons();

        this.hidden = false;
        this.onShow(this.id);
    }

    refTrack() {
        let eles = this.container.querySelectorAll('.ref-btn');
        eles.forEach(ele => { ele.classList.remove('active'); });
        this.ctrls.refBtn.classList.add('active');

        this.onSetReference(this.id);
        this.isReference = true;
    }

    _selectNewRef(oldID, newID) {
        let oldCtrl = this.container.querySelector(`.ctrl-${oldID} .ref-btn`),
            newCtrl = this.container.querySelector(`.ctrl-${newID} .ref-btn`);

        let newCtrlWasActive;
        if (newCtrl.classList.contains('active')) {
            newCtrl.classList.remove('active');
            oldCtrl.classList.add('active');
            newCtrlWasActive = true;
        }

        if (oldCtrl.classList.contains('active') && !newCtrlWasActive) {
            oldCtrl.classList.remove('active');
            newCtrl.classList.add('active');
        }
    }

    destroy() {
        let node = this.container.querySelector(`.ctrl-${this.id}`);
        if (node) node.remove();
    }
}
