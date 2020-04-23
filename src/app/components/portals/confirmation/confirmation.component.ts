import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ComponentData } from '../../../services/modal.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  private confirmation = new ReplaySubject<ConfirmationResponse>(1);
  title: string = '';
  simpleConfirmation: boolean
  confirmation$ = this.confirmation.asObservable();

  constructor(@Inject(ComponentData) private componentData: ComponentData) {
    this.title = this.componentData.data;
  }

  ngOnInit(): void {
  }

  setTitle(_title: string) {
    this.title = _title
  }

  setConfirmation(confirmation: boolean) {
    this.confirmation.next({ isConfirmed: confirmation })
    this.simpleConfirmation = confirmation;
    this.confirmation.complete()
  }

}

export interface ConfirmationResponse {
  isConfirmed: boolean
}
