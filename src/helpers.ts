import * as vscode from "vscode";
import { getDateFormat } from "./dateFormat";

export const createInlayHint = ({
  position,
}: {
  position: vscode.Position;
}): vscode.InlayHint | undefined => {
  const { line, character } = position;
  const lineText = vscode.window.activeTextEditor?.document.lineAt(
    line - 1
  )?.text;
  return {
    kind: vscode.InlayHintKind.Type,
    position: position.translate(0, 1),
    label: getDateFormat(lineText || "", character - 2),
    paddingLeft: true,
  };
};
