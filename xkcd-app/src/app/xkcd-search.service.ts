import { Injectable } from '@angular/core';
import { XkcdSearch } from './xkcd-search';
import { Observable, of, EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { shareReplay, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class XkcdSearchService {
  private readonly URL_START = 'http://xkcd.com/';
  private readonly URL_END = '/info.0.json';
  private readonly CURRENT_COMIC_CODE = '-1';
  cache = new Map<string, XkcdSearch>();

  constructor(private http: HttpClient) {}

  xkcdSearch(comicNumber: string): Observable<XkcdSearch> {
    if (this.cache[comicNumber]) {
      return of(this.cache[comicNumber]);
    }

    this.cache[comicNumber] = this.http
      .get<XkcdSearch>(environment.xkcdServer + `${comicNumber}`)
      .pipe(
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
        shareReplay(1),
        catchError((err) => {
          console.error(err);
          delete this.cache[this.CURRENT_COMIC_CODE];
          return EMPTY;
        })
      ));
  }
}
