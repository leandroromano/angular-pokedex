import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonsService, PokemonType } from '../../../../services/pokemons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../../../services/modal.service';
import { ConfirmationResponse } from '../../../portals/confirmation/confirmation.component';
import { Subscription } from 'rxjs';
import { isUndefined } from 'util';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent implements OnInit, OnDestroy {

  queryParamName: string;
  pokemonTypesToDelete: PokemonType[] = [];
  pokemonTypesToAdd: PokemonType[] = [];
  addedTypes: PokemonType[] = [];
  removedTypes: PokemonType[] = [];
  notTypesError: boolean = false;
  modalResponse: boolean;
  modalSubscription: Subscription

  constructor(private pokemonsService: PokemonsService, private route: ActivatedRoute, private router: Router, private modal: ModalService) {
    this.route.params.subscribe(params => {
      this.queryParamName = params['name'];
    })
    this.pokemonTypesToDelete = pokemonsService.getTypesToDelete(this.queryParamName);
    this.pokemonTypesToAdd = pokemonsService.getTypesToAdd(this.queryParamName)
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (!isUndefined(this.modalSubscription)) {
      this.modalSubscription.unsubscribe();
    }
    this.modal.closeSubjectSubscription();
  }

  getTypeObject(typeName: string) {
    return this.pokemonsService.getType(typeName);
  }

  handleAddClick(newType: string) {
    if (this.pokemonTypesToDelete.length < 1) this.notTypesError = false;
    this.addedTypes.push(this.getTypeObject(newType));
    this.pokemonTypesToAdd = this.pokemonTypesToAdd.filter(type => type.name !== newType)
    this.pokemonTypesToDelete.push(this.getTypeObject(newType))
  }

  handleRemoveClick(removedType: string) {
    this.removedTypes.push(this.getTypeObject(removedType));
    this.pokemonTypesToAdd.push(this.getTypeObject(removedType));
    this.pokemonTypesToDelete = this.pokemonTypesToDelete.filter(type => type.name !== removedType)
  }

  handleBackClick() {
    this.router.navigate(['modify']);
  }

  saveChanges() {
    if (this.pokemonTypesToDelete.length == 0) {
      this.notTypesError = true;
    }
    else {
      let title = this.queryParamName + "'s types will be updated"
      this.modal.showModal(title)
      this.modalSubscription = this.modal.getModalConfirmation().subscribe((confirmation: ConfirmationResponse) => {
        this.modalResponse = confirmation ? confirmation.isConfirmed : false
        if (this.modalResponse) {
          this.pokemonsService.updateTypes(this.queryParamName, this.addedTypes, this.removedTypes);
          this.router.navigate(['modify']);
        }
      })
    }
  }

}
