import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, Filler, Legend, LinearScale, LineController, LineElement, PointElement, TimeScale, Tooltip } from 'chart.js';
import { UserService } from 'src/app/user.service';
import 'chartjs-adapter-date-fns';

Chart.register(LineController, LinearScale, TimeScale, PointElement, LineElement, Legend, Filler, Tooltip);

@Component({
  selector: 'pr-money-history',
  templateUrl: './money-history.component.html',
  styleUrls: ['./money-history.component.css']
})
export class MoneyHistoryComponent implements AfterViewInit {
  @ViewChild('chart') canvas!: ElementRef<HTMLCanvasElement>;
  moneyChart: Chart | null = null;

  constructor(private userService: UserService) {}

  ngAfterViewInit(): void {
    const ctx = this.canvas.nativeElement;
    this.userService.getMoneyHistory().subscribe(
      history =>
        (this.moneyChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: history!.map(data => data!.instant),
            datasets: [
              {
                label: 'Money history',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: 'origin',
                tension: 0.5,
                data: history!.map(event => event.money)
              }
            ]
          },
          options: {
            scales: {
              x: {
                type: 'time'
              }
            }
          }
        }))
    );
  }
}
