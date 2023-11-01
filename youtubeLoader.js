import { YoutubeLoader } from "langchain/document_loaders/web/youtube";
import { openai } from "./openai.js";

const loader = YoutubeLoader.createFromUrl("https://www.youtube.com/watch?v=xf-wnjoQWF4", {
  language: "en",
  addVideoInfo: true,
});

const docs = await loader.load();

const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k-0613",
    temperature: 0,
    messages: [
      { role: "system", content: "You are a helpful AI assistant" },
      {
        role: "user",
        content: `Complete the following Task using the provided 
                context. If you cannot Complete the Task with the context, 
                don't lie and make up stuff. Just say you need more context.

                Task: Create a summary of the following context. Write it in markdown format. Include key notes, summary, etc. anything important.

                
                Context: ${docs.map((r) => r.pageContent).join('\n')}`,
      },
    ],
  });

console.log(`Answer: ${response.choices[0].message.content}`);