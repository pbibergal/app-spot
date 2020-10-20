import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthorizedComponent } from './authorized/authorized.component';
import { SelectModule } from './select/select.module';
import { ArtistComponent } from './artist/artist.component';
import { CardModule } from './card/card.module';
import { JoinPipe } from './join.pipe';
import { AlbumDetailComponent } from './album-detail/album-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    AuthorizedComponent,
    ArtistComponent,
    JoinPipe,
    AlbumDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SelectModule,
    CardModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
