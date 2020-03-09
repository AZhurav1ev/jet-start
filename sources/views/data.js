import { JetView } from "webix-jet";
import { countries } from "models/countries";
import { statuses } from "models/statuses";

import CustomersData from "views/customersData";

export default class Data extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			rows: [
				{
					view: "tabbar",
					localId: "tabbar",
					options: [
						{ value: _("Countries") },
						{ value: _("Statuses") },
					]
				},
				{
					cells: [
						{ localId: _("Countries"), rows: [new CustomersData(this.app, "", countries)] },
						{ localId: _("Statuses"), rows: [new CustomersData(this.app, "", statuses)] }
					]
				}
			]
		};

	}
	init(){
		this.$$("tabbar").attachEvent("onChange", value => this.$$(value).show());
	}
}
