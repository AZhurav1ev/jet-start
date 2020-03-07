
import { JetView } from "webix-jet";

export default class SettingsView extends JetView {
	config() {
		return {
			cols: [
				{
					view: "segmented",
					label: "Languages",
					inputWidth: 350,
					value: "RU",
					options: [
						{ value: "RU" },
						{ value: "EN" }
					]
				},
				{}
			]
		};
	}
}