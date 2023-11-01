import { GithubRepoLoader } from "langchain/document_loaders/web/github";
import { openai } from "./openai.js";

export const run = async () => {
  const loader = new GithubRepoLoader(
    "https://github.com/PhatStraw/smart-audit",
    {
      branch: "main",
      recursive: true,
      unknown: "warn",
      accessToken:
        "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",
      maxConcurrency: 5, // Defaults to 2
      ignorePaths: [
        "*.md",
        "package.json",
        ".yarn",
        "turbo.json",
        "yarn.lock",
        "test-int-deps-docker-compose.yml",
        ".watchmanconfig",
        ".nvmrc",
        ".gitattributes",
        "*.css",
        "*.svg",
        "*.png",
        ".eslintrc.json",
        ".gitignore",
        "jsconfig.json",
        "next.config.js",
        "package-lock.json",
        "postcss.config.js",
      ],
    }
  );
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
                    Task: Refactor the code to be as efficent as possible by react standards.
                    Context: ${docs.map((r) => r.pageContent).join('\n')}`,
      },
    ],
  });

  console.log(`Answer: ${response.choices[0].message.content}`);
};
run();
