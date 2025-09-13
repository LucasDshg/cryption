import { CurrencyPipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { IonicComponentsModule } from 'src/app/shared/ionic-components.module';
import { AnalyticsService } from 'src/app/shared/service/analytics/analytics.service';
import Swiper from 'swiper';
import { ProductsCompanyService } from '../../products/service/products-company.service';

@Component({
  selector: 'app-card-destaque',
  template: ` <swiper-container
    [spaceBetween]="20"
    [pagination]="true"
    (swiperinit)="swiperInit($event)"
  >
    @if (productsDestaques()) {
      @for (item of productsDestaques(); track item.id) {
        <swiper-slide>
          <ion-card
            [button]="true"
            color="secondary"
            (click)="goToProduct(item.id!)"
          >
            <ion-card-content
              class="ion-d-flex ion-justify-content-between ion-align-items-center"
              [style.height.px]="166"
            >
              <span class="destaque-background">
                <img [src]="item.image" />
              </span>
              <div
                class="ion-flex-column ion-d-flex ion-justify-content-center destaque"
              >
                <h4 class="destaque-title">
                  {{ item.name }}
                </h4>
                <span class="ion-d-flex ion-align-items-center">
                  <hr class="ion-w-100" />
                  <small class="destaque-text ion-m-horizontal-4">
                    Apenas
                  </small>
                  <hr class="ion-w-100" />
                </span>
                <h2 class="destaque-price">
                  {{ item.price | currency }}
                  <small class="destaque-unit">
                    {{ item.quant }}{{ item.un }}
                  </small>
                </h2>
              </div>
            </ion-card-content>
          </ion-card>
        </swiper-slide>
      }
    }
  </swiper-container>`,
  host: {
    class: 'ion-m-bottom-16',
  },
  styles: [
    `
      .destaque {
        text-align: center;
        z-index: 10;
        width: 100%;
        &-title {
          font-family: Nunito;
          font-weight: bold;
          font-size: 24px;
          color: white;
          -webkit-text-stroke: 1px #ffff;
          letter-spacing: 10%;
        }

        &-text {
          color: #eeebeb;
          font-family: Montserrat;
          font-size: 14px;
        }

        &-price {
          font-family: Nunito;
          font-weight: bold;
          font-size: 24px;
          color: #fff;
        }
        &-unit {
          font-family: Montserrat;
          font-weight: 500;
          font-size: 12px;
          color: #eeebeb;
          text-align: end;
          margin-top: -8px;
        }
        &-background {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          &::after {
            content: '';
            width: 100%;
            height: 100%;
            background-color: rgb(0, 0, 0, 0.5);
            position: absolute;
            display: block;
            top: 0;
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
      @media (max-width: 400px) {
        .destaque {
          margin-left: 16px;
          &-title {
            font-size: 20px;
          }

          &-text {
            font-size: 14px;
          }

          &-price {
            font-size: 20px;
          }
          &-unit {
            font-size: 12px;
          }
        }
      }
    `,
  ],
  imports: [IonicComponentsModule, CurrencyPipe, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CardDestaqueComponent {
  private _productService = inject(ProductsCompanyService);
  private _router = inject(Router);
  private _analytics = inject(AnalyticsService);
  readonly productsDestaques = toSignal(this._productService.fetchDestaque());

  swiper?: Swiper;

  swiperInit(event: any): void {
    this.swiper = event.detail[0];
    this.swiper!.autoplay.running = true;
    this.swiper!.autoplay.timeLeft = 3000;
    this.swiper!.autoplay.start();
  }

  goToProduct(id: string): void {
    this._analytics.logEvent('click:Home_Destaque/Details_Product');
    this._router.navigate(['/product', 'details', id]);
  }
}
