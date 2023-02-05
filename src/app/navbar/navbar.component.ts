import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  searchClass="";

  public activateSearch(){
    if (this.searchClass=="") this.searchClass="active"
    else this.searchClass=""
  }
}

