import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Pagination } from '../shared/pagination.model';

@Injectable()
export class HomeService {

  constructor(
    private http: HttpClient
  ) { }

  get(queryParam: string): Observable<any> {
    if (!queryParam) {
      return of([]);
    }

    return this.http.get(`${environment.api}/search?q=${queryParam}&media_type=image`)
      .pipe(
        map((response: any): Pagination<any> => response.collection.items)
      )
  }

}
