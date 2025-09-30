import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular/standalone';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import { RoboService } from 'src/app/shared/services/robo/service/robo.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  imports: [
    IonicComponentsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [NavController, RoboService],
})
export class CreateAccountPage {}
