import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // Supporting code for search button
  doSearch(value: string){
    console.log("value= " + value);
    // we will call the route search with the given keyword
    // (route the data to "search" route. It will be handled by ProductListComponent)
    this.router.navigateByUrl("/search/" + value);
  }
}

