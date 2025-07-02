**Cosey Technical Test (React, NextJS, TypeScript)**

My attempt on building a simple app with React, Node, Next JS and TypeScript.

Steps:
  - ✅ Created a Node JS backend to fetch the orders and item data.
  - ✅ Created a simple date picker frontend to display the different orders, as well as the items needed for the specific product.


**Challenges that I have faced**
- One issue I had in this test was how to map the different sub-items from each product. But after googling a few times, I saw a possibility where I can create a sort of dictionary files for the items, using the product id. Since each product id (Each Box) is unique, I can create a json dictionary (Items.json) file. A reference where I saw this was here: https://stackoverflow.blog/2022/06/02/a-beginners-guide-to-json-the-data-format-for-the-internet/ In my frontend file, I made a ItemMap type that includes the dictionary of a string (product_name) and the bundle of items as an array (Ex: Red roses, Box of chcolate,etc). 
