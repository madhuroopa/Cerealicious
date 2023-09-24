 // Set the dimensions and margins of the graphs
 var margin = {top: 40, right: 70, bottom: 60, left: 200},
 width = 800 - margin.left - margin.right,
 height = 400 - margin.top - margin.bottom;

// Append the svg objects to the chart containers
var svg3 = d3.select("#chart3")
.append("svg")
 .attr("width", width + margin.left + margin.right)
 .attr("height", height + margin.top + margin.bottom)
.append("g")
 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg4 = d3.select("#chart4")
.append("svg")
 .attr("width", width + margin.left + margin.right)
 .attr("height", height + margin.top + margin.bottom)
.append("g")
 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 // Create tooltip element
var tooltip = d3.select("body")
.append("div")
.attr("class", "tooltip")
.style("opacity", 0);
// Load the data from e2.csv and e2-cost.csv
d3.csv("e2.csv", function(data) {
d3.csv("e2-cost.csv", function(costData) {
 // Function to update the charts based on selected options
 function updateCharts() {
   // Get the selected options
   var option1 = d3.select("#dropdown3").node().value;
   var option2 = d3.select("#dropdown4").node().value;

   // Filter the data based on selected options for the first chart
   var filteredData = data.map(function(d) {
     return {
       group: d.group,
       value1: +d[option1],
       value2: +d[option2]
     };
   });

   // Filter the data based on selected options for the second chart
   var costFilteredData = costData.map(function(d) {
     return {
       group: d.group,
       value: +d[option1],
       value2: +d[option2]
     };
   });

   // Set up the scales for the first chart
   var y = d3.scaleBand()
     .range([height, 0])
     .padding(0.2)
     .domain(filteredData.map(function(d) { return d.group; }));

   var x = d3.scaleLinear()
     .range([0, width])
     .domain([0, d3.max(filteredData, function(d) { return d.value1 + d.value2 +2 ; })]);

   // Set up the scales for the second chart
   var costX = d3.scaleLinear()
     .range([0, width])
     .domain([0, d3.max(costFilteredData, function(d) { return d.value + d.value2 +1; })]);

   // Remove existing bars for the first chart
   svg3.selectAll(".bar1").remove();
   svg3.selectAll(".bar2").remove();

   // Remove existing bars for the second chart
   svg4.selectAll(".cost-bar1").remove();
   svg4.selectAll(".cost-bar2").remove();

   // Add new bars for Option 1 for the first chart
   svg3.selectAll(".bar1")
     .data(filteredData)
     .enter().append("rect")
       .attr("class", "bar1")
       .attr("y", function(d) { return y(d.group); })
       .attr("x", 0)
       .attr("height", y.bandwidth())
       .attr("width", function(d) { return x(d.value1); })
       .style("fill", "#2A9D8F")
       // Tooltip event listeners
       .on("mouseover", function(d) {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html("Value: " + d.value1)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });

   // Add new bars for Option 2 for the first chart
   svg3.selectAll(".bar2")
     .data(filteredData)
     .enter().append("rect")
       .attr("class", "bar2")
       .attr("y", function(d) { return y(d.group); })
       .attr("x", function(d) { return x(d.value1); })
       .attr("height", y.bandwidth())
       .attr("width", function(d) { return x(d.value2); })
       .style("fill", "#F4A261")
       // Tooltip event listeners
       .on("mouseover", function(d) {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html("Value: " + d.value2)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });

   // Add new bars for the second chart
   svg4.selectAll(".cost-bar1")
     .data(costFilteredData)
     .enter().append("rect")
       .attr("class", "cost-bar1")
       .attr("y", function(d) { return 20; })
       .attr("x", 0)
       .attr("height", y.bandwidth())
       .attr("width", function(d) { return costX(d.value); })
       .style("fill", "#2A9D8F")
       // Tooltip event listeners
       .on("mouseover", function(d) {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html("Value: " + d.value)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });

   svg4.selectAll(".cost-bar2")
     .data(costFilteredData)
     .enter().append("rect")
       .attr("class", "cost-bar2")
       .attr("y", function(d) { return 20 ; })
       .attr("x", function(d) { return costX(d.value); })
       .attr("height", y.bandwidth())
       .attr("width", function(d) { return costX(d.value2); })
       .style("fill", "#F4A261")
       // Tooltip event listeners
       .on("mouseover", function(d) {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html("Value: " + d.value2)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });  

   // Update the Y axis for the first chart
   svg3.select(".y-axis")
     .transition()
     .duration(500)
     .call(d3.axisLeft(y).tickSizeOuter(0));

   // Update the X axis for the first chart
   svg3.select(".x-axis")
     .transition()
     .duration(500)
     .call(d3.axisTop(x));

   // Update the Y axis for the second chart
   svg4.select(".y-axis")
     .transition()
     .duration(500)
     .call(d3.axisLeft(y).tickSizeOuter(0));

   // Update the X axis for the second chart
   svg4.select(".x-axis")
     .transition()
     .duration(500)
     .call(d3.axisTop(costX));
 }

 // Set up the scales and color palette for the first chart
 var y = d3.scaleBand()
   .range([height, 0])
   .padding(0.2);

 var x = d3.scaleLinear()
   .range([0, width]);

 // Append Y and X axes for the first chart
 svg3.append("g")
   .attr("class", "y-axis");

 svg3.append("g")
   .attr("class", "x-axis");

 // Set up the scales and color palette for the second chart
 var costX = d3.scaleLinear()
   .range([0, width]);

 // Append Y and X axes for the second chart
 svg4.append("g")
   .attr("class", "x-axis");

 // Call the updateCharts function to initialize the charts
 updateCharts();

 // Call the updateCharts function whenever a dropdown option is changed
 d3.select("#dropdown3").on("change", updateCharts);
 d3.select("#dropdown4").on("change", updateCharts);
 
 // Legend for the first chart
 var legend1 = svg4.append("g")
 .attr("class", "legend")
 .attr("transform", "translate(" + (-350) + "," + (40) + ")");

legend1.append("text")
 .attr("x", 210)
 .attr("y", 9)
 .attr("dy", ".35em")
 .text("Cost ($) for 30 servings")
 .style("font-size", "14px");


});
});