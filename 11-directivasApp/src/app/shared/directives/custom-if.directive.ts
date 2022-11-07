import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[customIf]'
})
export class CustomIfDirective {


  @Input() set customIf (condicion: boolean ){
    if (condicion){
      this.viewContainerRef.createEmbeddedView(this.templateRef);  // Mostrar
    }else{
      this.viewContainerRef.clear();  // Ocultar
    }
  }

  constructor(private templateRef: TemplateRef<HTMLElement>,
              private viewContainerRef : ViewContainerRef) { }

}
