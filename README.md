# Recipe Book

Download recipes from ABC and convert them for offline use. Good for uploading to an e-book reader.

## How?
- Pull down an index of ABC articles from the "Recipe" topic, filters by "Recipe" tag.
- Use Puppeteer to navigate to each article;
  - Apply CSS filtering to hide elements
  - Perform some DOM manipulation to clean up titles
  - Save a PDF of the article

## Really?
Input: [Spicy stovetop beans with eggs and feta](https://www.abc.net.au/news/2025-06-02/easy-spicy-stovetop-beans-with-eggs/105259770) recipe on ABC Recipes website.

Output: [Spicy stovetop beans with eggs and feta](spicy-stovetop-beans-with-eggs-and-feta.pdf) recipe as a PDF

## Attribution
All recipes remain copyright of their respective authors. Respect their work and don't distribute without permission.
