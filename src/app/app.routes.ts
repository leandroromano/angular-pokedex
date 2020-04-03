import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { SearchComponent } from './components/search/search.component';
import { ModifyComponent } from './components/modify/modify.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: BodyComponent },
  { path: 'add', component: AddComponent },
  { path: 'search', component: SearchComponent },
  { path: 'modify', component: ModifyComponent },
  { path: 'list', component: ListComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
