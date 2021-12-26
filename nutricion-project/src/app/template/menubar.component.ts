import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  status: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  clickEvent(){
    this.status = !this.status;       
}

}
