import { Configuration } from "openai";
import { environment } from '../../environments/environment';
export function GetConfiguration(){
   return  new Configuration({
        organization: environment.OrganisationId,
        apiKey: environment.APIKey,
      });
      //return configuration;
}