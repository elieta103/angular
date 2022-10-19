import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { GraficasService } from '../../services/graficas.service';

@Component({
  selector: 'app-dona-http',
  templateUrl: './dona-http.component.html'
})
export class DonaHttpComponent implements OnInit {

  etiquetas:string[] = []
  valores:number[]=[];
  // Doughnut
  public doughnutChartLabels: string[]=[];
  public doughnutChartData!: ChartData<'doughnut'>;

  constructor(private graficasService: GraficasService) { }

  ngOnInit(): void {
    this.graficasService.getUsuariosRedesSocialesDonaData()
    .subscribe((data) => {
      this.doughnutChartData = {
        labels: data.labels,
        datasets: [
          { data:  data.values },
          //{ data: [ 50, 150, 120 ] },
          //{ data: [ 250, 130, 70 ] }
        ]
      };

    });



  }

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };


  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }


}
