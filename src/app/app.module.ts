import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/shared/footer/footer.component';

import { APP_ROUTING } from './app.routes';
import { ListComponent } from './components/list/list.component';
import { SearchComponent } from './components/search/search.component';
import { AddComponent } from './components/add/add.component';
import { ModifyComponent } from './components/modify/modify.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, BodyComponent, FooterComponent, ListComponent, SearchComponent, AddComponent, ModifyComponent],
  imports: [BrowserModule, APP_ROUTING],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
