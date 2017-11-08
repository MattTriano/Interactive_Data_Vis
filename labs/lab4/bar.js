function BarChartVis() {
    var newBC = {
        // data should have form [ {label: "", value: #}]
        drawBarchart: function(svg, data) {
            var width = +svg.attr("width"),
                height = +svg.attr("height");

            var y = d3.scaleLinear()
                .range([height, 0])
                .domain([0, d3.max(data, function(d) { return d.value; })]);
            
              var barWidth = width / data.length;
            
              svg.selectAll("g").remove();

              var bar = svg.selectAll("g")
                  .data(data)
                .enter().append("g")
                  .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });
            
              bar.append("rect")
                  .attr("class", "bar")
                  .attr("y", function(d) { return y(d.value); })
                  .attr("height", function(d) { return height - y(d.value); })
                  .attr("width", barWidth - 1);
            
              bar.append("text")
                  .attr("class", "barlabel")
                  .attr("x", barWidth / 2)
                  .attr("y", function(d) { return y(d.value) + 3; })
                  .attr("dy", ".75em")
                  .text(function(d) { return d.label; });
        }
    }
    return newBC;
}