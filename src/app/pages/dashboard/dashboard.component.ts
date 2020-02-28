import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { ApiServiceService } from 'app/api-services/api-service/api-service.service';
import { User } from 'app/api-services/api-types/api-types.service';
import { AuthServiceService } from 'app/auth-service/auth-service.service';


@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  styles: ['.stats a { cursor: pointer; }'],
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  allAlert: any[] = []
  alertCount: number = 0;
  currentUser: User;
  acc_status: any[] = [];
  sourceActive = []
  sourcePaused = []
  sourceClosed = []

  active;
  paused;
  closed;
  constructor(private api: ApiServiceService, public auth: AuthServiceService) {

  }
  ngOnInit() {
    this.getAllAlert();
    this.getAlertCount();
    this.getAccSummary();
    this.currentUser = this.auth.token.user;
    this.dashboardGraphFunction();
  
    this.active = this.currentUser.dashboard.accounts.active,
      this.paused = this.currentUser.dashboard.accounts.paused,
      this.closed = this.currentUser.dashboard.accounts.closed
  }

  getAccSummary() {
    this.api.getAccountSummary().subscribe((res) => {
      if (res['status']) {
        this.acc_status = res['data'];
        this.sourceActive = [0,
          this.acc_status['02']['active'],
          this.acc_status['03']['active'],
          this.acc_status['04']['active'],
          this.acc_status['05']['active'],
          this.acc_status['06']['active'],
          this.acc_status['07']['active'],
          this.acc_status['08']['active'],
          this.acc_status['09']['active'],
          this.acc_status['10']['active'],
          this.acc_status['11']['active'],
          this.acc_status['12']['active'],
        ]

        this.sourcePaused = [0,
          this.acc_status['02']['paused'],
          this.acc_status['03']['paused'],
          this.acc_status['04']['paused'],
          this.acc_status['05']['paused'],
          this.acc_status['06']['paused'],
          this.acc_status['07']['paused'],
          this.acc_status['08']['paused'],
          this.acc_status['09']['paused'],
          this.acc_status['10']['paused'],
          this.acc_status['11']['paused'],
          this.acc_status['12']['paused'],
        ]

        this.sourceClosed = [0,
          this.acc_status['02']['closed'],
          this.acc_status['03']['closed'],
          this.acc_status['04']['closed'],
          this.acc_status['05']['closed'],
          this.acc_status['06']['closed'],
          this.acc_status['07']['closed'],
          this.acc_status['08']['closed'],
          this.acc_status['09']['closed'],
          this.acc_status['10']['closed'],
          this.acc_status['11']['closed'],
          this.acc_status['12']['closed'],
        ]

        this.dashboardGraphFunction();
      }
    })
  }
  getAllAlert() {
    this.api.getALlAlerts().subscribe((res) => {
      if (res['status']) {
        this.allAlert = res.data
      }
    })
  }

  //Alert Count API
  getAlertCount() {
    this.api.getAllAlertCount().subscribe((res) => {
      if (res['status']) {
        this.alertCount = res['data']

      }
      else {
        this.alertCount = 0;

      }

    }, ((errot) => {
      this.alertCount = 0
    }))

  }




  dashboardGraphFunction() {

    this.chartColor = "#FFFFFF";

    this.canvas = document.getElementById("chartHours");
    this.ctx = this.canvas.getContext("2d");

    this.chartHours = new Chart(this.ctx, {
      type: 'line',

      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
        datasets: [{
          borderColor: "#6bd098",
          backgroundColor: "#6bd098",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: [300, 310, 316, 322, 330, 326, 333, 345, 338, 354]
        },
        {
          borderColor: "#f17e5d",
          backgroundColor: "#f17e5d",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: [320, 340, 365, 360, 370, 385, 390, 384, 408, 420]
        },
          // {
          //   borderColor: "#fcc468",
          //   backgroundColor: "#fcc468",
          //   pointRadius: 0,
          //   pointHoverRadius: 0,
          //   borderWidth: 3,
          //   data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484]
          // }
        ]
      },
      options: {
        legend: {
          display: false
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [{

            ticks: {
              fontColor: "#9f9f9f",
              beginAtZero: false,
              maxTicksLimit: 5,
              //padding: 20
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "#ccc",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent",
              display: false,
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f"
            }
          }]
        },
      }
    });


    this.canvas = document.getElementById("chartEmail");
    this.ctx = this.canvas.getContext("2d");
    let values = [
      this.currentUser.dashboard.accounts.active,
      this.currentUser.dashboard.accounts.paused,
      this.currentUser.dashboard.accounts.closed
    ];
    this.chartEmail = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: [1, 2, 3],
        datasets: [{
          label: "Emails",
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: [

            '#4acccd',
            '#fcc468',
            '#ef8157',
          ],
          borderWidth: 0,
          // data: [100, 200, 300]
          data: values
        }]
      },

      options: {

        legend: {
          display: false
        },

        pieceLabel: {
          render: 'percentage',
          fontColor: ['white'],
          precision: 2
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [{

            ticks: {
              display: false
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "transparent",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent"
            },
            ticks: {
              display: false,
            }
          }]
        },
      }
    });

    var speedCanvas = document.getElementById("speedChart");
    var dataFirst = {
      data: this.sourcePaused,
      // data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
      fill: false,
      borderColor: '#fbc658',
      backgroundColor: 'transparent',
      pointBorderColor: '#fbc658',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    var dataSecond = {
      data: this.sourceActive,
      // data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
      fill: false,
      borderColor: '#51CACF',
      backgroundColor: 'transparent',
      pointBorderColor: '#51CACF',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    };

    var dataThird = {
      data: this.sourceClosed,
      // data: [0, 17, 11, 25, 25, 27, 32, 38, 41, 43, 54, 63],
      fill: false,
      borderColor: '#ef8157',
      backgroundColor: 'transparent',
      pointBorderColor: '#ef8157',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    };

    var speedData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [dataFirst, dataSecond, dataThird]
    };

    var chartOptions = {
      legend: {
        display: false,
        position: 'top'
      }
    };

    var lineChart = new Chart(speedCanvas, {
      type: 'line',
      hover: false,
      data: speedData,
      options: chartOptions
    });
  }


}
