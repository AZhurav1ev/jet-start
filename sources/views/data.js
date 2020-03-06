import { JetView } from "webix-jet";
import { countries } from "models/countries";
import { statuses } from "models/statuses";

import CustomersData from "views/customersData";

export default class Data extends JetView {
	config() {
		const tabbar = {
			view: "tabbar",
			multiview: true,
			value: "countries",
			options: [
				{ id: "countries", value: "Countries" },
				{ id: "statuses", value: "Statuses" },
			]
		};

		const ui = {
			rows: [
				tabbar,
				{
					cells: [
						{ id: "countries", rows: [new CustomersData(this.app, "", countries)] },
						{ id: "statuses", rows: [new CustomersData(this.app, "", statuses)] }
					]
				}
			]
		};
		return ui;
	}
}