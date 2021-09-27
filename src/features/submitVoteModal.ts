import { AwwwardsBot } from "..";
import { AirtablePlusPlusRecord } from "airtable-plusplus";

const submitVoteModal = async (app: AwwwardsBot) => {
  app.view(/^voteModal_(.*)$/, async ({ ack, body, view, client }) => {
    try {
      await ack();
      const state: { [key: string]: number } = {};
      Object.keys(view.state.values).map((k) => {
        state[k] = parseInt(
          view.state.values[k]["choice"]["selected_option"]?.["value"] as string
        );
      });
      // console.log(state);
      const published_ts_res = /^voteModal_(.*)$/.exec(view.callback_id);
      if (!published_ts_res) return console.log("Failed to exec regex");
      const published_ts = published_ts_res[1];
      if (!published_ts) console.log("Failed to get regex group");

      const project: AirtablePlusPlusRecord<Record<string, unknown>>[] =
        await app.projects.read({
          filterByFormula: `{MESSAGE_ID}="${published_ts}"`,
          maxRecords: 1,
        });

      await app.votes.create({
        USER_ID: body.user.id,
        CREATIVITY: state.creativity,
        USABILITY: state.usability,
        DESIGN: state.design,
        CONTENT: state.content,
        RESPONSIVENESS: state.responsiveness,
        PROJECT: [project[0].id],
      });

      await client.chat.postEphemeral({
        channel: app.mainChannel,
        user: body.user.id,
        // text: JSON.parse(JSON.stringify(view.state.values, undefined, 2)),
        text: "Successfully voted!",
      });
    } catch (e) {
      console.error(e);
    }
  });
};

export default submitVoteModal;
