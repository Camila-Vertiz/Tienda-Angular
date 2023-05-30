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

  constructor(
    private apiService: ServiciosapiService) {
  }
  ngOnInit() {
    this.getClientes();
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }

  drawChart() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['Mushrooms', 3],
      ['Onions', 1],
      ['Olives', 1],
      ['Zucchini', 1],
      ['Pepperoni', 2]
    ]);

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('circular'));
    chart.draw(data, null);
  }

 

  getClientes() {
    this.apiService.listarClientes().subscribe(data => {
      this.clientes = data;
      console.log("cli:", this.clientes);
      this.clientes.forEach(async (item) => {
        try {
          await this.apiService.buscarOrdenPorCliente(item.id).then(data => {
            const jsonRespuesta = JSON.stringify(data);
            const Respuesta = JSON.parse(jsonRespuesta);
            if (Respuesta) {
              this.compras = Respuesta;
              this.cant = this.compras.length;
              console.log(this.cant);
            }
            // this.asc();
            // this.calcularTotal();
          })
            .catch(error => {
              console.log(error);
            });
        } catch (error) {
          console.log("error insertarDetalleOrden:" + error);
        }
      });
    });
  }
}
