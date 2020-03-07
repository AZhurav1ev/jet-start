import { JetView } from "webix-jet";

export default class Form extends JetView {
	config() {
		return {
			paddingX: 5,
			view: "form",
			localId: "form",
			elements: [
				{
					rows: [
						{ view: "text", label: "User Name", name: "title" },
						{ view: "text", label: "Email", name: "email" }

					]
				},
				{}
			]
		};
	}
}