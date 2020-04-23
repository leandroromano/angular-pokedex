import { Injectable, ComponentRef, Pipe, InjectionToken, Injector } from '@angular/core';
import { Overlay, GlobalPositionStrategy, OverlayRef } from '@angular/cdk/overlay';
import { ConfirmationComponent, ConfirmationResponse } from '../components/portals/confirmation/confirmation.component';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { take, skip } from 'rxjs/operators';
import { isUndefined } from 'util';

//export const PORTAL_DATA = new InjectionToken<{}>('PortalData');

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalPortal: ComponentPortal<any>
  private modalConfirmation;
  private overlayRef: OverlayRef;
  private componentRef: ComponentRef<ConfirmationComponent>;
  private subscription: Subscription

  constructor(private overlay: Overlay, private _injector: Injector) {
  }



  // createInjector(data): PortalInjector {

  //   const injectorTokens = new WeakMap<any, any>([
  //     [PORTAL_DATA, data],
  //   ]);

  //   return new PortalInjector(this._injector, injectorTokens);
  // }

  showModal(title: string) {
    this.modalConfirmation = new BehaviorSubject<ConfirmationResponse>(null);
    let componentData = new ComponentData(title)
    this.modalPortal = new ComponentPortal(ConfirmationComponent, null, this.createInjector(componentData));
    this.overlayRef = this.overlay.create({
      positionStrategy: new GlobalPositionStrategy().centerHorizontally().centerVertically(),
      hasBackdrop: true,
      height: '800px',
      width: '600px'
    });
    this.componentRef = this.overlayRef.attach(this.modalPortal);
    this.componentRef.instance.setTitle(title)
    this.subscription = this.componentRef.instance.confirmation$.subscribe((confirmation: ConfirmationResponse) => {
      this.modalConfirmation.next(confirmation)
      this.closeModal();
    })
  }

  createInjector(dataToPass: ComponentData): PortalInjector {
    const injectorTokens = new WeakMap([[ComponentData, dataToPass]]);
    return new PortalInjector(this._injector, injectorTokens);
  }

  closeModal() {
    this.overlayRef.detach()
  }

  getModalConfirmation() {
    return this.modalConfirmation.asObservable();
  }

  closeSubjectSubscription() {
    if (!isUndefined(this.modalConfirmation) && !isUndefined(this.subscription)) {
      this.modalConfirmation.complete();
      this.subscription.unsubscribe()
    }
  }

}

export class ComponentData {
  data: any

  constructor(_data: any) {
    this.data = _data
  }
}