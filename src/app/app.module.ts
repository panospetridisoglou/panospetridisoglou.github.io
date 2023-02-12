import { NgModule, isDevMode, SecurityContext } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NavbarComponent } from './navbar/navbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ProjectComponent } from './project/project.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FirestoreModule } from '@angular/fire/firestore';
import { AngularFirestoreModule, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown'; 
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component'; 

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectComponent,
    AboutComponent,
    MainComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFirestoreModule,    
    MarkdownModule.forRoot() 
  ],
  providers: [       
     { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [MainComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
