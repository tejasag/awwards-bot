import { View, MessageShortcut } from "@slack/bolt";
import voteModal from "../modals/voteModal";
import { AwwwardsBot } from "../index";
import { AirtablePlusPlusRecord } from "airtable-plusplus";
import { AirtableField } from "../airtable";

const voteShortcut = async (app: AwwwardsBot) => {
  app.shortcut("awwwards_vote", async ({ shortcut, ack, client }) => {
    try {
      await ack();
      let message_id = (shortcut as MessageShortcut).message_ts;
      const exists: AirtablePlusPlusRecord<AirtableField>[] =
        await app.projects.read({
          filterByFormula: `{MESSAGE_ID}="${message_id}"`,
          maxRecords: 1,
        });

      if (exists.length <= 0) {
        await client.chat.postEphemeral({
          channel: app.mainChannel,
          user: shortcut.user.id,
          text: "This is not a valid Awwwards Project.",
        });
        return;
      }
      const voted = await app.votes.read({
        filterByFormula: `AND({USER_ID}="${shortcut.user.id}", {MESSAGE_ID}="${message_id}")`,
        maxRecords: 1,
      });
      if (voted.length > 0) {
        await client.chat.postEphemeral({
          channel: app.mainChannel,
          user: shortcut.user.id,
          text: "Sorry but you have already voted for this project!",
        });
        return;
      }

      await client.views.open({
        trigger_id: shortcut.trigger_id,
        view: voteModal(message_id) as View,
      });
    } catch {
      console.error;
    }
  });
};

export default voteShortcut;
