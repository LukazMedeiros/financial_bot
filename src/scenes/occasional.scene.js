const { Scenes } = require("telegraf");
const askCategoriesStep = require("../steps/askCategories.step");
const askSomethingStep = require("../steps/askSomething.step");
const selectSomethingStep = require("../steps/selectSomething.step");
const finishStep = require("../steps/finish.step");
const isMonetaryValue = require("../utils/isMonetaryValue");
const isDateValid = require("../utils/isValidDate");

const occasionalWizard = new Scenes.WizardScene(
    "occasional-wizard",

    askCategoriesStep,

    askSomethingStep({
        key: "category",
        message: "Entre com a descrição",
        needValidation: false,
        validationFn: null,
        errorMessage: "Selecione uma categoria válida!",
    }),

    askSomethingStep({
        key: "description",
        message: "Entre com o valor",
        needValidation: false,
        validationFn: null,
        errorMessage: "A descrição não pode ser vazia",
    }),

    askSomethingStep({
        key: "amount",
        message: "Entre com a data do pagamento",
        needValidation: true,
        validationFn: isMonetaryValue,
        errorMessage: "Entre com um valor monetário valido! ex: 10,50",
    }),

    selectSomethingStep({
        key: "paymentDate",
        message: "Os dados estão corretos?", //adicionar formação com os valores inseridos pelo usuário
        needValidation: true,
        validationFn: isDateValid,
        errorMessage: "Entre com uma data válida! ex: 01/01/2026",
    }),

    finishStep({}),
);

module.exports = occasionalWizard;
