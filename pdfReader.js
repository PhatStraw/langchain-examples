import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import fs from "fs";
import { openai } from "./openai.js";

const filePath = "./RESUME.pdf";
const arrayBuffer = fs.readFileSync(filePath);
const blob = new Blob([arrayBuffer]);

const loader = new WebPDFLoader(blob);

const docs = await loader.load();


const response = await openai.chat.completions.create({
    model: "gpt-4",
    temperature: 0,
    messages: [
      { role: "system", content: "You are a helpful AI assistant" },
      {
        role: "user",
        content: `Complete the following Task using the provided 
                context. If you cannot Complete the Task with the context, 
                don't lie and make up stuff. Just say you need more context.

                Task: Create a write up summarizing the candidate. Include Desired Pay, Work Authorization, Location, How soon he can start, 
                years of experience, Why hes a match for the job, Any other relevant notes depending on the job. Something you can email to a 
                hiring manager and they get excited before even seeing the resume. Your response tone should be of a excited, educated women.

                
                Context: ${docs.map((r) => r.pageContent).join('\n')}`,
      },
    ],
  });

console.log(`Answer: ${response.choices[0].message.content}`);
