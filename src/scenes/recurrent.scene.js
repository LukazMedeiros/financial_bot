const { Scenes } = require("telegraf");
const askSomethingStep = require("../steps/askSomething.step");
const askCategoriesStep = require("../steps/askCategories.step");
const finishStep = require("../steps/finish.step");
const selectSomethingStep = require("../steps/selectSomething.step");
const isMonetaryValue = require("../utils/isMonetaryValue");
const isDateValid = require("../utils/isValidDate");

const recurrentWizard = new Scenes.WizardScene(
    "recurrent-wizard",

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

    askSomethingStep({
        key: "paymentDate",
        message: "Entre com a data do vencimento",
        needValidation: true,
        validationFn: isDateValid,
        errorMessage: "Entre com uma data válida! ex: 01/01/2026",
    }),

    selectSomethingStep({
        key: "dueDate",
        message: "Os dados estão corretos?", //adicionar formação com os valores inseridos pelo usuário
        needValidation: true,
        validationFn: isDateValid,
        errorMessage: "Entre com uma data válida! ex: 01/01/2026",
    }),

    finishStep({}),
);

module.exports = recurrentWizard;
