import { HNLoader } from "langchain/document_loaders/web/hn";

const loader = new HNLoader("https://news.ycombinator.com/item?id=38099086");

const docs = await loader.load();

console.log(docs)