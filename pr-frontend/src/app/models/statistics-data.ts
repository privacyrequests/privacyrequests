export class StatisticsData {

	labels: string[];
	datasets: Dataset[];

	constructor() { }
}

export interface Dataset {
	data: number[];
}

