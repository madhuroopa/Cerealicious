function RadarChart(id, data, brands, options) {
    let cfg = {
        w: 600, //Width of the circle
        h: 600, //Height of the circle
        margin: { top: 10, right: 10, bottom: 10, left: 10 }, //The margins of the SVG
        levels: 3, //How many levels or inner circles should there be drawn
        maxValue: 0, //What is the value that the biggest circle will represent
        labelFactor: 1.1, //How much farther than the radius of the outer circle should the labels be placed
        wrapWidth: 60, //The number of pixels after which a label needs to be given a new line
        opacityArea: 0.35, //The opacity of the area of the blob
        dotRadius: 4, //The size of the colored circles of each blog
        opacityCircles: 0.05, //The opacity of the circles of each blob
        strokeWidth: 2, //The width of the stroke around each blob
        roundStrokes: false, //If true the area and stroke will follow a round path (cardinal-closed)
        color: d3.scaleOrdinal(d3.schemeCategory10), //Color function
    };

    //Put all of the options into a variable called cfg
    if ("undefined" !== typeof options) {
        for (let i in options) {
            if ("undefined" !== typeof options[i]) {
                cfg[i] = options[i];
            }
        }
    }

    //If the supplied maxValue is smaller than the actual one, replace by the max in the data
    let maxValue = Math.max(
        cfg.maxValue,
        d3.max(data, function (i) {
            return d3.max(
                i.map(function (o) {
                    return o.value;
                })
            );
        })
    );

    maxValue = Math.ceil(maxValue / 5) * 5;

    let allAxis = data[0].map(function (i, j) {
            return i.axis;
        }), //Names of each axis
        total = allAxis.length, //The number of different axes
        radius = Math.min(cfg.w / 2, cfg.h / 2), //Radius of the outermost circle
        Format = d3.format("%"), //Percentage formatting
        angleSlice = (Math.PI * 2) / total; //The width in radians of each "slice"

    //Scale for the radius
    let rScale = d3.scaleLinear().range([0, radius]).domain([0, maxValue]);

    //Create the container SVG and g
    let svg = d3
        .select(id)
        .append("svg")
        .attr("width", cfg.w + cfg.margin.left + cfg.margin.right)
        .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
        .append("g")
        .attr(
            "transform",
            "translate(" +
                (cfg.w / 2 + cfg.margin.left) +
                "," +
                (cfg.h / 2 + cfg.margin.top) +
                ")"
        );

    //Append the background circles
    let axisGrid = svg
        .selectAll(".axisGrid")
        .data(d3.range(1, cfg.levels + 1))
        .enter()
        .append("g")
        .attr("class", "axisGrid");

    axisGrid
        .append("circle")
        .attr("r", function (d, i) {
            return (radius / cfg.levels) * d;
        })
        .style("fill", "#CDCDCD")
        .style("stroke", "#CDCDCD")
        .style("fill-opacity", cfg.opacityCircles);

    //Text indicating at what % each level is
    axisGrid
        .append("text")
        .attr("class", "legend")
        .attr("x", function (d) {
            return 5;
            // return ((radius / cfg.levels) * d * cfg.labelFactor);
        })
        .attr("y", function (d) {
            return (-d * radius) / cfg.levels;
        })
        .attr("dy", "0.4em")
        .style("font-size", "10px")
        .attr("fill", "#737373")
        .text(function (d, i) {
            return (maxValue * d) / cfg.levels;
        });

    //Initialize legend
    var legendItemSize = brands.length;
    var legendSpacing = 4;
    var xOffset = 10;
    var yOffset = 10;
    var legend = d3.select("#legendz").selectAll(".legendItem").data(data);

    //Create legend labels
    legend
        .enter()
        .append("text")
        .attr("style", (d, i) => {
            return (
                "color: " +
                cfg.color(i) +
                "; padding-left: 15px; text-align: left; font-weight: bold;"
            );
        })
        .attr("x", xOffset + legendItemSize + 5)
        .attr(
            "y",
            (d, i) => yOffset + (legendItemSize + legendSpacing) * i + 12
        )
        .text((d, i) => {
            return brands[i];
        });

    //Create the straight lines radiating outward from the center
    let axis = svg
        .selectAll(".axis")
        .data(allAxis)
        .enter()
        .append("g")
        .attr("class", "axis");

    axis.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", function (d, i) {
            return (
                rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2)
            );
        })
        .attr("y2", function (d, i) {
            return (
                rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2)
            );
        })
        .attr("class", "line")
        .style("stroke", "white")
        .style("stroke-width", "2px");

    //Append the labels at each axis
    axis.append("text")
        .attr("class", "legend")
        .style("font-size", "11px")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("x", function (d, i) {
            return (
                rScale(maxValue * cfg.labelFactor) *
                Math.cos(angleSlice * i - Math.PI / 2)
            );
        })
        .attr("y", function (d, i) {
            return (
                rScale(maxValue * cfg.labelFactor) *
                Math.sin(angleSlice * i - Math.PI / 2)
            );
        })
        .text(function (d) {
            return d;
        })
        .call(wrap, cfg.wrapWidth);

    //The radial line function
    let radarLine = d3
        .lineRadial()
        .curve(d3.curveLinearClosed)
        .radius(function (d) {
            return rScale(d.value);
        })
        .angle(function (d, i) {
            return i * angleSlice;
        });

    if (cfg.roundStrokes) {
        radarLine.curve(d3.curveCardinalClosed);
    }

    //Create a wrapper for the blobs
    let blobWrapper = svg.append("g").attr("class", "radarWrapper");

    //Append the backgrounds
    blobWrapper
        .selectAll(".radarArea")
        .data(data)
        .enter()
        .append("path")
        .attr("class", "radarArea")
        .attr("style", "cursor:pointer")
        .attr("id", function (d, i) {
            return brands[i];
        })
        .attr("d", function (d, i) {
            return radarLine(d);
        })
        .style("fill", function (d, i) {
            return cfg.color(i);
        })
        .style("fill-opacity", cfg.opacityArea)
        .on("mouseover", function (d, i, index) {
            var tooltipDetails = i;
            var tooltipHeader = this.id;
            //Dim all blobs
            d3.selectAll(".radarArea")
                .transition()
                .duration(200)
                .style("fill-opacity", 0.1);
            //Bring back the hovered over blob
            d3.select(this)
                .transition()
                .duration(200)
                .style("fill-opacity", 0.9);
            tipMouseover(
                d,
                tooltipHeader,
                tooltipDetails,
                cfg.color(brands.indexOf(tooltipHeader))
            );
        })
        .on("mouseout", function () {
            //Bring back all blobs
            d3.selectAll(".radarArea")
                .transition()
                .duration(200)
                .style("fill-opacity", cfg.opacityArea);
            tipMouseout();
        });

    //Create the outlines
    blobWrapper
        .selectAll(".radarStroke")
        .data(data)
        .enter()
        .append("path")
        .attr("class", "radarStroke")
        .attr("d", function (d, i) {
            return radarLine(d);
        })
        .style("stroke-width", cfg.strokeWidth + "px")
        .style("stroke", function (d, i) {
            return cfg.color(i);
        })
        .style("fill", "none")
        .style("filter", "url(#glow)");

    //Append the circles
    blobWrapper
        .selectAll(".radarCircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "radarCircle")
        .attr("r", cfg.dotRadius)
        .attr("cx", function (d, i) {
            return rScale(d[0].value) * Math.cos(angleSlice * i - Math.PI / 2);
        })
        .attr("cy", function (d, i) {
            return rScale(d[0].value) * Math.sin(angleSlice * i - Math.PI / 2);
        })
        .style("fill", function (d, i, j) {
            return cfg.color(j);
        })
        .style("fill-opacity", 0.25);

    //Tooltip
    let tooltip = d3.select("body").append("div").attr("class", "tooltip");

    tooltip
        .style("position", "absolute")
        .style("pointer-events", "none")
        .style("opacity", 1);

    //Tooltip mouseover event handler
    let tipMouseover = function (d, header, details, color) {
        let formattedDetails = "<br>";
        details.forEach((data) => {
            formattedDetails += data["axis"] + " : " + data["value"] + "<br>";
        });
        let html =
            "<span style='color:" +
            color +
            ";'>" +
            header +
            "</span>" +
            "<span>" +
            formattedDetails +
            "</span>";
        tooltip
            .html(html)
            .style("left", d.pageX + "px")
            .style("top", d.pageY + "px")
            .style("color", color)
            .style("opacity", 1);
    };

    //Tooltip mouseout event handler
    let tipMouseout = function () {
        tooltip.style("opacity", 0);
    };

    //Helper function that wraps text labels
    function wrap(text, width) {
        text.each(function () {
            let text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.4, //ems
                y = text.attr("y"),
                x = text.attr("x"),
                dy = parseFloat(text.attr("dy")),
                tspan = text
                    .text(null)
                    .append("tspan")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("dy", dy + "em");
            while ((word = words.pop())) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", ++lineNumber * lineHeight + dy + "em")
                        .text(word);
                }
            }
        });
    }
}
