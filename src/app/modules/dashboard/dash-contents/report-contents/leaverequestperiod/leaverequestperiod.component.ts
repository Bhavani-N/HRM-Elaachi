import { Component, OnInit } from '@angular/core';
import { adata } from '../../../../shared/data';
import { ChartDataModel } from '../../../../../models/chartData';
import { ReportService } from '../../../../../services/report.service';

@Component({
  selector: 'app-leaverequestperiod',
  templateUrl: './leaverequestperiod.component.html',
  styleUrls: ['./leaverequestperiod.component.css']
})
export class LeaverequestperiodComponent implements OnInit {

  adata: any[];
  leaveData: any[];

  ngxData: ChartDataModel = {
    data: [
      {
        name: 'leaveTypeName',
        series: []
      }
    ]
  };

  view: any[];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Leave Type';
  showYAxisLabel = true;
  yAxisLabel = 'Leave Request';
  legendTitle = 'Status';

  colorScheme = {
    domain: [
      '#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed', '#50abcc', '#ad6886'
    ]
  };

  constructor(private reportService: ReportService) {
    Object.assign(this, { adata });
    this.retrieveLeaveReport();
  }

  ngOnInit() {
  }

  retrieveLeaveReport() {
    console.log('working');
  }

}
