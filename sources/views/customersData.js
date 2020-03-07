import { JetView } from "webix-jet";

export default class CustomersData extends JetView {
	constructor(app, name, data) {
		super(app, name);
		this._componentData = data;
	}
	config() {
		return {
			rows: [
				{
					view: "datatable",
					autoConfig: true,
					localId: "table",
					editable: true,
					select: "cell",
					editaction: "dblclick",
					scroll: "y",
				},
				{
					cols: [
						{},
						{
							view: "button", value: "Add", width: 100, css: "webix_primary", click: () => this.addItem()
						},
						{
							view: "button", value: "Delete", width: 100, css: "webix_primary", click: () => this.deleteItem()
						}
					]
				}
			]
		};
	}

	init() {
		this.table = this.$$("table");
		this.table.parse(this._componentData);
	}

	addItem() {
		const item = { Name: "New Item" };
		this.table.add(item);
	}

	deleteItem() {
		const item = this.table.getSelectedId();
		webix.confirm("Do you really want to delete this item?")
			.then(() => {
				table.remove(item);
			});
	}
}