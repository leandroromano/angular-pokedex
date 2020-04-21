import { Injectable, ComponentRef } from '@angular/core';
import { Overlay, GlobalPositionStrategy, OverlayRef } from '@angular/cdk/overlay';
import { ConfirmationComponent, ConfirmationResponse } from '../components/portals/confirmation/confirmation.component';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalPortal: ComponentPortal<any>
  private modalConfirmation: boolean;
  private overlayRef: OverlayRef;
  private componentRef;

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
    this.componentRef = this.overlayRef.attach(this.modalPortal);
    this.componentRef.instance.onConfirmationResponse$().subscribe((response: ConfirmationResponse) => {
      this.modalConfirmation = response.isConfirmed
      this.closeModal()
    })
  }

  closeModal(): void {
    this.overlayRef.detach()
  }

  getConfirmationResponse() {
    return this.modalConfirmation;
  }

  // getConfirmationResponse(): boolean {
  //   let confirmationRespone: boolean
  //   this.componentRef.instance.onConfirmationResponse$().subscribe((response: ConfirmationResponse) => {
  //     confirmationRespone = response.isConfirmed
  //     this.closeModal();
  //     console.log(confirmationRespone);
  //   });
  //   return confirmationRespone
  // }
}
