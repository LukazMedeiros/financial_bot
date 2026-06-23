const env = require("../config/env");
const schedule = require("node-schedule");
const reminder = require("../models/reminder.model");
const replyOnGroup = require("../services/replyOnGroup.service");
const reminders = require("../messages/reminders.message");
//
const getPaidExpenses = require("../services/getPaidExpenses.service.js");

const rule = env.rule;

const scheduledJobs = schedule.scheduleJob(rule, async () => {
    const today = new Date().getDate();

    const [reminderResponse, expensesResponse] = await Promise.allSettled([
        reminder.get(today),
        getPaidExpenses(),
    ]);

    const hasReminderForToday = reminderResponse.value.length > 0;

    if (hasReminderForToday) {
        reminderResponse.value.forEach((item) => {
            const found = expensesResponse.value.find(
                (value) => value.description === item.description,
            );

            if (!found) {
                replyOnGroup(reminders.requestPayment(item));
            }
        });
    }
    return;
});

module.exports = scheduledJobs;
