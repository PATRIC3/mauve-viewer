
// mauve-viewer.js scratch


//Todo: testing, remove
//this.data.forEach(lcb => {
//    lcb.forEach(region => {
//        region.strand = '+';
//    })
//})

var rect = this.rect = svg.append("rect")
            .attr('class', 'zoom-box')
            .attr("width",  1000)
            .attr("height", trackCount * 165)
            .style("fill", 'none')
            .style("pointer-events", "all");


let masterTrack = this.masterTrack =  new MasterTrack({
    d3, svg,
    yPos: yPos += trackOffset,
    id: trackCount+1,
    name: 'master',
    label: 'master',
    container: this.ele,
    width, xLength
})
tracks.push(masterTrack)

