
import {marginTop, trackOffset, yPos} from './consts';


const btnStyle = 'width: 26px; height: 23px;';

export class TrackCtrl {

    constructor(params) {
        this.id = params.id;

        this.container = params.container;
        this.svg = params.svg;
        this.yPos = params.yPos

        // control callbacks
        this.onMoveUp = params.onMoveUp;
        this.onMoveDown = params.onMoveDown;

        this.render();
        return this;
    }

    render() {
        let mvPos = this.container.querySelector('.mauve-viewer').getBoundingClientRect(),
            svgPos = this.svg.getBoundingClientRect(),
            relativeTop = svgPos.top - mvPos.top;

        // add container
        let ele = document.createElement('div');
        //ele.style.border = "1px solid black";
        ele.style.top = relativeTop  + this.yPos - 8 + 'px';
        ele.style.left = '-35px';
        ele.style.width = '25px';
        ele.style.height = trackOffset + 'px';
        ele.style.position = 'absolute';


        let [upBtn, downBtn, hideBtn, refBtn] = this._getButtons();
        ele.appendChild(upBtn);
        ele.appendChild(hideBtn);
        ele.appendChild(refBtn);
        ele.appendChild(downBtn);

        this.container.querySelector('.mauve-viewer').appendChild(ele)
    }

    _getButtons() {
        let upBtn = document.createElement('button');
        upBtn.style = btnStyle;
        upBtn.innerHTML = '▲';
        upBtn.onclick = this.moveTrackUp.bind(this)

        let hideBtn = document.createElement('button');
        hideBtn.style = btnStyle;
        hideBtn.innerHTML = '<b>−</b>';
        hideBtn.onclick = this.hideTrack.bind(this);

        let refBtn = document.createElement('button');
        refBtn.style = btnStyle;
        refBtn.innerHTML = '<b>R</b>';
        refBtn.onclick = this.refTrack.bind(this);

        let downBtn = document.createElement('button');
        downBtn.style = btnStyle;
        downBtn.innerHTML = '▼';
        downBtn.onclick = this.moveTrackDown.bind(this);

        return [upBtn, downBtn, hideBtn, refBtn]
    }


    moveTrackUp() {
        this.onMoveUp(this.id)
    }

    moveTrackDown() {
        this.onMoveDown(this.id)
    }

    hideTrack() {

    }

    refTrack() {

    }
}
