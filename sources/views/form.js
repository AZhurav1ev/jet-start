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
						{ view: "combo", label: _("Country"), value: 1, name: "Country", options: { body: {template:"#Name#"}, data: countries }, invalidMessage: "You need to choose country" },
						{ view: "combo", label: _("Status"), value: 1, name: "Status", options: { body: {template:"#Name#"}, data: statuses }, invalidMessage: "You need to choose status" },
						{ 
							view: "button", 
							label: _("Save"), 
							align: "right", 
							width: 100, 
							css: "webix_primary", 
							hotkey:"enter",
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
				Status :webix.rules.isNotEmpty
			}
		};
	}

	saveItem(){
		const form = this.getRoot();
		if (form.validate()) {
			const item_data = form.getValues();
			if (item_data.id) {
				contacts.updateItem(item_data.id, item_data);
				webix.message({
					text: `Contact is updated `,
					type: "success",
					expire: 1000
				});
			} else {
				contacts.add(item_data);
				webix.message({
					text: `New contact added`,
					type: "success",
					expire: 1000
				});
			}
			form.clear();
		}
	}

	urlChange(view) {
		const id = this.getParam("id");
		if (id && contacts.exists(id)) {
			const item = contacts.getItem(id);	
			view.clearValidation();		
			view.setValues(item);
		} else {
			view.clear();
		}
		
	} 
}
    