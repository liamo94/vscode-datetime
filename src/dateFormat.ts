import * as vscode from "vscode";
import { DateTime } from "luxon";

export const getDateFormat = (lineText: string, character: number) => {
  const { defaultDate } = vscode.workspace.getConfiguration("dateformat");

  const userDate = DateTime.fromISO(defaultDate);
  const date = userDate.isValid ? userDate : DateTime.now();

  const CURSOR = character;

  let extractedFormat = "";

  let before = CURSOR - 1;
  let after = CURSOR;

  const quotes = ['"', "'", "`"];

  while (!quotes.includes(lineText[before]) && before >= 0) {
    extractedFormat = lineText[before] + extractedFormat;
    before--;
  }

  while (!quotes.includes(lineText[after]) && after < lineText.length) {
    extractedFormat += lineText[after];
    after++;
  }

  return date.toFormat(extractedFormat);
};
