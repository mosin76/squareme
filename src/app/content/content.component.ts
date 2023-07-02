import { Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { TextRequest } from '../model/requesttext';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GetIntentContents, GetIntents, GetLanguages, IgnoreText, IntentContents, intents, languages } from '../constant/constant';
import { OpentextCompletionService } from '../services/opentext-completion.service';
import { Configuration, OpenAIApi } from 'openai';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import {Clipboard} from '@angular/cdk/clipboard';
import { ToastrService } from 'ngx-toastr';

declare var $: any;
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})

export class ContentComponent implements OnInit {

  title = 'Square me';
  txtResult = <HTMLElement>document.getElementById("textResult");
 
  formdata!: FormGroup;
  submitted = false;
  showSpinner = false;
  disabledSubmit=false;
  disabledClipboard=false;
  languages: languages[] = GetLanguages();
  intents: intents[] = GetIntents();
  intentcontents: IntentContents[] = GetIntentContents();
  languageSelected = '0';
  //formdata!: FormGroup;
  textRequest!: TextRequest;
  isSubmit = false;
  summernotetext: string = '';
  testEmitter$ = new BehaviorSubject<string>(this.summernotetext);
  constructor(private toastr: ToastrService,private clipboard: Clipboard,private fb: FormBuilder, private opentextCompletionService: OpentextCompletionService, private ngZone: NgZone,private renderer: Renderer2) { }
  readonly configuration = new Configuration({
    apiKey: environment.APIKey
  });

  readonly openai = new OpenAIApi(this.configuration);
  ngOnInit(): void {
    this.formdata = this.fb.group({
      optlanguage: new FormControl('', Validators.required),
      optintent: new FormControl('', Validators.required),
      optcontent: new FormControl('', Validators.required),
      question: new FormControl('', Validators.required),
    });
    $('#summernote').summernote();
  }
  changelanguage(e: any) {
    this.optlanguage?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  changeIntent(e: any) {
    this.optintent?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  changeContent(e: any) {
    this.optcontent?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  gettestResult(){
    return <HTMLElement>document.getElementById("textResult");
  }
  get optSummerNote() {
    return this.summernotetext;
  }
  get optlanguage() {
    return this.formdata.get('optlanguage');
  }
  get optintent() {
    return this.formdata.get('optintent');
  }
  get optcontent() {
    return this.formdata.get('optcontent');
  }
  get question() {
    return this.formdata.get('question');
  }
  get GetLanguageOption() {
    return GetLanguages();
  }
  get GetIntentOption() {
    return GetIntents();
  }
  get GetSupernotes() {
    return this.summernotetext;
  }
  async onClickSubmit(data: any) {
    this.submitted = true;
    this.showSpinner = true;
    this.disabledSubmit=true;
    this.gettestResult().innerHTML='';
   
    if (!this.formdata.valid) {
      this.showSpinner = false;
      this.disabledSubmit=false;
      return;
    }
    if (this.formdata.valid) {
      let Prompts = IgnoreText + 'Your expert in ' + data.optcontent + '.' + 'Wrtie a ' + data.optintent + ' ' + data.optcontent + ' on ' + data.question + ' in ' + data.optlanguage
        ;
     
      const response = await this.openai.createCompletion({
        model: 'text-davinci-003',
        prompt: Prompts,
        max_tokens: 1000,
        n: 1,
        temperature: 0.5,
      })
      debugger;
      this.disabledSubmit=false;
      this.summernotetext = response.data.choices[0].text || '';
      await this.typeWriter(this.summernotetext,0);
      this.showSpinner = false;
      this.submitted = false;
      

    }

  }
  async typeWriter(text:string,i:number) {
    var txt = text;
    var speed = 20;
    if (txt!=undefined && i < txt.length) {
      
      let txtResult = <HTMLElement>document.getElementById("textResult");
      txtResult.innerHTML+=txt.charAt(i);
      i++;
      setTimeout(() => { this.typeWriter(text,i); },speed)
    }else{
      this.disabledClipboard=true;
    }
  }
 
  copyLongText() {
    const pending = this.clipboard.beginCopy(this.summernotetext);
    let remainingAttempts = 3;
    const attempt = () => {
      const result = pending.copy();
      if (!result && --remainingAttempts) {
        setTimeout(attempt);
      } else {
        pending.destroy();
      }
      this.toastr.success('Data copied to Clipboard !!', "Square me")
      setTimeout(() => {
        this.toastr.clear();
  }, 3000)
    };
    attempt();
  }
}
  

