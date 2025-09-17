import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styles: [
    `
      .logo-content {
        width: 160px;
        height: 182px;
      }
    `,
  ],
  imports: [
    IonicComponentsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginPage {
  keyAccess = new FormControl('', Validators.required);

  submit(): void {
    //ToDO: valid key and go to home
  }
}
