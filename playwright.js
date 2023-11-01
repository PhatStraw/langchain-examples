import { PlaywrightWebBaseLoader } from "langchain/document_loaders/web/playwright";

/**
 * Loader uses `page.content()`
 * as default evaluate function
 **/
const loader = new PlaywrightWebBaseLoader("https://www.tabnews.com.br/");

const docs = await loader.load();

console.log(docs)