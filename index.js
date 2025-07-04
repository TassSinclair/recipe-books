import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();

async function recipeToPdf(base, url) {
  const page = await browser.newPage();
  console.info(`processing ${base + url}`)

  await page.goto(base + url, {waitUntil: 'networkidle2'});

  await page.addStyleTag({ content: `
    *[data-component="Tag"]{ display:none; }
    div[class*="Recipe_authorSection"] { display:none; }
    div[class*="Recipe_content"] { display:none; }
    *[data-component="Newsletter"]{ display:none; }
    *[data-component="ShareBanner"]{ display:none; }
    header *[data-component="RecipeStats"]{ display:none; }
    footer{ display:none; }
    *[data-component="RecipeStats"]{ border: none; }
    #recipe > div > h2 { display: none; }
  `});

  const title = await page.evaluate(() => {
    const stripPrefix = (text, marker) => text.indexOf(marker) == -1 ? text : text.substring(text.indexOf(marker) + marker.length);
    const titleise = (text) => text.charAt(0).toUpperCase() + text.slice(1);

    const header = document.querySelector('h1[data-component="Typography"]');
    header.textContent = titleise(stripPrefix(stripPrefix(header.textContent, "'s"), ":").trim());
    return header.textContent.toLowerCase().replaceAll(/\W/g,'-')
  });

  await page.pdf({
    path: `${title}.pdf`,
    displayHeaderFooter: false,
    format: 'A4',
    printBackground: false,
  });
  await page.close();
}

const recipeTopic = "2078"
const window = 1000; 
const base = "https://www.abc.net.au";
const hasRecipeTag = (article) => article.tags.some(tag => tag.title == "Recipe")

const total = 20; // there's supposedly 10,000 or so?


for(let i = 0; i < Math.ceil(total/window); ++i) {
  const offset = i * window;
  const size = Math.min(window, total - offset);
  const indexer = `${base}/news-web/api/loader/topicstoriesmore?documentId=${recipeTopic}&offset=${offset}&size=${size}`;
  console.info(`indexing from ${indexer}`)

  const page = await (await fetch(indexer)).json()
  for (const url of page.collection.filter(hasRecipeTag).map(it => it.link)) {
    await recipeToPdf(base, url)
  }
}  
await browser.close();

