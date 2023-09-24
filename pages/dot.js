document.addEventListener("DOMContentLoaded", function() {
    // Get the dropdown selection element
    var datasetSelect = document.getElementById("dataset-select");
  
    // Set up event listener for when selection changes
    datasetSelect.addEventListener("change", function(e) {
      // Get the selected dataset
      var selectedDataset = e.target.value;
  
      // Clear the current visualization
      d3.select("#chart-container").html("");
  
      // Clear the current legend
      d3.select("#legend-container").html("");
  
      // Load the new CSV file and redraw the visualization
      drawVisualization(selectedDataset);
    });
  
    // Load the initial visualization
    drawVisualization(datasetSelect.value);
  
    function drawVisualization(dataset) {
      // Load the CSV file
      d3.csv(dataset, function(error, data) {
        if (error) throw error;
  
        data.forEach(function(d) {
          d.Value = +d.Value;
        });
  
        // Set up the dimensions for the chart
        var margin = { top: 80, right: 120, bottom: 80, left: 100 };
        var width = 1000 - margin.left - margin.right;
        var height = 800 - margin.top - margin.bottom;
  
        // Create an SVG element
        var svg = d3.select("#chart-container").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
        // Set up scales for x and y axes
        var xScale = d3.scaleBand()
          .domain(data.map(function(d) { return d.Category; }))
          .range([0, width])
          .padding(0.1);
  
        var yScale = d3.scaleLinear()
          .domain([0, 2.6])
          .range([height, 0]);
  
        // Set up color scale for types
        var colorScale = d3.scaleOrdinal()
          .domain(data.map(function(d) { return d.Store; }))
          .range(["#005BAD", "red", "#FFEE00", "#006F46", "#161E54"]);
  
        // Add dots
        var dots = svg.selectAll(".dot")
          .data(data)
          .enter().append("circle")
          .attr("class", "dot")
          .attr("cx", function(d) { return xScale(d.Category) + xScale.bandwidth() / 2; })
          .attr("cy", function(d) { return yScale(d.Value); })
          .attr("r", 8)
          .style("fill", function(d) { return colorScale(d.Store); })
          .on("mouseover", function(d) {
            tooltip.style("visibility", "visible")
              .html("Milk Type: " + dataset.split(".")[0] + "<br>Cereal Type: " + d.Category + "<br>Store: " + d.Store + "<br>Price: $ " + d.Value)
              .style("left", (d3.event.pageX + 10) + "px")
              .style("top", (d3.event.pageY - 10) + "px");
          })
          .on("mouseout", function() {
            tooltip.style("visibility", "hidden");
          });
  
        // Add x-axis to the SVG
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .attr("class", "axis")
          .call(d3.axisBottom(xScale));
  
        // Add y-axis to the SVG
        svg.append("g")
          .attr("class", "axis")
          .call(d3.axisLeft(yScale));
  
        // Add x-axis label
        svg.append("text")
          .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom - 10) + ")")
          .style("text-anchor", "middle")
          .style("font-size", "21px")
          .style("font-weight", "bold")
          .text("Types of Cereals");
  
        // Add y-axis label
        svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left)
          .attr("x", 0 - (height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .style("font-size", "21px")
          .style("font-weight", "bold")
          .text("Cost Per Breakfast Serving($)");
  
        // Add chart title
        svg.append("text")
          .attr("x", width / 2)
          .attr("y", 0 - (margin.top / 2))
          .attr("text-anchor", "middle")
          .style("font-size", "25px")
          .style("font-weight", "bold")
          .text("Affordable Breakfast Per Serving");
  
        // Add tooltip div
        var tooltip = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("position", "absolute")
          .style("z-index", "10")
          .style("visibility", "hidden");
  
        // Create legend container
        var legendContainer = svg.append("g")
          .attr("class", "legend")
          .attr("transform", "translate(" + (width - 10) + ", 0)");
  
        // Add legend items
        var legendItems = legendContainer.selectAll(".legend-item")
          .data(colorScale.domain())
          .enter().append("g")
          .attr("class", "legend-item")
          .attr("transform", function(d, i) { return "translate(0," + (i * 20) + ")"; })
          .on("click", function(type) {
            // Toggle visibility and opacity of dots based on the selected type
            var dotsToToggle = dots.filter(function(d) { return d.Store === type; });
            var isHidden = dotsToToggle.style("opacity") === "0";
            dotsToToggle.style("opacity", isHidden ? 1 : 0);
  
            // Adjust legend item styling based on dot visibility
            d3.select(this).classed("inactive", isHidden);
          });
  
        legendItems.append("rect")
          .attr("width", 10)
          .attr("height", 10)
          .style("fill", function(d) { return colorScale(d); });
  
        legendItems.append("text")
          .attr("x", 15)
          .attr("y", 6)
          .attr("dy", "0.35em")
          .text(function(d) { return d; });
          document.getElementById("back-button").addEventListener("click", function() {
            window.location.href = '../index.html';
          });
      });
    }
  });
  