const env = require("../config/env");
const schedule = require("node-schedule");
const reminder = require("../models/reminder.model");
const replyOnGroup = require("../services/replyOnGroup.service");
const reminders = require("../messages/reminders.message");

const rule = env.rule;

const scheduledJobs = schedule.scheduleJob(rule, async () => {
    const today = new Date().getDate();
    const response = await reminder.get(today);

    const hasReminderForToday = response.length > 0;

    if (hasReminderForToday) {
        response.forEach((item) => {
            replyOnGroup(reminders.requestPayment(item));
        });
    }
    return;
});

module.exports = scheduledJobs;
