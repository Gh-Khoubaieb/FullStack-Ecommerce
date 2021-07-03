import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  doSearch(myInput: string) {

    this.router.navigateByUrl(`/search/${myInput}`);
    console.log(`value of url=${this.router}`) ;
  }
}
