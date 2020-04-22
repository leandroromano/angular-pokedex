import { Component, OnInit } from '@angular/core';
import { Subject, Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  private confirmation = new BehaviorSubject<ConfirmationResponse>(null);
  simpleConfirmation: boolean
  confirmation$ = this.confirmation.asObservable();

  constructor() {
  }

  ngOnInit(): void {
  }

  setConfirmation(confirmation: boolean) {
    this.confirmation.next({ isConfirmed: confirmation })
    this.simpleConfirmation = confirmation;
  }
}

export interface ConfirmationResponse {
  isConfirmed: boolean
}
