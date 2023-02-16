import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  searchClass="";
  searchtext="";
  constructor(private route: ActivatedRoute,private router: Router){
    
  }
  public activateSearch(){
    if (this.searchClass=="") this.searchClass="active"
    else this.searchClass=""
  }
  search( changed:any){
    this.router.navigate(['home'],  { queryParams: { "search": this.searchtext } });
  }
}

