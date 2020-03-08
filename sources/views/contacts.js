import { JetView } from "webix-jet";
import { contacts } from "models/contacts";

export default class Contacts extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			cols: [
				{
					padding: {
						right: 10
					},
					rows: [
						{
							type: "header",
							template: _("Contacts"),
							height: 50,
							css: "webix_dark"
						},
						{
							view: "list",
							localId: "contactsList",
							autowidth: true,
							scroll: false,
							select: true,
							type: {
								height: 62
							},
							template: `
								<b>${_("Name")}: </b>#Name# 
								<span class="webix_icon wxi-close remove_icon" style="float: right"></span> 
								<br> 
								<b>${_("Email")}: </b>#Email# `,
							onClick: {
								"wxi-close": (e, id) => this.deleteItem(id)
							},
						},
						{
							view: "button",
							label: _("Add"),
							align: "right",
							autoWidth: true,
							css: "webix_primary",
							click: () => this.addItem()
						},

					]
				},
				{ $subview: true }
			]
		};
	}
	init(view, url) {
		this.list = this.$$("contactsList");
		this.list.sync(contacts);
		this.list.attachEvent("onItemClick", id => {
			this.show(`./form?id=${id}`);
		});

		if (url.length <= 1) {
			this.show(`./form?id=${this.list.getFirstId()}`);
		}
	}

	urlChange(view, url) {
		const id = url.length <= 1 ? (url[0].params.id || this.list.getFirstId()) : (url[1].params.id);
		id ? this.list.select(id) : this.list.unselectAll();
	}

	addItem() {
		this.show(`./form`);
	}

	deleteItem(item_id) {
		if (item_id) {
			webix.confirm("Do you really want to delete this item?")
				.then(() => {
					contacts.remove(item_id);
					this.show(`./form`);
				});
		}
	}
}