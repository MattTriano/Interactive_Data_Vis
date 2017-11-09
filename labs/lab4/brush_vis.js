var brush_vis = function() {
    var new_B = {
        draw_brush: function(svg, brush_data){
        	var width = +svg.attr('width');
            var height = +svg.attr('height');
            var margin = {top: 20, right: 20, bottom: 110, left: 40};
            var margin2 = {top: 430, right: 20, bottom: 30, left: 40};
            var height2 = +svg.attr("height") - margin2.top - margin2.bottom;

            var x = d3.scaleTime()
            			.domain(d3.extent(brush_data, function(d) {
            				return d.Date; 
            			}))
            			.range([0, width]);
            var	x2 = d3.scaleTime()
            			.domain(x.domain())
            			.range([0, width]);
            var	y = d3.scaleLinear()
            			.domain([0, 
            					d3.max(brush_data, function(d) {
            						return d.Amount;
            					})
            			])
            			.range([height, 0]);
            var	y2 = d3.scaleLinear().range([height, 0]);

            var xAxis = d3.axisBottom(x);
            var	xAxis2 = d3.axisBottom(x2);
            var yAxis = d3.axisLeft(y);

            var brush = d3.brushX()
                          .extent([[0, 0], [width, height]])
                          .on("brush end", brushed);

            var zoom = d3.zoom()
            			 .scaleExtent([1, Infinity])
            			 .translateExtent([[0, 0], [width, height]])
            			 .extent([[0, 0], [width, height]])
            			 .on("zoom", zoomed);

            var area = d3.area()
            	.curve(d3.curveMonotoneX)
            	.x(function(d) { return x(d.Date); })
            	.y0(height)
            	.y1(function(d) { return y(d.Amount); });
            var area2 = d3.area()
            	.curve(d3.curveMonotoneX)
            	.x(function(d) { return x2(d.Date); })
            	.y0(height2)
            	.y1(function(d) { return y2(d.Amount); });

            svg.append("defs").append("clipPath")
            	.attr("id", "clip")
            	.append("rect")
            	.attr("width", width)
            	.attr("height", height);

            var focus = svg.append("g")
            	.attr("class", "focus")
            	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var context = svg.append("g")
            	.attr("class", "context")
            	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

           	focus.append("path")
           		   .datum(brush_data)
           		   .attr("class", "area")
           		   .attr("d", area);

           	context.append("path")
           			.datum(brush_data)
           			.attr("class", "area")
           			.attr("d", area2);


           	context.append("g")
           			.attr("class", "axis axis--x")
           			.attr("transform", "translate(0," + height + ")")
           			.call(xAxis2);

           	context.append("g")
           			.attr("class", "brush")
           			.call(brush)
           			.call(brush.move, x.range());
           	
           	svg.append("rect")
           		.attr("class", "zoom")
           		.attr("width", width)
           		.attr("height", height)
           		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
           		.call(zoom);

           	function brushed() {
           		if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
           			var s = d3.event.selection || x2.range();
           			x.domain(s.map(x2.invert, x2));
           			// focus.select(".area").attr("d", area);
           			// focus.select(".axis--x").call(xAxis);
           			svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
           				.scale(width / (s[1] - s[0]))
           				.translate(-s[0], 0));
           		}
           	function zoomed() {
           		if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
           		var t = d3.event.transform;
           		x.domain(t.rescaleX(x2).domain());
           		focus.select(".area").attr("d", area);
           		focus.select(".axis--x").call(xAxis);
           		context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
           	}

        }
    }
    return new_B;
}