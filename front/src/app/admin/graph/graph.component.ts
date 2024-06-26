import { Component } from '@angular/core';
import { StatsService } from '../../serv/stats.service';
import { LegendPosition, NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent{
  single: any[] = [];

  constructor(public stats: StatsService){
    stats.getStatsForGraph().subscribe((data) => {
      console.log(data)
      this.single = data
    });
  }

  view: any[] = [700, 400];

  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean =true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Right;
  
  colorScheme: Color = {
    domain: ['#ADD8E6', '#FFFACD', '#FFB6C1', '#98FB98'],
    name: '',
    selectable: true,
    group: ScaleType.Linear,
  }



  
}