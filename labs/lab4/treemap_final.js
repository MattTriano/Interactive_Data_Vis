var TreeMapVis = function() {
    var newTM = {
        drawTreemap: function(svg, treeroot) {
            var width = +svg.attr("width"),
                height = +svg.attr("height");    

            var color = d3.scaleOrdinal(d3.schemeCategory20);

            var format = d3.format(",d");

            var treemap = d3.treemap()
            .size([width, height])
            .round(true)
            .padding(1);

            treemap(treeroot);

            var cell = svg.selectAll("a")
            .data(treeroot.leaves())
            .enter().append("a")
                .attr("target", "_blank")
                // removing links .attr("xlink:href", function(d) { var p = d.data.path.split("/"); return "https://github.com/" + p.slice(0, 2).join("/") + "/blob/v" + version[p[1]] + "/src/" + p.slice(2).join("/"); })
                .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
                .on("click", function(d) {newTM.dispatch.call("selected", {}, d.data.path); })

            cell.append("rect")
                .attr("id", function(d) { return d.id; })
                .attr("width", function(d) { return d.x1 - d.x0; })
                .attr("height", function(d) { return d.y1 - d.y0; })
                .attr("fill", function(d) { var a = d.ancestors(); return color(a[a.length - 2].id); });

            cell.append("clipPath")
                .attr("id", function(d) { return "clip-" + d.id; })
            .append("use")
                .attr("xlink:href", function(d) { return "#" + d.id; });

            var label = cell.append("text")
                .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; });

            label.append("tspan")
                .attr("x", 4)
                .attr("y", 13)
                .text(function(d) { return d.data.path.substring(d.data.path.lastIndexOf("/") + 1, d.data.path.lastIndexOf(".")); });

            label.append("tspan")
                .attr("x", 4)
                .attr("y", 25)
                .text(function(d) { return format(d.value); });

            cell.append("title")
                .text(function(d) { return d.id + "\n" + format(d.value); });

            
        },

        dispatch: d3.dispatch("selected")
    };

  return newTM;

}
