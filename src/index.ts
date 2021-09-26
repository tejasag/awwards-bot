import { app_token, token, name } from "./config";
import { App } from "@slack/bolt";
import {
	filterDM,
	filterNoBotMessages,
	filterChannel,
} from "./middleware/index";
import voteModal from "./modals/voteModal";
import * as features from "./features/index";

const app = new App({
	token: token,
	appToken: app_token,
	socketMode: true,
});

(async () => {
	// Start your app
	await app.start();

	console.log(`${name} is running! 🔥`);

	for (const [feature, handler] of Object.entries(features)) {
		handler(app);
		console.log(`Feature "${feature}" has been loaded.`);
	}
})();
