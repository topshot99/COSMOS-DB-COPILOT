// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as path from 'path';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

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
			// vscode.window.showInformationMessage(result);
			// Extract code part using triple backticks
         // Extract code part using triple backticks
		 const codePart = result.match(/```([\s\S]*?)```/);
		 const stringPart = result.replace(/```([\s\S]*?)```/, '');

		 // Display code and string parts in the same information message
		 let message = "";
		 if (codePart && codePart.length > 1) {
			 const codeSnippet = codePart[1];
			 const formattedCode = formatCode(codeSnippet);
			 const highlightedCode = highlightCode(formattedCode); // Add background highlighting to code part
			 message += highlightedCode + "\n\n";
		 }
		 if (stringPart) {
			 message += stringPart;
		 }
		 vscode.window.showInformationMessage(message);
		}
	  });

	context.subscriptions.push(disposable);
}

async function executePythonCode(code: string): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		const scriptPath = 'C:\\Users\\mkhandelwal\\cosmos-db-copilot\\src\\cosmos-db-copilot-script.py';		exec(`python ${scriptPath} "${code}"`, (error, stdout, stderr) => {
		if (error) {
			reject(error.message);
		  } else if (stderr) {
			resolve(stderr);
		  } else {
			resolve(stdout);
		  }
		});
	  });
  }

function formatCode(code: string): string {
    // Format the code with indentation
    const lines = code.split('\n');
    const formattedLines = lines.map(line => '    ' + line); // Add 4 spaces at the beginning of each line
    return formattedLines.join('\n');
}

function highlightCode(code: string): string {
    // Wrap code in <pre> tag with CSS class for background highlighting
    return `<pre style="background-color: #F3F3F3; padding: 10px;">${code}</pre>`;
}

// This method is called when your extension is deactivated
export function deactivate() {}
