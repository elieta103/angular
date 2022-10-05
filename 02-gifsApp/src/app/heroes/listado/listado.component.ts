import { Component } from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html'
})
export class ListadoComponent  {

heroes:string[] = ['Spiderman', 'Ironman', 'Hulk', 'Thor'];
heroeBorrado: string ='';

borrar():void {
  console.log('borrando');
  this.heroeBorrado = this.heroes.pop() || '';
 
}

}
