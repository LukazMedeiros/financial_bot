const { Scenes } = require("telegraf");
const askSomethingStep = require("../steps/askSomething.step");
const selectSomethingStep = require("../steps/selectSomething.step");
const finishReminderStep = require("../steps/finishReminder.step");
const reminder = require("../models/reminder.model");
const reminders = require("../messages/reminders.message");
const isInvalidDay = require("../utils/isInvalidDay.util");

const reminderWizard = new Scenes.WizardScene(
    "reminder-wizard",

    askSomethingStep({
        message: reminders.start + "\n\n" + reminders.askDescription,
    }),

    askSomethingStep({
        key: "description",
        model: reminder,
        message: reminders.askDay,
    }),

    selectSomethingStep({
        key: "day",
        model: reminder,
        needValidation: true,
        errorMessage: "dia invalido",
        validationFn: isInvalidDay,
        message: reminders.askConfirmation,
    }),

    finishReminderStep(),
);

module.exports = reminderWizard;
