import { Component, OnInit } from '@angular/core';
import { EnquiryHttpService } from '../../services/enquiry-http.service';
import { StatisticsData } from '../../models/statistics-data';

@Component({
	selector: 'statistics',
	templateUrl: './statistics.component.html',
	styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

	private options: any = {
		responsive: true,
		maintainAspectRatio: false,
		legend: {
			display: false
		},
		title: {
			display: true,
			text: ''
		},
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero: true,
					userCallback: (label, index, labels) => {
                    	if (Math.floor(label) === label) { return label; }
                 	},
				}
			}]
		}
	};

	monthlyData: StatisticsData;
	liveData: StatisticsData;

	constructor(private enquiryHttpService: EnquiryHttpService) { }

	ngOnInit() {
		this.enquiryHttpService.getStatisticsPerMonth().subscribe((result) => {
			this.monthlyData = result;
		});
		this.enquiryHttpService.getStatisticsLive().subscribe((result) => {
			this.liveData = result;
		});
	}

	getChartOptions(title: string) {
		this.options.title.text = title;
		return this.options;
	}

}