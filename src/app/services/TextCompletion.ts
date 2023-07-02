
import { Configuration, CreateChatCompletionRequest, ChatCompletionRequestMessage, CreateCompletionRequest, OpenAIApi } from "openai";
import { GetConfiguration } from "../Configuration/ChatgtpConfiguration";
export async function TextCompletion(prompt:string)
{
    const req: CreateCompletionRequest={
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 1000
      };
      const openai = new OpenAIApi(GetConfiguration());
      const response = await openai.createCompletion(req);
      return response;
}
