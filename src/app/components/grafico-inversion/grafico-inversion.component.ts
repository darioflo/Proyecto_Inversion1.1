import { Component,Input, OnChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-grafico-inversion',
  imports: [BaseChartDirective],
  templateUrl: './grafico-inversion.component.html',
  styleUrl: './grafico-inversion.component.css'
})

export class GraficoCrecimientoComponent implements OnChanges {
  @Input() saldoInicial!: number;
  @Input() plazo!: number;
  @Input() tasa!: number;   
  
  public lineChartData!: ChartData<'line'>;
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'Días transcurridos' } },
      y: { title: { display: true, text: 'Valor de la inversión' } }
    }
  };
  public lineChartType: ChartType = 'line';

  ngOnChanges() {
    this.actualizarGrafico();
  }

  private actualizarGrafico() {
    const dataPoints: number[] = [];
    const labels: string[] = [];
    const tasaDiaria = this.tasa / 100 / 365;

    for (let dia = 0; dia <= this.plazo; dia += Math.ceil(this.plazo / 20)) {
      const valor = this.saldoInicial * Math.pow(1 + tasaDiaria, dia);
      labels.push(`${dia}`);
      dataPoints.push(+valor.toFixed(2));
    }

    this.lineChartData = {
      labels,
      datasets: [
        {
          data: dataPoints,
          label: 'Valor proyectado',
          fill: false,
          pointRadius: 3,
          borderWidth: 2,
        }
      ]
    };
  }
}
