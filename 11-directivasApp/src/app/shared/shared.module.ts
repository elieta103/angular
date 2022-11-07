import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMsgDirective } from './directives/error-msg.directive';
import { CustomIfDirective } from './directives/custom-if.directive';



@NgModule({
  declarations: [
    ErrorMsgDirective,
    CustomIfDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorMsgDirective,     //Exportar la directiva para ser utilizada fuera del metodo
    CustomIfDirective
  ]
})
export class SharedModule { }
