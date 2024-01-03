import * as vscode from "vscode";
import { getHintsFromQueries } from "./queries";
import {
  SupportedLanguage,
  supportedLanguageComments,
  supportedLanguages,
} from "./supportedLanguages";

export const activate = (context: vscode.ExtensionContext) => {
  registerInlayHintsProvider(context);
  registerCommentProvider(context);
};

export function deactivate() {}

const registerInlayHintsProvider = (context: vscode.ExtensionContext) => {
  const provider: vscode.InlayHintsProvider = {
    provideInlayHints: async (model, iRange, cancel) => {
      const offset = model.offsetAt(iRange.start);
      const text = model.getText(iRange);
      return await getHintsFromQueries({ text, offset, model, cancel });
    },
  };

  context.subscriptions.push(
    vscode.languages.registerInlayHintsProvider(
      supportedLanguages.map((language) => ({ language })),
      provider
    )
  );
};

const registerCommentProvider = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand(
      "dateformat.insert-date",
      (textEditor: vscode.TextEditor) => {
        const {
          document,
          selection: { end, active },
        } = textEditor;
        const eolRange = document.lineAt(end.line).range.end;
        const { languageId } = document;
        const [startComment, endComment] =
          supportedLanguageComments[languageId as SupportedLanguage];
        const comment = startComment
          .padEnd(active.character, " ")
          .concat(`^df ${endComment || ""}`);

        textEditor.edit((editBuilder) => {
          const eolChar = document.eol === vscode.EndOfLine.LF ? "\n" : "\r\n";
          editBuilder.insert(eolRange, eolChar + comment);
        });
      }
    )
  );
};
