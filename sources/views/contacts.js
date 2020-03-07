import { JetView } from "webix-jet";
import { contacts } from "models/contacts";

import Form from "views/form";

export default class Contacts extends JetView {
	config() {
		const list = {
			padding: {
				right: 10
			},
			rows: [
				{
					type: "header",
					template: "Contacts",
					height: 50,
					css: "webix_dark"
				},
				{
					view: "list",
					localId: "contactsList",
					autowidth: true,
					scroll: false,
					select: true,
					template: "#Name# <br> #Email# <span class='webix_icon wxi-close right'></span>"
				}
			]
		};

		const ui = {
			cols: [
				list,
				Form
			]
		};

		return ui;
	}

	init() {
		this.$$("contactsList").parse(contacts);
	}
}