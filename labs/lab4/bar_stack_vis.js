var bar_stack_vis = function() {
    var new_BS = {
        draw_stacked_bar: function(svg, bar_data){
        	//Width and height
            var margin = {top: 20, right: 20, bottom: 30, left: 40};
            var width = +svg.attr('width') - margin.left - margin.right;
            var height = +svg.attr('height') - margin.top - margin.bottom;
            
            var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var x = d3.scaleBand()
            	.rangeRound([0, width])
            	.paddingInner(0.05)
            	.align(0.1);
            
            var y = d3.scaleLinear()
            	.rangeRound([height, 0]);

            var z = d3.scaleOrdinal()
            	.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", 
            			"#a05d56", "#d0743c", "#ff8c00"]);

            var keys = bar_data.columns.slice(1);

            // console.log(bar_data);
            bar_data.sort(function(a, b) { return b.total - a.total; });
            // console.log(bar_data);
            x.domain(bar_data.map(function(d) { return d.State; }));
            // console.log(x);
            y.domain([0, d3.max(bar_data, function(d) { return d.total; })]).nice();
            z.domain(keys);

            console.log(d3.stack().keys(keys)(bar_data));

            g.append("g")
              .selectAll("g")
              .data(d3.stack().keys(keys)(bar_data))
              .enter().append("g")
              	.attr("fill", function(d) { return z(d.key); })
              .selectAll("rect")
              .data(function(d) { 
              	// console.log(d)
              	return d; })
              .enter().append("rect")
              	.attr("x", function(d) { 
              		// console.log(d)
              		return x(d.data.State); })
              	.attr("y", function(d) { return y(d[1]); })
              	.attr("height", function(d) { return y(d[0]) - y(d[1]); })
              	.attr("width", x.bandwidth())
              	// .on('click', function(d) { console.log(stackedBar_data_to_Pie(d.data))});
              	.on("click", function(d) {new_BS.dispatch.call("selected", {}, stackedBar_data_to_Pie(d.data)); })
            // console.log(g);

            g.append("g")
            	.attr("class", "axis")
            	.attr("transform", "translate(0," + height + ")")
            	.call(d3.axisBottom(x));

           	g.append("g")
           		.attr("class", "axis")
           		.call(d3.axisLeft(y).ticks(null, "s"))
           	  .append("text")
           	  	.attr("x", 2)
           	  	.attr("y", y(y.ticks().pop()) + 0.5)
           	  	.attr("dy", "0.32em")
           	  	.attr("fill", "#000")
           	  	.attr("font-weight", "bold")
           	  	.attr("text-anchor", "start")
           	  	.text("Population");


           	var legend = g.append("g")
           		.attr("font-family", "sans-serif")
           		.attr("font-size", 10)
           		.attr("text-anchor", "end")
           	  .selectAll("g")
           	  .data(keys.slice().reverse())
           	  .enter().append("g")
           			.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });


           	legend.append("rect")
           			.attr("x", width - 19)
           			.attr("width", 19)
           			.attr("height", 19)
           			.attr("fill", z);


           	legend.append("text")
           			.attr("x", width - 24)
           			.attr("y", 9.5)
           			.attr("dy", "0.32em")
           			.text(function(d) { return d; });

           	function stackedBar_data_to_Pie(d) {
                var value = [d.Under_5_Years, d.Years_5_to_13, d.Years_14_to_17, d.Years_18_to_24, d.Years_25_to_44, d.Years_45_to_64,d.Years_65_and_Over ];
                return value;
            }

        },
        dispatch: d3.dispatch("selected")
    };
    return new_BS;
}