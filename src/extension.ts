import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

function generateCleanArchitecture() {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) {
    vscode.window.showErrorMessage("No workspace folders found.");
    return;
  }

  const selectedFolder = vscode.workspace.workspaceFolders![0].uri.fsPath;
  const libFolder = path.join(selectedFolder, "lib");

  if (!fs.existsSync(libFolder)) {
    vscode.window.showErrorMessage("No lib folder found.");
    return;
  }

  const options: vscode.InputBoxOptions = {
    prompt: "Enter feature name",
    ignoreFocusOut: true,
  };

  vscode.window.showInputBox(options).then((featureName) => {
    if (!featureName) {
      vscode.window.showErrorMessage("No feature name entered.");
      return;
    }

    const featureFolder = path.join(libFolder, featureName);

    try {
      fs.mkdirSync(featureFolder);
    } catch (error) {
      vscode.window.showErrorMessage("Could not create feature folder.");
      return;
    }

    const dataFolder = path.join(featureFolder, "data");
    const domainFolder = path.join(featureFolder, "domain");
    const presentationFolder = path.join(featureFolder, "presentation");

    try {
      fs.mkdirSync(dataFolder);
      fs.mkdirSync(domainFolder);
      fs.mkdirSync(presentationFolder);
    } catch (error) {
      vscode.window.showErrorMessage("Could not create feature subfolders.");
      return;
    }

    const dataSourcesFolder = path.join(dataFolder, "datasources");
    const repositoriesFolder = path.join(dataFolder, "repositories");
    const modelsFolder = path.join(domainFolder, "models");
    const repositoriesImplFolder = path.join(domainFolder, "repositories_impl");
    const blocsFolder = path.join(presentationFolder, "blocs");
    const pagesFolder = path.join(presentationFolder, "pages");
    const widgetsFolder = path.join(presentationFolder, "widgets");

    try {
      fs.mkdirSync(dataSourcesFolder);
      fs.mkdirSync(repositoriesFolder);
      fs.mkdirSync(modelsFolder);
      fs.mkdirSync(repositoriesImplFolder);
      fs.mkdirSync(blocsFolder);
      fs.mkdirSync(pagesFolder);
      fs.mkdirSync(widgetsFolder);
    } catch (error) {
      vscode.window.showErrorMessage("Could not create feature subfolders.");
      return;
    }
  });
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "extension.generateCleanArchitecture",
    generateCleanArchitecture
  );
  context.subscriptions.push(disposable);
}
