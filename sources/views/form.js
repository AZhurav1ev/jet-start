import { JetView } from "webix-jet";
import { contacts } from "models/contacts";
import { countries } from "models/countries";
import { statuses } from "models/statuses";


export default class Form extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			paddingX: 5,
			view: "form",
			width: 400,
			localId: "form",
			elements: [
				{
					rows: [
						{ view: "text", label: _("Name"), name: "Name", invalidMessage: "Name can not be empty" },
						{ view: "text", label: _("Email"), name: "Email", invalidMessage: "Email can not be empty or wrong format" },
						{ view: "combo", label: _("Country"), value: 1, name: "Country", options: { body: { template: "#Name#" }, data: countries }, invalidMessage: "You need to choose country" },
						{ view: "combo", label: _("Status"), value: 1, name: "Status", options: { body: { template: "#Name#" }, data: statuses }, invalidMessage: "You need to choose status" },
						{
							view: "button",
							label: _("Save"),
							align: "right",
							width: 100,
							css: "webix_primary",
							hotkey: "enter",
							click: () => this.saveItem()
						}
					],
				},
				{}
			],
			rules: {
				Name: webix.rules.isNotEmpty,
				Email: webix.rules.isNotEmpty && webix.rules.isEmail,
				Country: webix.rules.isNotEmpty,
				Status: webix.rules.isNotEmpty
			}
		};
	}

	saveItem() {
		const form = this.getRoot();
		if (form.validate()) {
			const itemData = form.getValues();
			if (itemData && itemData.id) {
				contacts.updateItem(itemData.id, itemData);
				webix.message({
					text: "Contact is updated",
					type: "success",
					expire: 1000,

				});
			} else {
				webix.message({
					text: "Press add button to save new contact",
					type: "success",
					expire: 1000
				});
			}
			form.clear();
		}
	}

	urlChange(view) {
		webix.promise.all([
			contacts.waitData,
			statuses.waitData,
			countries.waitData
		]).then(() => {
			const id = this.getParam("id");
			if (id && contacts.exists(id)) {
				const item = contacts.getItem(id);
				view.clearValidation();
				view.setValues(item);
			}
		});
	}
}
