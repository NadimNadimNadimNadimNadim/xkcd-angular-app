import { Injectable, OnInit } from '@angular/core';
import { XkcdSearch } from './xkcd-search';
import { Observable, of, EMPTY, BehaviorSubject, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { shareReplay, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class XkcdSearchService {
  private readonly CURRENT_COMIC_CODE = '-1';
  private searchResults = new ReplaySubject<XkcdSearch>();
  private cache = new Map<string, XkcdSearch>();

  constructor(private http: HttpClient) {
    this.xkcdCurrentComic().subscribe((res) => {
      this.searchResults.next(res);
    });
  }

  onResults(): Observable<XkcdSearch> {
    return this.searchResults.asObservable();
  }

  xkcdSearch(comicNumber: string): void {
    if (this.cache[comicNumber]) {
      this.searchResults.next(this.cache[comicNumber]);
    }

    this.cache[comicNumber] = this.http
      .get<XkcdSearch>(environment.xkcdServer + `/${comicNumber}`)
      .pipe(
        (res) => {
          res.subscribe((res) => this.searchResults.next(res));
          return res;
        },
        shareReplay(1),
        catchError((err) => {
          console.error(err);
          delete this.cache[comicNumber];
          return EMPTY;
        })
      );
  }

  xkcdCurrentComic(): Observable<XkcdSearch> {
    if (this.cache[this.CURRENT_COMIC_CODE]) {
      return of(this.cache[this.CURRENT_COMIC_CODE]);
    }

    return (this.cache[this.CURRENT_COMIC_CODE] = this.http
      .get<XkcdSearch>(environment.xkcdServer + '/current')
      .pipe(
        (res) => {
          res.subscribe((res) => this.searchResults.next(res));
          return res;
        },
        shareReplay(1),
        catchError((err) => {
          console.error(err);
          delete this.cache[this.CURRENT_COMIC_CODE];
          return EMPTY;
        })
      ));
  }
}
