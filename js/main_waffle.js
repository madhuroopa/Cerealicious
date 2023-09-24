document.addEventListener("DOMContentLoaded", function() {
  // Dairy milk
  const data1 = {
    carbs: 12.57,
    fat: 3.76,
    sugar: 11.47,
    protein: 8.21,
  };

  // Plant-Based
  const data2 = {
    carbs: 7.57,
    fat: 3.89,
    sugar: 3.78,
    protein: 2.86,
    fiber: 1.0,
  };

  // Cereal
  const data3 = {
    carbs: 37.69,
    fat: 2.14,
    sugar: 10.06,
    protein: 4.02,
    fiber: 3.61,
  };

  const chartWidth = 300; // Width of each chart
  const chartHeight = 200; // Height of each chart
  const cellSize = 20; // Size of each cell

  // Function to generate the waffle chart
  function generateWaffleChart(data, containerId) {
    // Calculate the total proportion
    const totalProportion = Object.values(data).reduce((total, proportion) => total + proportion, 0);

    // Calculate the percentages for each nutrient
    const percentages = {};
    Object.entries(data).forEach(([nutrient, proportion]) => {
      const percentage = (proportion / totalProportion) * 100;
      percentages[nutrient] = percentage;
    });

    // Calculate the number of cells
    const totalCells = Math.floor((chartWidth / cellSize) * (chartHeight / cellSize));

    // Create the SVG container
    const svg = d3.select(`#${containerId}`)
      .append("svg")
      .attr("width", chartWidth)
      .attr("height", chartHeight);

    // Generate the waffle chart
    let cellCount = 0;

    Object.entries(percentages).forEach(([nutrient, percentage]) => {
      const numCells = Math.floor((percentage / 100) * totalCells);

      for (let i = 0; i < numCells; i++) {
        const tooltipText = `${nutrient}: ${percentage.toFixed(2)}%`;

        const cell = svg.append("rect")
          .attr("class", `cell ${nutrient}`)
          .attr("x", (cellCount % (chartWidth / cellSize)) * cellSize)
          .attr("y", Math.floor(cellCount / (chartWidth / cellSize)) * cellSize)
          .attr("width", cellSize)
          .attr("height", cellSize)
          .style("fill", d3.select(`.${nutrient}`).style("fill"))
          .style("opacity", 0.8); // Adjust the opacity as per your preference

        cell.on("mouseover", function(event) {
          const tooltip = d3.select(".tooltip");
          tooltip.style("visibility", "visible").text(tooltipText);

          const currentGranularType = nutrient;
          const currentChart = d3.select(this.parentNode);

          // Change the opacity of all cells in the current waffle chart
          currentChart.selectAll(".cell")
            .style("opacity", function() {
              const cell = d3.select(this);
              return cell.classed(currentGranularType) ? 1 : 0.2;
            });

          // Calculate tooltip position and set it
          const tooltipWidth = tooltip.node().getBoundingClientRect().width;
          const tooltipHeight = tooltip.node().getBoundingClientRect().height;
          const mouseX = event.clientX;
          const mouseY = event.clientY;

          const tooltipX = mouseX + 10;
          const tooltipY = mouseY + 10;

          tooltip.style("top", `${tooltipY}px`)
            .style("left", `${tooltipX}px`)
            .style("font-size", "20px");
        })
        .on("mouseout", function() {
          const tooltip = d3.select(".tooltip");
          tooltip.style("visibility", "hidden");

          const currentChart = d3.select(this.parentNode);

          // Reset the opacity of all cells in the current waffle chart to the default value (0.8)
          currentChart.selectAll(".cell")
            .style("opacity", 0.8);
        });

        cellCount++;
      }
    });
  }

  // Create the tooltip element
  d3.select("body")
    .append("div")
    .attr("class", "tooltip");

  // Generate the waffle charts
  generateWaffleChart(data1, "chart1");
  generateWaffleChart(data2, "chart2");
  generateWaffleChart(data3, "chart3");
});
