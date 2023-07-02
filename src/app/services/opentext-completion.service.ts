import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { filter, from, map, observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OpentextCompletionService {

  constructor() { }
  readonly configuration = new Configuration({
    apiKey: environment.APIKey
  });

  readonly openai = new OpenAIApi(this.configuration);
  getDataFromOpenAI(text: string) {
    return from(this.openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      max_tokens: 256
    })).pipe(
      filter(resp => !!resp && !!resp.data),
      map(resp => resp.data),
      filter((data: any) => data.choices && data.choices.length > 0 && data.choices[0].text),
      map(data => data.choices[0].text)
    ).subscribe(data => {
      return data;
    });

  }
  async getDataFrnomOpenAPI(text: string) {
    const completion = await this.openai.createCompletion({
      model: "text-davinci-002",
      prompt: text,
    });
    return completion.data.choices[0].text;
  }

   generateTextCompletion(prompt: string) {
    try {
      // Send a request to the OpenAI API to generate text
       this.openai.createCompletion({
        model: 'text-davinci-002',
        prompt:prompt,
        max_tokens:1000,
        n: 1,
        temperature:0.85,
    }).then( response=>response.data.choices[0].text 
      );
      // Return the text of the response
    } catch (error) {
      throw error;
    }
  }
  
  }


