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
