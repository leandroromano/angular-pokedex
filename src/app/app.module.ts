import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { InfoComponent } from './components/modify/modifiableComponents/info/info.component';
import { TypesComponent } from './components/modify/modifiableComponents/types/types.component';
import { AbilitiesComponent } from './components/modify/modifiableComponents/abilities/abilities.component';
import { EvolutionsComponent } from './components/modify/modifiableComponents/evolutions/evolutions.component';
import { NameInputComponent } from './components/custom-controls/name-input/name-input.component';
import { TypesSelectComponent } from './components/custom-controls/types-select/types-select.component';
import { LevelInputComponent } from './components/custom-controls/level-input/level-input.component';

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
    CapitalizedPipe,
    InfoComponent,
    TypesComponent,
    AbilitiesComponent,
    EvolutionsComponent,
    NameInputComponent,
    TypesSelectComponent,
    LevelInputComponent
  ],
  imports: [BrowserModule, APP_ROUTING, FormsModule, ReactiveFormsModule],
  providers: [PokemonsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
