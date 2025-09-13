/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ModalController } from '@ionic/angular/standalone';
import { ModalConfirmComponent } from './modal-confirm.component';
import { AppComponent } from 'src/app/app.component';

export function ConfirmAlert(options: {
  title: string;
  subtitle?: string;
  keyArgs?: string;
  actionBtn?: string;
}) {
  return (
    target: object,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any): Promise<void> {
      const modalCtrl = AppComponent.injector.get(ModalController);
      let title = options.title;
      if (options.keyArgs) {
        const value: string | object = args[0];
        if (typeof value === 'string') {
          title = `${options.title} ${value}`;
        } else {
          title = `${options.title}  ${args[0][options.keyArgs]}`;
        }
      }

      const confirmModal = await modalCtrl.create({
        component: ModalConfirmComponent,
        componentProps: {
          title: title.concat('?'),
          subtitle: options.subtitle ?? 'Esta ação não pode ser desfeita',
          actionBtn: options.actionBtn ?? 'confirmar',
        },
        id: 'confirme-modal',
      });

      await confirmModal.present();

      const dismiss = await confirmModal.onDidDismiss();

      if (dismiss.data) return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
