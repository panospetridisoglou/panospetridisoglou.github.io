import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";

declare function Nav_ScrollIntoView(item:string) :any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  @Input() selectedItem={}; 
  items: any[]=[];
  search: string ='';
  
  public showMore(item:any){
    this.selectedItem=item;
    Nav_ScrollIntoView(item.name);
  }
  public unselect(){
    this.selectedItem={};
  }
  
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer,firestore: AngularFirestore) {
    this.items=[]
    this.search='';
     firestore.collection('projects').valueChanges().pipe(
      map(data => data.sort((a:any,b:any) => {
        return  new Date(a.date) > new Date(b.date) ? -1 : 1;
      })
    )
    ).subscribe(response=>{
      response.forEach(element => {
        let i:any={};
        i=element;
        i.details=this.sanitizer.bypassSecurityTrustHtml(i.details);
        this.items.push(i);
        
      });
    });
  }
  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.search = params['search'];
        if (!this.search) this.search='';
      }
    );
  }
}
