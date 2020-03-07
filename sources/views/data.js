import { JetView } from "webix-jet";
import { countries } from "models/countries";
import { statuses } from "models/statuses";

import CustomersData from "views/customersData";

export default class Data extends JetView {
	config() {
		return {
			rows: [
				{
					view: "tabbar",
					localId: "tabbar",
					options: [
						{ value: "Countries" },
						{ value: "Statuses" },
					]
				},
				{
					cells: [
						{ localId: "Countries", rows: [new CustomersData(this.app, "", countries)] },
						{ localId: "Statuses", rows: [new CustomersData(this.app, "", statuses)] }
					]
				}
			]
		}

	}
	init(){
		this.$$("tabbar").attachEvent("onChange", value => this.$$(value).show());
	}
}
