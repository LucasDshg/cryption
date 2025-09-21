import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular/standalone';
import { finalize, switchMap, tap } from 'rxjs';
import { IBot, ICorretora } from 'src/app/core/interfaces/user.interface';
import { AuthService } from 'src/app/core/service/auth.service';
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
  private _authService = inject(AuthService);
  private _store = inject(UserStore);
  private _router = inject(NavController);
  private _tempLogin = signal<{ corretora: ICorretora; bot: IBot } | undefined>(
    undefined,
  );

  readonly loading = signal<boolean>(false);

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
    this.loading.set(true);
    this._authService
      .login(this.form.value.key!, this.form.value.code!)
      .pipe(
        tap((res) => this._tempLogin.set(res)),
        switchMap((res) => this._authService.corretora(res.corretora)),
        tap((res) =>
          this._store.update({
            corretora: res.token,
            id: this.form.value.code!,
          }),
        ),
        switchMap(() => this._authService.robo(this._tempLogin()!.bot)),
        tap((res) => this._store.update({ bot: res.token })),
        finalize(() => this.loading.set(false)),
      )
      .subscribe(() => {
        this._tempLogin.set(undefined);
        this._router.navigateRoot('/home', { replaceUrl: true });
      });
  }
}
