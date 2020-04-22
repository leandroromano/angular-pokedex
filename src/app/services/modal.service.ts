import { Injectable, ComponentRef, Pipe } from '@angular/core';
import { Overlay, GlobalPositionStrategy, OverlayRef } from '@angular/cdk/overlay';
import { ConfirmationComponent, ConfirmationResponse } from '../components/portals/confirmation/confirmation.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { take, skip } from 'rxjs/operators';
import { isUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalPortal: ComponentPortal<any>
  private modalConfirmation;
  private overlayRef: OverlayRef;
  private componentRef: ComponentRef<ConfirmationComponent>;

  constructor(private overlay: Overlay) {
  }

  showModal() {
    this.modalPortal = new ComponentPortal(ConfirmationComponent);
    this.overlayRef = this.overlay.create({
      positionStrategy: new GlobalPositionStrategy().centerHorizontally().centerVertically('500px'),
      hasBackdrop: true,
      height: '600px',
      width: '600px'
    });
    let response: boolean;
    this.componentRef = this.overlayRef.attach(this.modalPortal);
    this.componentRef.instance.confirmation$.pipe(skip(1)).subscribe((confirmation: ConfirmationResponse) => {
      this.modalConfirmation = new BehaviorSubject<ConfirmationResponse>(confirmation)
      this.closeModal();
    })
  }

  closeModal() {
    this.overlayRef.detach()
  }

  getModalConfirmation() {
    return this.modalConfirmation.asObservable();
  }

}
