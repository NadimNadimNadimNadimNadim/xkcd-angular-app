import { Component, OnInit } from '@angular/core';
import { XkcdSearch } from '../xkcd-search';
import { XkcdSearchService } from '../xkcd-search.service';

@Component({
  selector: 'app-xkcd-display',
  templateUrl: './xkcd-display.component.html',
  styleUrls: ['./xkcd-display.component.css'],
})
export class XkcdDisplayComponent implements OnInit {
  loading: boolean;
  searchResult: XkcdSearch;
  date: Date;
  constructor(private XkcdSearchService: XkcdSearchService) {}
  ngOnInit() {
    this.loading = true;
    this.XkcdSearchService.onResults().subscribe(
      (result) => {
        this.searchResult = result;
        this.date = new Date(
          Number(result.year),
          Number(result.month),
          Number(result.day)
        );
        this.loading = false;
      },
      (error) => {}
    );
  }
}
