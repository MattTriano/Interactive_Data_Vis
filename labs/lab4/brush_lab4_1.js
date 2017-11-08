function brush_lab4_1() {
	var size = 200;
	var padding = 20;
	var n = 100;
	
	var brush = d3.brush()
        .on("start", brushstart)
        .on("brush", brushmove)
        .on("end", brushend)
        .extent([[0,0],[size,size*.2]]);

    var svg = d3.select("body").append("svg")
        .attr("width", size * n + padding)
        .attr("height", size * n + padding)
        .append("g")
        .attr("transform", "translate(" + padding + "," + padding / 2 + ")");
}