import { AwwwardsBot } from "..";

const addProject = async (app: AwwwardsBot) => {
  app.message(/.+/, async ({ message }) => {
    // TODO: need to change this
    const userId = "U01PNGGBBT5";

    if (
      message.channel !== app.mainChannel ||
      message.subtype !== undefined ||
      message.user !== userId
    )
      return console.log("nah");

    const link_res = /^<(.*)>$/.exec(message.text as string);
    if (!link_res) return console.log("Failed to exec regex");
    const link = link_res[1];
    if (!link) console.log("Failed to get regex group");

    await app.projects.create({
      LINK: link,
      MESSAGE_ID: message.ts,
    });
  });
};

export default addProject;
