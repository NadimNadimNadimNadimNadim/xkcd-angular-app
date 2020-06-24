import { Component, OnInit } from '@angular/core';
import { XkcdSearchService } from './xkcd-search.service';
import { XkcdSearch } from './xkcd-search';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'xkcd browser';
  loading: boolean;
  searchResult: XkcdSearch;
  constructor(private XkcdSearchService: XkcdSearchService) {}
  ngOnInit() {
    this.loading = true;
    this.XkcdSearchService.xkcdCurrentComic().subscribe(
      (result) => {
        this.searchResult = result;
      },
      (error) => {
        console.log(error);
      }
    );
    this.loading = false;
    // console.log(this.XkcdSearchService.xkcdCurrentComic());
  }
}
