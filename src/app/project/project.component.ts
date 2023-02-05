import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
selectedItem={};
items: Observable<any[]>;
search: string ='';

  public showMore(item:any){
    this.selectedItem=item;
    Nav_ScrollIntoView(item.name);
  }
  
  constructor(private route: ActivatedRoute, firestore: AngularFirestore) {
    this.search='';
    this.items = firestore.collection('projects').valueChanges().pipe(
      map(data => data.sort((a:any,b:any) => {
        return  new Date(a.date) > new Date(b.date) ? -1 : 1;
      })
    )
    );
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
