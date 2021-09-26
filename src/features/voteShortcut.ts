import { App, View, MessageShortcut } from "@slack/bolt";
import voteModal from "../modals/voteModal";

const voteShortcut = async (app: App) => {
	app.shortcut("awwwards_vote", async ({ shortcut, ack, client }) => {
		try {
			await ack();

			await client.views.open({
				trigger_id: shortcut.trigger_id,
				view: voteModal((shortcut as MessageShortcut).message.id) as View,
			});
		} catch {
			console.error;
		}
	});
};

export default voteShortcut;
