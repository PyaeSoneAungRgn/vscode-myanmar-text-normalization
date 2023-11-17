const vscode = require('vscode');
const normalize = require('./normalize')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('myanmarTextNormalization.normalize', function () {
		const { activeTextEditor } = vscode.window;
		if (activeTextEditor) {
			const { document } = activeTextEditor;

			const edit = new vscode.WorkspaceEdit();
			const formattedText = normalize(document.getText());
			edit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), formattedText);

			return vscode.workspace.applyEdit(edit);
		}
	});

	context.subscriptions.push(disposable);
}

module.exports = {
	activate
}