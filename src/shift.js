
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

