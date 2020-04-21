import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  private confirmation: Subject<ConfirmationResponse>

  constructor() {
    this.confirmation = new Subject();
  }

  ngOnInit(): void {
  }

  setConfirmation(confirmation: boolean) {
    this.confirmation.next({ isConfirmed: confirmation })
    this.confirmation.complete();
  }

  onConfirmationResponse$(): Observable<ConfirmationResponse> {
    return this.confirmation.asObservable();
  }
}

export interface ConfirmationResponse {
  isConfirmed: boolean
}
