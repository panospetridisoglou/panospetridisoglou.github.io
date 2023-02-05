import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title='Portfolio';
  items: Observable<any[]>;
  search: string ='';
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