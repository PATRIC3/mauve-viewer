


export const marginTop = 20;     // margin of canvas top
export const trackOffset = 100; // distance between axises
export const hideTrackOffset = 35;
export const yPosOffset = 30;   // distance of regions from x-axis
export const lcbHeight = 20;    // height of regions (rectangles)



export const container = `
    <div class="mauve-viewer" style="position: relative;">
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