import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { AppRouting } from './app.module.routing';
import { CardsComponent } from './home/card/card.component';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { HomeService } from './home/home.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchComponent } from './home/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    HomeComponent,
    PageNotFoundComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LazyLoadImageModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRouting),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [ HomeService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
