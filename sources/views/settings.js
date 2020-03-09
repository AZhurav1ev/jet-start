import { JetView } from "webix-jet";

export default class SettingsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		return {
			view: "segmented",
			label: _("Language:"),
			localId: "language",
			value: this.app.getService("locale").getLang(),
			options: [
				{ id: "en", value: _("English") },
				{ id: "ru", value: _("Russian") }
			],
			click: () => {
				this.toggleLanguage();
			}
		};
	}

	toggleLanguage() {
		const langs = this.app.getService("locale");
		const value = this.$$("language").getValue();
		langs.setLang(value);
	}
}
