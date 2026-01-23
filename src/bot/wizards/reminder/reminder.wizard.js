const { Scenes } = require("telegraf");

const askDay = require("./steps/askDay");
const askDescription = require("./steps/askDescription");
const confirmData = require("./steps/confirmData");
const finishWizard = require("./steps/finishWizard");

const reminderWizard = new Scenes.WizardScene(
    "reminder-wizard",
    askDescription,
    askDay,
    confirmData,
    finishWizard,
);

module.exports = reminderWizard;
