var pie_chart_vis = function() {
    var new_PC = {
        draw_pie_chart: function(svg, pie_data){
			console.log(pie_data);
			var w = +svg.attr("width"),
				h = +svg.attr("height");

			var outerRadius = Math.min(w,h) / 2;
			var innerRadius = 0; 
			var arc = d3.arc()
						.innerRadius(innerRadius)
						.outerRadius(outerRadius);
			console.log("pie data");
			console.log(pie_data);

			var g = svg.append("g")
						.attr("transform", "translate(" + w/3 + "," + h/2 + ")");

			var pie = d3.pie()
						.value(function(d) { return d;})
						(pie_data);

			//Easy colors accessible via a 10-step ordinal scale
			var z = d3.scaleOrdinal()
            	.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", 
            			"#a05d56", "#d0743c", "#ff8c00"]);

			//Set up groups
			var arcs = svg.selectAll("g.arc")
					  		.data(pie)
					  		.enter()
					  	   .append("g")
					  		.attr("class", "arc")
					  		.attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

			//Draw arc paths
			arcs.append("path")
				.attr("fill", function(d, i) {
					return z(i);
				})
				.attr("d", arc);

			//Labels
			arcs.append("text")
		    	.attr("transform", function(d) {
		    		return "translate(" + arc.centroid(d) + ")";
		    	})
		    	.attr("text-anchor", "middle")
		    	.text(function(d) {
		    		return d.value;
		    	});

		
        }
    }
    return new_PC;
}