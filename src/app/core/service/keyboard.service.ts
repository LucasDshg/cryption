import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { IonContent } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class KeyboadService {
  readonly isMobile = Capacitor.isPluginAvailable('Keyboard');
  keyboardWillHide(content: IonContent): void {
    if (!this.isMobile) return;
    Keyboard.addListener('keyboardWillHide', () => {
      content.scrollToTop(500);
    });
  }

  removeAllListeners(): void {
    if (!this.isMobile) return;
    Keyboard.removeAllListeners();
  }
}
