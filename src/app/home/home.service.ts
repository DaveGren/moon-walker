import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Pagination } from '../shared/pagination.model';
import { Card } from '../shared/card.model';

@Injectable()
export class HomeService {

  constructor(
    private http: HttpClient
  ) { }

  get(queryParam: string): Observable<any> {
    if (!queryParam) {
      return of([]);
    }

    return this.http.get(`${environment.api}/search`,
    {
      params: {
        'q': queryParam,
        'media_type': 'image'
      }
    })
      .pipe(
        map(({ collection }: any) => { return { items: collection.items, metadata: collection.metadata}}),
        map(({ items, metadata }: any ): Pagination<Card> => {
          return {
            items: items.map((element) => new Card(
              element.data[0].title,
              element.links[0].href,
              element.data[0].description,
            )),
            metadata: metadata
          }
        })
      );
  }

}
