const { Scenes } = require("telegraf");
const askCategory = require("./steps/askCategory");
const askDescription = require("./steps/askDescription");
const askAmount = require("./steps/askAmount");
const askPaymentDate = require("./steps/askPaymentDate");
const askDueDate = require("./steps/askDueDate");
const askConfirmation = require("./steps/askConfirmation");
const finishWizard = require("./steps/finishWizard");

const recurrentWizard = new Scenes.WizardScene(
    "recurrent-wizard",
    askCategory,
    askDescription,
    askAmount,
    askPaymentDate,
    askDueDate,
    askConfirmation,
    finishWizard,
);

module.exports = recurrentWizard;
