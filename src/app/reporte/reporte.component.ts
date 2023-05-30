import { Component } from '@angular/core';
import { ServiciosapiService } from '../servicio-api.component';
declare var google: any;

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent {

  compras: any[];
  clientes: any[];
  cant = 0;
  real_data2: Map<string, number>;

  constructor(
    private apiService: ServiciosapiService) {
  }
  ngOnInit() {
    this.memato();
    // google.charts.load('current', { packages: ['corechart'] });
    // google.charts.setOnLoadCallback(this.drawChart);
  }

  async drawChart() {
    const graphData2: Map<string, number> = new Map<string, number>();
    for (let i = 0; i < this.clientes.length; i++) {
      const id: number = this.clientes[i].id;
      const nom: string = this.clientes[i].nombre;
      const cant: number = await this.apiService.ventasPorCliente(id);
      graphData2.set(nom, cant);
    }
    console.log("graphData2: ", graphData2);
    this.real_data2 = graphData2;
    // Create the data table.
    // var data = new google.visualization.DataTable();
    // data.addColumn('string', 'Cliente');
    // data.addColumn('number', 'Cantidad');
    console.log("this.real_data2: ", this.real_data2.values);
    this.real_data2.values();
    // data.addRows([
    //   ['Mushrooms', 3],
    //   ['Onions', 1],
    //   ['Olives', 1],
    //   ['Zucchini', 1],
    //   ['Pepperoni', 2]
    // ]);

    // // Instantiate and draw our chart, passing in some options.
    // var chart = new google.visualization.PieChart(document.getElementById('circular'));
    // chart.draw(data, null);
  }

  memato() {
    this.apiService.listarClientes().subscribe(async data => {
      this.clientes = data;
      // console.log("cli:", this.clientes);
      
    });
    

    this.drawChart();
  }

}
