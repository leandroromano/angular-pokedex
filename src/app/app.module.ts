import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//Routes
import { APP_ROUTING } from './app.routes';

//Services
import { PokemonsService } from './services/pokemons.service';

//Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ListComponent } from './components/list/list.component';
import { SearchComponent } from './components/search/search.component';
import { AddComponent } from './components/add/add.component';
import { ModifyComponent } from './components/modify/modify.component';
import { CapitalizedPipe } from './pipes/capitalized.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    ListComponent,
    SearchComponent,
    AddComponent,
    ModifyComponent,
    CapitalizedPipe
  ],
  imports: [BrowserModule, APP_ROUTING, FormsModule],
  providers: [PokemonsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
