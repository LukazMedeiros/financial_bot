const { Scenes } = require("telegraf");
const askCategory = require("./steps/askCategory");
const askDescription = require("./steps/askDescription");
const askAmount = require("./steps/askAmount");
const askPaymentDate = require("./steps/askPaymentDate");
const askConfirmation = require("./steps/askConfirmation");
const finishWizard = require("./steps/finishWizard");

const occasionalWizard = new Scenes.WizardScene(
    "occasional-wizard",
    askCategory,
    askDescription,
    askAmount,
    askPaymentDate,
    askConfirmation,
    finishWizard,
);

module.exports = occasionalWizard;
