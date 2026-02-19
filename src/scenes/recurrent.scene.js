const { Scenes } = require("telegraf");
const askSomethingStep = require("../steps/askSomething.step");
const askCategoriesStep = require("../steps/askCategories.step");
const finishStep = require("../steps/finish.step");
const selectSomethingStep = require("../steps/selectSomething.step");
const isMonetaryValue = require("../utils/isMonetaryValue.util");
const isDateValid = require("../utils/isValidDate.util");
const requests = require("../messages/requests.message");
const error = require("../messages/error.message");

const recurrentWizard = new Scenes.WizardScene(
    "recurrent-wizard",

    askCategoriesStep,

    askSomethingStep({
        key: "category",
        message: requests.insertDescription,
        needValidation: false,
        validationFn: null,
        errorMessage: error.category,
    }),

    askSomethingStep({
        key: "description",
        message: requests.insertAmount,
        needValidation: false,
        validationFn: null,
        errorMessage: error.description,
    }),

    askSomethingStep({
        key: "amount",
        message: requests.insertPaymentDate,
        needValidation: true,
        validationFn: isMonetaryValue,
        errorMessage: error.amount,
    }),

    askSomethingStep({
        key: "paymentDate",
        message: requests.insertDueDate,
        needValidation: true,
        validationFn: isDateValid,
        errorMessage: error.date,
    }),

    selectSomethingStep({
        key: "dueDate",
        needValidation: true,
        validationFn: isDateValid,
        errorMessage: error.date,
    }),

    finishStep({}),
);

module.exports = recurrentWizard;
