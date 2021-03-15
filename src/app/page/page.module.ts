import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstPageComponent } from './first-page/first-page.component';
import { PageRoutingModule } from './page-routing/page-routing.module';



@NgModule({
  declarations: [FirstPageComponent],
  imports: [
    CommonModule,
    PageRoutingModule
  ]
})
export class PageModule { }
