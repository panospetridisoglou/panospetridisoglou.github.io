import { Component, ViewEncapsulation } from '@angular/core';
import {map, take} from "rxjs/operators";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class AboutComponent {
  about: SafeHtml={};
  constructor(private route: ActivatedRoute,private sanitizer: DomSanitizer, firestore: AngularFirestore) {
    firestore.collection('about').valueChanges().pipe(take(1)).subscribe(
      (response:any[])=>{
        this.about=this.sanitizer.bypassSecurityTrustHtml(response[0].details.toString());
      }
    );
  }

}
