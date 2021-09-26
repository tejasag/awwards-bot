import { AirtablePlusPlus } from "airtable-plusplus";
import { airtable_api_key } from "./config";

export type AirtableField = Record<string, number | string | string[]>;

export const ProjectsDatabase: AirtablePlusPlus<AirtableField> =
  new AirtablePlusPlus({
    apiKey: airtable_api_key as string,
    baseId: "appEI6euHeYiGdFrj",
    tableName: "Projects",
  });

export const VotesDatabase: AirtablePlusPlus<AirtableField> =
  new AirtablePlusPlus({
    apiKey: airtable_api_key as string,
    baseId: "appEI6euHeYiGdFrj",
    tableName: "Votes",
  });
