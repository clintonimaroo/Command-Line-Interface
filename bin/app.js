#! /usr/bin/env node

const figlet = require("figlet");

figlet('COMMANDO', function (err, data) {
    console.log(data)
});



const frequentlyUsedBinaries = [
    "visual-studio-code",
    "google-chrome",
    "zsh",
    "whatsapp",
    "spectacle",
    "spotify",
    "slack",
    "github",
    "node",
    "grammarly",
    "figma"
  ];


const { MultiSelect } = require("enquirer");


const multiSelectPrompt = new MultiSelect({
  name: "value",
  message: "Select all the software that you want to install",
  choices: frequentlyUsedBinaries
});


multiSelectPrompt
  .run()
  .then(binaries => {
    console.log("Selected binaries:", binaries);
  })
  .catch(console.error);

 
const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function executeCommands(CommandLineString) {
  const { stdout, stderr } = await exec(CommandLineString);
  console.log("Standard output:", stdout);
  console.log("Standard error:", stderr);
}


function getCommandLIneString(binaries) {
  return binaries
    .map(binary => {
      return `brew cask install ${binary} &&`;
    })
    .join()
    .replace(/,/g, " ")
    .slice(0, -3);
}


multiSelectPrompt
  .run()
  .then(binaries => {
    console.log("Selected binaries:", binaries);
    console.log("Installing them all");
    executeCommands(getCommandLIneString(binaries));
  })
  .catch(console.error);
