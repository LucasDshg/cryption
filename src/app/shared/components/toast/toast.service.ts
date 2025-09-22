import { Injectable, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toastController = inject(ToastController);
  private _iconMap = new Map<string, string>();
  constructor() {
    this._iconMap.set('success', 'checkmark-circle-outline');
    this._iconMap.set('danger', 'close-circle-outline');
    this._iconMap.set('dark', 'information-circle-outline');
    this._iconMap.set('light', 'information-circle-outline');
  }
  async open(
    message: string,
    color: string = 'success',
    position: 'top' | 'middle' | 'bottom' = 'top',
    time: number = 3000,
  ): Promise<void> {
    const toast = await this._toastController.create({
      message: message,
      duration: time,
      cssClass: ['toast', color],
      position: position,
      swipeGesture: 'vertical',
      icon: this._iconMap.get(color),
      buttons: [
        {
          text: 'X',
          role: 'cancel',
        },
      ],
    });

    await toast.present();
  }
}
