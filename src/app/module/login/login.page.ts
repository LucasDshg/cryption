import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular/standalone';
import { switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';
import { CorretoraService } from 'src/app/core/service/corretor.service';
import { UserStore } from 'src/app/core/store/user.store';

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
  providers: [NavController],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginPage {
  private _corretoraService = inject(CorretoraService);
  private _authService = inject(AuthService);
  private _store = inject(UserStore);
  private _router = inject(NavController);

  form = new FormGroup({
    key: new FormControl('', Validators.required),
    code: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.minLength(7),
    ]),
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this._authService
      .login(this.form.value.key!, this.form.value.code!)
      .pipe(
        tap((res) => {
          this._store.init(res);
        }),
        switchMap((res) => this._corretoraService.login(res.corretora)),
        tap((res) =>
          this._store.update({
            tokens: { corretora: res.token, bot: '' },
            id: this.form.value.code!,
          }),
        ),
      )
      .subscribe(() =>
        this._router.navigateRoot('/home', { replaceUrl: true }),
      );
  }
}
