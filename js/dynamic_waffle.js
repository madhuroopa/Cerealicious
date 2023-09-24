document.addEventListener("DOMContentLoaded", function () {

  const data = [
    { type: "Plant Based", granular_Type: "Soy", fat: 2.6, carbs: 5.2, sugar: 3.2, protein: 6.2, fiber: 1.2, calcium: 0.45 },
    { type: "Plant Based", granular_Type: "Almond", fat: 2.7, carbs: 1.2, sugar: 0, protein: 1, fiber: 0.4, calcium: 0.4 },
    { type: "Plant Based", granular_Type: "Oat", fat: 5, carbs: 16.4, sugar: 7, protein: 2.08, fiber: 1.6, calcium: 0.38 },
    { type: "Plant Based", granular_Type: "Coconut", fat: 4.2, carbs: 6, sugar: 4.2, protein: 1.6, fiber: 0.6, calcium: 0.29 },
    { type: "Diary Based", granular_Type: "Whole", fat: 8.25, carbs: 12.75, sugar: 11.75, protein: 8, fiber: 0, calcium: 0.3 },
    { type: "Diary Based", granular_Type: "One_Percent_Reduced", fat: 2.5, carbs: 12.2, sugar: 12, protein: 8.2, fiber: 0, calcium: 0.33 },
    { type: "Diary Based", granular_Type: "Two_Percent_Reduced", fat: 5.2, carbs: 13, sugar: 9.8, protein: 8.4, fiber: 0, calcium: 0.33 },
    { type: "Diary Based", granular_Type: "Fat_Free", fat: 2.5, carbs: 12.4, sugar: 12.4, protein: 8.2, fiber: 0, calcium: 0.29 },
    { type: "cereals", granular_Type: "Corn", fat: 0.99, carbs: 35.89, sugar: 10.86, protein: 3.41, fiber: 2.5, calcium: 0.03 },
    { type: "cereals", granular_Type: "Wheat", fat: 2.33, carbs: 41.94, sugar: 10.08, protein: 4.61, fiber: 5.26, calcium: 0.02 },
    { type: "cereals", granular_Type: "Rice", fat: 1.3, carbs: 32.8, sugar: 10.54, protein: 2.45, fiber: 0.86, calcium: 0.01 },
    { type: "cereals", granular_Type: "Oats", fat: 3.39, carbs: 36.86, sugar: 10.74, protein: 4.17, fiber: 3.6, calcium: 0.06 }
  ];
  const granularTypeMap = {
    "Soy" : "html/RadarChart/Plants/Soy.html",
    "Almond" : "html/RadarChart/Plants/Almond.html",
    "Oat" : "html/RadarChart/Plants/Oat.html",
    "Coconut" : "html/RadarChart/Plants/Coconut.html",
    "Whole" : "html/RadarChart/Dairy/Whole.html",
    "One_Percent_Reduced" : "html/RadarChart/Dairy/1_Percent.html",
    "Two_Percent_Reduced" : "html/RadarChart/Dairy/2_Percent.html",
    "Fat_Free" : "html/RadarChart/Dairy/Skim.html",
    "Corn" : "html/RadarChart/Cereals/Corn.html",
    "Wheat" : "html/RadarChart/Cereals/Wheat.html",
    "Rice" : "html/RadarChart/Cereals/Rice.html",
    "Oats" : "html/RadarChart/Cereals/Oats.html",
  };
  // Constants for chart dimensions
  const chartWidth = 300;
  const chartHeight = 200;
  const cellSize = 20;

  // Function to generate the waffle chart and legend
  function generateWaffleChart(selectedNutrient, selectedBreakfastItem) {
    // Filter the data based on selected options
    const filteredData = data.filter(item => item.type.toLowerCase() === selectedBreakfastItem.toLowerCase());
    // Check if the selectedNutrient is "fiber" and selectedBreakfastItem is "diary based"

    // Calculate the total proportion for the selected nutrient
    const totalProportion = filteredData.reduce((total, item) => total + item[selectedNutrient], 0);

    // Calculate the percentages for each item
    const percentages = {};
    filteredData.forEach(item => {
      const percentage = (item[selectedNutrient] / totalProportion) * 100;
      percentages[item.granular_Type] = percentage;
    });

    // Calculate the number of cells
    const totalCells = Math.floor((chartWidth / cellSize) * (chartHeight / cellSize));

    // Create the SVG container for the chart
    const chartSvg = d3.select(".dynamic_chart")
      .html("") // Clear any existing chart
      .append("svg")
      .attr("width", chartWidth)
      .attr("height", chartHeight);

    // Generate the waffle chart
    let cellCount = 0;
    Object.entries(percentages).forEach(([granular_Type, percentage]) => {
      const numCells = Math.floor((percentage / 100) * totalCells);

      for (let i = 0; i < numCells; i++) {
        const tooltipText = `${granular_Type} :  ${percentage.toFixed(2)}%`;

        const cell = chartSvg.append("rect")
          .attr("class", `cell ${granular_Type}`)
          .attr("x", (cellCount % (chartWidth / cellSize)) * cellSize)
          .attr("y", Math.floor(cellCount / (chartWidth / cellSize)) * cellSize)
          .attr("width", cellSize)
          .attr("height", cellSize)
          .style("fill", d3.select(`.${granular_Type}`).style("fill"))
          .style("opacity", 0.8);
        // cell.on("click", function () {
        //   // Navigate to the desired HTML page
        //   window.location.href = "page.html";
        // });

        cell.on("mouseover", function (event) {

          const tooltip = d3.select(".tooltip");
          tooltip.style("visibility", "visible")
            .text(tooltipText);
          // Get the granular_Type of the current cell
          const currentGranularType = granular_Type;
          console.log(currentGranularType)
          // Change the opacity of all cells with the same granular_Type
          const currentChart = d3.select(this.parentNode);
          currentChart.selectAll(".cell")
            .style("opacity", function () {
              const cell = d3.select(this);
              return cell.classed(currentGranularType) ? 1 : 0.2;
            });

          // Calculate tooltip position
          const tooltipWidth = tooltip.node().getBoundingClientRect().width;
          const tooltipHeight = tooltip.node().getBoundingClientRect().height;
          const mouseX = event.clientX;
          const mouseY = event.clientY;

          const tooltipX = mouseX + 10;
          const tooltipY = mouseY + 10;

          tooltip.style("top", `${tooltipY}px`)
            .style("left", `${tooltipX}px`)
            .style("font-size", "20px");


        }).on("mouseout", function () {
          const tooltip = d3.select(".tooltip");
          tooltip.style("visibility", "hidden");
          // Reset the opacity of all cells in the current waffle chart to the default value (0.8)
          const currentChart = d3.select(this.parentNode);
          currentChart.selectAll(".cell")
            .style("opacity", 0.8);


        });

        cellCount++;
      }
    });

    // Generate the legend
    const legend = d3.select(".dynamic_legend")
      .html(""); // Clear any existing legend

    const legendItems = Object.entries(percentages)
      .filter(([granular_Type, percentage]) => percentage !== 0);

    const legendContainer = legend.append("ul")
      .style("list-style", "none")
      .style("padding", "0");

    const legendEntries = legendContainer.selectAll("li")
      .data(legendItems)
      .enter()
      .append("li")
      .style("display", "flex")
      .style("margin-bottom", "10px")
      .style("margin-right", "100px")
      .style("align-items", "center")
      .on("mouseover", function () {
        d3.select(this)
          .style("background-color", "lightgray")
          .style("cursor", "pointer");
      })
      .on("mouseout", function () {
        d3.select(this)
          .style("background-color", "initial")
          .style("cursor", "default");
      });

    legendEntries.append("span")
      .attr("class", "legend-color")
      .style("width", "12px")
      .style("height", "12px")
      .style("margin-right", "5px")
      .style("font-size", "18px")
      .style("background-color", ([granular_Type]) => d3.select(`.${granular_Type}`).style("fill"));

    legendEntries.append("span")
      .text(([granular_Type]) => granular_Type);
    legendEntries.on("click", function () {
      const granularType = d3.select(this).datum()[0]; // Retrieve the granular type from the clicked legend item
      const htmlFileName = granularTypeMap[granularType]; // Get the corresponding HTML file name

      if (htmlFileName) {
        window.location.pathname = htmlFileName; // Navigate to the desired HTML page
      }
    });
  }

  // Event listeners for dropdown changes
  const nutrientDropdown = document.getElementById("dropdown1");
  const breakfastDropdown = document.getElementById("dropdown2");

  if (nutrientDropdown.value.toLowerCase() === "fiber" && breakfastDropdown.value.toLowerCase() === "Diary Based") {
    console.log("hello")
    alert("No fiber content in diary milk");
  }

  function updateWaffleChart() {
    const selectedNutrient = nutrientDropdown.value;
    const selectedBreakfastItem = breakfastDropdown.value;

    generateWaffleChart(selectedNutrient, selectedBreakfastItem);


  }

  // Add event listeners to both dropdowns
  nutrientDropdown.addEventListener("change", updateWaffleChart);
  breakfastDropdown.addEventListener("change", updateWaffleChart);

  // Initial chart generation
  updateWaffleChart(); // Call the function to generate the initial chart
});
