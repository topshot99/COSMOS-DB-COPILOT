"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const child_process_1 = require("child_process");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "cosmos-db-copilot" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('cosmos-db-copilot.executeScript', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const selectedCode = editor.document.getText(selection);
            const result = await executePythonCode(selectedCode);
            vscode.window.showInformationMessage(result);
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
async function executePythonCode(code) {
    return new Promise((resolve, reject) => {
        const scriptPath = 'C:\Users\mkhandelwal\cosmos-db-copilot-script.py';
        (0, child_process_1.exec)(`python ${scriptPath} "${code}"`, (error, stdout, stderr) => {
            if (error) {
                reject(error.message);
            }
            else if (stderr) {
                resolve(stderr);
            }
            else {
                resolve(stdout);
            }
        });
    });
}
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map