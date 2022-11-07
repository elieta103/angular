import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMsgDirective } from '../shared/directives/error-msg.directive';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AgregarComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    ReactiveFormsModule,  //Formularios reactivos
    SharedModule    //Contiene la directiva
  ]
})
export class ProductosModule { }
