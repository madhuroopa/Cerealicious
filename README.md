# Cerealicious

A fun way to visualize nutrients in milk and cereals.

## Motivation

- Health and nutrition awareness
- Diverse milk options
- Cereal variations
- Lack of comprehensive information
- Need for visualization
- Cost consideration

## Intended Audience

- Budget-conscious individuals, such as college students or those on a tight budget, seeking affordable breakfast options.
- Health-conscious individuals interested in selecting nutritious breakfast choices.
- Dietitians and nutritionists who analyze and provide guidance on meal planning and nutrition.

## Questions

- What are the different nutrient constituents in different kinds/types of milk and cereal?
- What is the most affordable breakfast option per serving?
- Can we compare different cereal and milk combinations?
- What are the environmental impacts of a glass of milk?

## Dataset and Tools

### Datasets:

#### Manual Data Collection

The below pictures are taken for various cereals from the Costco store.

### Tools:

- Preprocessing
  - Excel
  - Python
- Visualization
  - D3.js

## Home Page

![Home Page](https://github.com/madhuroopa/Cerealicious/assets/22576343/19f53364-86db-4795-8ab9-d5536a2fb046)

## Waffle charts

### Data Transformation:

Serving size considered is 240 ml(milk) and 35-40g(cereals), By calculating the proportions of carbs, fiber, protein, etc in relation to the sum of serving sizes of respective milk or cereal types, we obtain a standardized measure that allows us to compare the relative contribution of these nutrients across different cereals and milk types.

### Design Rationale:

1. Each cell corresponds to a specific proportion, and the quantity of cells assigned to a nutrient reflects its percentage, allowing for an intuitive visual comparison between nutrient proportions.
2. The waffle chart design incorporates different colors for each nutrient. Color coding enhances visual distinction and aids in quickly identifying and associating specific nutrients.
3. Dynamic waffle generation is done using 2 dropdown menu selections which allows the user to view proportions of each nutrient type in each product type.
4. Dynamic waffle creates proportions for each box as a total of all product types for that nutrient.
5. We used a dynamic legend, which is changed according to the drop down values chosen
6. Dynamic legend also allows the users to navigate to radar charts to view more details and compare further

### Visual Encodings:

1. Cell Color: Each cell is filled with a color that represents a specific breakfast item. This visual encoding helps to distinguish between different items and enables easy identification and comparison.
2. Opacity: The opacity of each cell is set to 0.8, providing a slightly transparent appearance. This allows for a sense of depth and layering when multiple cells overlap. Additionally, when the user hovers over a cell, the opacity of other cells with the same breakfast item is reduced to 0.2, emphasizing the selected item.
3. Tooltip: When hovering over a cell, a tooltip is displayed with additional information about the specific breakfast item and its percentage. The tooltip provides a textual encoding that complements the visual encoding of the chart. It offers a precise value and enhances the understandability of the data.
4. Legend: Legend is included to provide a key for interpreting the colors used in the chart. The legend acts as a visual encoding guide, aiding in the identification and interpretation of the chart elements.

![Waffle Charts](https://github.com/madhuroopa/Cerealicious/assets/22576343/c24b9ca4-862f-4a14-8736-bd1ee3637775)

## Questions and Answers:
What are the different nutrient constituents in different kinds/types of milk and 
cereal? 
Overall Comparison:
- Proportion of carbs and fiber is more in cereals.
- Proportion of sugar is more in dairy based milk compared to plant.
- Proportion of fat is more in plant based milk compared to dairy.
Nutrient and breakfast item (milk or cereal) wise comparison: 
- Proportion of fats more in Whole milk, Proportion of protein more in Soy milk, Proportion of Fiber more in Oat 
and soy milk
- Proportion of fats is more in Oats based cereal, proportion of fiber is more in Oats and wheat based cereal
- Its notable that rice based cereals are low in essential nutrients like protein, fiber, healthy fats but more of 
carbs and sugars, they lack the overall nutritional diversity found in other cereal grains, this would not be a 
healthy choice.

## Stacked Bar charts

## Data Transformations: 
We merged the data from different data csvs that we collected. We had to transpose the data to fit my 
script requirements. For the cost, we had to scale the cost from per serving to a 30-day serving. 

## Design Rationale : 
1. The stacked bar chart is helpful as it provides the total constituents of various nutrients in the 
meal. This helps us highlight the number of nutrients added to milk and cereal separately. 
Also, we decided to flip the graph to make it horizontal as it helped in adding a subplot of the 
cost below the nutrients. 
2. The cost was scaled for 30 days to better help with comparing the monthly cost incurred on 
choosing a particular type of cereal and milk combination. 
3. The toggle button is really helpful as the user can compare two breakfast meals and values 
associated with the nutrients and the cost side by side. However, if the user does not want to 
compare, he can toggle off the button, and the visualization changes to just one portion. 
4. The visualization is flipped horizontally, and the Y axis represents different nutrients and the 
X axis represents their value in grams for the 1st graph. The X-axis represents the cost in 
dollars for the 2nd graph below the original visualization. 
## Visual Encoding: 
We used a tooltip that displays the nutrient value and the cost value on hover. In a stacked bar chart, 
for the bars away from the axis, it might sometimes get difficult to get the exact values of the graph, 
thus adding a tooltip to display the bar value would help the user make an informed decision. 
Adding a toggle button helps reduce clutter. If the user wants to view visualization for just one meal 
type, they can turn off the toggle and would not be distracted from the comparison charts. On the 
other hand, if the user wanted to compare values with different cereal and milk combinations, the user 
can easily do so by turning the toggle on. Two different colors were used, one for cereal and one for 
milk. We made sure that those colors did not blend together and were appropriate for the data. 

## Questions and Answers :
Can we compare different cereal and milk combinations?
- The Breakfast Comparison visualization helps us compare different combinations of 
milk and cereal.
- It would help user to visualize different nutrients and the cost associated with the meal
<img width="608" alt="image" src="https://github.com/madhuroopa/Cerealicious/assets/22576343/a81ef396-f10f-4e6a-994e-673f2ae4996a">

## Dot plot
## Data Transformation : 
The average serving size for breakfast consists of 1 cup of milk (approximately 240 ml) and 1 cup of 
cereal (around 40 grams). Since milk is typically sold in gallons at the store, it needs to be converted 
to milliliters for accurate measurement. Additionally, the price obtained for the whole can of milk 
needs to be scaled down to match the 240 ml serving size. 
Similarly, cereal boxes are usually measured in ounces, so they need to be converted to grams for 
precise measurement. The price obtained for the whole box of cereal must also be adjusted to reflect 
the 40 grams serving size. 
Considering that Costco operates as a wholesaler, the milk and cereal are available in multiple 
quantities. To ensure equal distribution among all stores, the price is scaled down for one quantity. 

## Design Rationale : 
1. We used a dot plot to compare the cost of breakfast per serving. The breakfast includes 1 cup 
of milk (approximately 240 ml) and 1 cup of cereal (around 40 grams). 
2. From our prior visualizations, we found that Whole Milk, Low Fat Milk, and Reduced Fat 
Milk are the three cheapest options. You can use the drop-down menu to compare the cost of 
each cereal with these milk options. 
3. We compared the cost per serving of different cereals, such as Raisin Bran, Cheerios, Fruit 
Loops, and Frosted Flakes. 
4. For the visual encoding, we opted to use colors that correspond to the logo colors of the 
respective stores. This was done to provide an intuitive link between the stores and their 
representation in the plot. We made an exception with Fred Mayer, assigning it a unique 
color, due to its logo color being similar to that of Costco's to prevent confusion. 
5. Each dot on the plot represents a different breakfast option at a given store, allowing for easy 
comparison 
6. The visualization aims to determine the most affordable store for breakfast. We compared 
wholesale stores like Costco and Target, as well as retail outlets like QFC, Whole Foods, and 
Fred Meyer. 
7. The interactive legend helps compare different breakfast combinations within the same store 
to find the best option. 
8. Tooltips have been added to provide additional information such as milk and cereal type, 
store name, and cost per serving when hovering over specific data points 
9. This “Comparative Analysis” helps individuals on a tight budget in finding the store with the 
most economical breakfast prices.

## Questions and Answers :
What is the most affordable breakfast option per serving?
- The most affordable breakfast option per serving is the combination of reduced-fat milk and 
frosted flakes, at Costco.
- Among the stores, Costco consistently offers the best prices for affordable breakfast 
combinations. Surprisingly, Fred Meyer, a retail store, offers lower prices compared to Target.
This finding highlights the importance of exploring different stores to find the most 
cost-effective breakfast options.
- Notably, Fruit Loops tend to be more expensive at QFC compared to other cereals.
- This information helps individuals make cost-effective choices for their breakfast needs

<img width="613" alt="image" src="https://github.com/madhuroopa/Cerealicious/assets/22576343/82265f0f-5dfc-48c7-91cb-bf27d1d58633">

## Lolipop chart

## Data Transformations: 
We collected the dataset from the BBC report and the data was clean. I merged the dataset for 
different environmental factors using Excel. 

## Design Rationale:
The lollipop chart helps us visualize the environmental impact of a glass of milk. For this,, we chose 
to build a lollipop chart as it is great at showing values and also the difference in values for different 
labels. This helps us give a numerical value to the environmental impact and highlight how low the 
impact is for another type of milk. 

## Visual Encoding: 
The chart has three buttons for visualizing different environmental impacts. The Y-axis scale changes 
according to the button selected and the unit on Y axis changes. The X-axis represents different types 
of milk and they are static

## Questions
What are the environmentalimpacts of a glass of milk?
## Answer
Dairy Milk has the mostenvironmental impact

<img width="465" alt="image" src="https://github.com/madhuroopa/Cerealicious/assets/22576343/af821078-a89b-440e-9001-b6de6a32e177">


## Future Work
- We can collect more data from different stores.
- Visualizing the different additives and preservative amounts in different milk 
and cereals.
- Collecting the sales data to find out which type is most popular.
- Performing surveys on different milk type

