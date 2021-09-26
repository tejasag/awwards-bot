import { app_token, token, name } from "./config";
import { App } from "@slack/bolt";
import {
  filterDM,
  filterNoBotMessages,
  filterChannel,
} from "./middleware/index";
import voteModal from "./modals/voteModal";
import * as features from "./features/index";
import { ProjectsDatabase, VotesDatabase, AirtableField } from "./airtable";
import { AirtablePlusPlus } from "airtable-plusplus";

export class AwwwardsBot extends App {
  projects: AirtablePlusPlus<AirtableField>;
  votes: AirtablePlusPlus<AirtableField>;
  mainChannel: string;

  constructor() {
    super({
      token: token,
      appToken: app_token,
      socketMode: true,
    });

    this.projects = ProjectsDatabase;
    this.votes = VotesDatabase;
    this.mainChannel = "C025YG64801";
  }
}

const app = new AwwwardsBot();

(async (): Promise<void> => {
  // Start your app
  await app.start();

  console.log(`${name} is running! 🔥`);

  for (const [feature, handler] of Object.entries(features)) {
    handler(app);
    console.log(`Feature "${feature}" has been loaded.`);
  }
})();
