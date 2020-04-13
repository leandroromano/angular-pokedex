import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { SearchComponent } from './components/search/search.component';
import { ModifyComponent } from './components/modify/modify.component';
import { InfoComponent } from './components/modify/modifiableComponents/info/info.component';
import { TypesComponent } from './components/modify/modifiableComponents/types/types.component';
import { AbilitiesComponent } from './components/modify/modifiableComponents/abilities/abilities.component';
import { EvolutionsComponent } from './components/modify/modifiableComponents/evolutions/evolutions.component';

const APP_ROUTES: Routes = [
  { path: '', component: BodyComponent },
  { path: 'add', component: AddComponent },
  { path: 'search', component: SearchComponent },
  { path: 'modify', component: ModifyComponent },
  { path: 'modify/:name/info', component: InfoComponent },
  { path: 'modify/:name/types', component: TypesComponent },
  { path: 'modify/:name/abilities', component: AbilitiesComponent },
  { path: 'modify/:name/evolutions', component: EvolutionsComponent },
  { path: 'list', component: ListComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
