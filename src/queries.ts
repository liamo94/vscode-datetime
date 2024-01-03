import * as vscode from "vscode";
import { createInlayHint } from "./helpers";
import {
  SupportedLanguage,
  supportedLanguageComments,
} from "./supportedLanguages";

const getRegex = (languageId: SupportedLanguage) => {
  const [comment] = supportedLanguageComments[languageId];
  return new RegExp(`^\\s*${comment}\\.?\\s*\\^df`, "gm");
};

type Query = {
  text: string;
  offset: number;
  model: vscode.TextDocument;
  cancel: vscode.CancellationToken;
};

type InlayHintsPromise = Promise<vscode.InlayHint[]>;

const checkForCommentQuery = async ({
  text,
  offset,
  model,
  cancel,
}: Query): InlayHintsPromise => {
  const results: vscode.InlayHint[] = [];
  const { languageId } = vscode.window.activeTextEditor?.document || {};
  const matches = text.matchAll(getRegex(languageId as SupportedLanguage));

  for (const match of matches) {
    if (match.index === undefined) {
      break;
    }

    const end = match.index + match[0].length;
    const endPos = model.positionAt(end + offset);

    if (cancel.isCancellationRequested) {
      return [];
    }
    const inlayHint = createInlayHint({ position: endPos });

    if (inlayHint) {
      results.push(inlayHint);
    }
  }

  return results;
};

export const getHintsFromQueries = async (
  queryInfo: Query
): InlayHintsPromise => {
  const results: vscode.InlayHint[] = [];

  const queryResults = await checkForCommentQuery(queryInfo);
  results.push(...queryResults);

  return results;
};
