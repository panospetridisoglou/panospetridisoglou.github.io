import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {


  accessKey = '';
  posts: any[] = [];
  form: FormGroup;
  editMode = false;
  innerhtml = {};
  currentTags = "test";
  currentName = "TEST";
  currentDate = "2020-01-01";
  currentIcon = "";
  currentProject: any = {};

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {

    this.form = new FormGroup({
      currentDetails: new FormControl(''),
      currentTitle: new FormControl(''),
      currentTags: new FormControl(''),
      currentIcon: new FormControl(''),
    });
    this.currentDate = new Date().toDateString();
  }

  ngOnInit() {
    this.accessKey = window.location.href.split(/(?:=|&)+/)[3]
    this.getData();
    this.create();
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }
  enableEdit() {
    this.editMode = true;
  }
  disableEdit(key: any = null) {
    if ((!key) || (key.key == "Enter")) {
      this.editMode = false;
    }
  }
  preview() {
    this.innerhtml = this.sanitizer.bypassSecurityTrustHtml(this.form.get("currentDetails")!.value);
    this.currentName = this.form.get("currentTitle")?.value;
    this.currentTags = this.form.get("currentTags")?.value;
    this.currentIcon = this.form.get("currentIcon")?.value;
  }

  create() {
    this.currentProject = null
    this.currentDate = ''
    this.currentIcon = ''
    this.currentName = ''
    this.currentTags = ''
    this.innerhtml = ''
  }

  getData() {
    this.preview();
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.accessKey
      })
    }

    this.http.get("https://firestore.googleapis.com/v1/projects/bio-site-panospet/databases/(default)/documents/projects", httpOptions).subscribe((response: any) => {
      this.posts = response.documents;
    });
  }

  edit(project: any) {
    this.currentProject = project;
    this.form.get("currentTitle")?.setValue(project.fields["name"].stringValue)
    this.form.get("currentDetails")?.setValue(project.fields["details"].stringValue)
    this.currentTags = "";
    project.fields["tags"].arrayValue.values.forEach((x: any) => {
      this.currentTags += x.stringValue + ",";
    })
    this.currentTags = this.currentTags.substring(0, this.currentTags.length - 1);
    this.form.get("currentTags")?.setValue(this.currentTags)
    this.form.get("currentIcon")?.setValue(project.fields["icon"].stringValue)

    this.preview()
  }

  upload() {
   
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.accessKey
      })
    }

    if (!this.currentProject) {
      this.http.post("https://firestore.googleapis.com/v1/projects/bio-site-panospet/databases/(default)/documents/projects", {}, httpOptions).pipe().subscribe(
        response => {
          this.currentProject = response;
          this.postRequest(httpOptions);
          this.getData();

        }
      )
    }
    else{
      this.postRequest(httpOptions);
      this.getData();
    }


  }

  postRequest(httpOptions:any){
    
    var object=
      {
        "name": this.currentProject.name,
        "fields": {
          "name":{
            "stringValue":this.form.get("currentTitle")?.value
          },
          "icon":{
            "stringValue":this.form.get("currentIcon")?.value
          },
          "date":{
            "stringValue": new Date()
          },
          "details":{
            "stringValue": this.form.get("currentDetails")!.value
          },
          "tags":{
            "arrayValue": 
            {
              "values":[{}]
            }
          },
        }
      };
      object.fields["tags"].arrayValue.values=[];
      this.form.get("currentTags")?.value.split(',').forEach((x:any)=>
        object.fields["tags"].arrayValue.values.push(
            {"stringValue":x}
          )
      )
      
      this.http.patch("https://firestore.googleapis.com/v1/"+this.currentProject.name,object,httpOptions).pipe().subscribe(
        response=>{
          this.disableEdit()
        this.getData()
      }
      )
  }
}
