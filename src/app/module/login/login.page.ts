import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnDestroy,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonContent, NavController } from '@ionic/angular/standalone';
import { finalize, Observable, switchMap, tap } from 'rxjs';
import { IBot, ICorretora } from 'src/app/core/interfaces/user.interface';
import { AuthService } from 'src/app/core/service/auth.service';
import { KeyboadService } from 'src/app/core/service/keyboard.service';
import { UserStore } from 'src/app/core/store/user.store';

import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import { IMe } from 'src/app/shared/services/robo/interface/me.interface';
import { RoboService } from 'src/app/shared/services/robo/service/robo.service';

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
  providers: [NavController, RoboService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginPage implements OnInit, OnDestroy {
  private _authService = inject(AuthService);
  private _store = inject(UserStore);
  private _router = inject(NavController);
  private _robo = inject(RoboService);
  private _keyboad = inject(KeyboadService);

  private _tempLogin = signal<{ corretora: ICorretora; bot: IBot } | undefined>(
    undefined,
  );
  readonly loading = signal<boolean>(false);
  readonly content = viewChild(IonContent);

  form = new FormGroup({
    key: new FormControl('', Validators.required),
    code: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(7),
    ]),
  });

  ngOnInit(): void {
    if (this._keyboad.isMobile)
      this._keyboad?.keyboardWillHide(this.content()!);
  }

  ngOnDestroy(): void {
    if (this._keyboad.isMobile) this._keyboad?.removeAllListeners();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this._authService
      .login(this.form.value.key!, this.form.value.code!)
      .pipe(
        tap((res) => {
          this._tempLogin.set(res);
        }),
        switchMap(() => this._loginCorretora()),
        switchMap(() => this._loginRobo()),
        switchMap(() => this._getUserFromRobo()),
        finalize(() => this.loading.set(false)),
      )
      .subscribe(() => {
        this._tempLogin.set(undefined);
        this._router.navigateRoot('/home', { replaceUrl: true });
      });
  }

  private _loginRobo(): Observable<{ token: string }> {
    return this._authService.robo(this._tempLogin()!.bot).pipe(
      tap((res) => {
        this._store.update({ tokenBot: res.token });
      }),
    );
  }

  private _loginCorretora(): Observable<{ token: string }> {
    return this._authService.corretora(this._tempLogin()!.corretora).pipe(
      tap((res) => {
        this._store.update({
          tokenCorretora: res.token,
          id: this.form.value.code!,
        });
      }),
    );
  }

  private _getUserFromRobo(): Observable<IMe> {
    return this._robo.me().pipe(
      tap((res) => {
        this._store.update({
          robo: {
            id: res.id,
            loginId: res.loginId,
            tenantId: res.tenantId,
          },
        });
      }),
    );
  }
}
