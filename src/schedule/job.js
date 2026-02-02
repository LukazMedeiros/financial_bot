const schedule = require("node-schedule");
const reminders = require("../models/reminders");
const replyOnGroup = require("../bot/handlers/replyOnGroup");

async function teste() {
    const today = new Date().getDate();
    const response = await reminders.get(today);

    if (response.length > 0) {
        response.forEach((item) => {
            const message = `🚨 Você tem um lembrete para hoje!\nNão va esquecer de pagar <b>${item.description}</b> 😉`;
            replyOnGroup(message);
        });
    }
    return;
}

const rule = "0 8,12,13,14 * * *"; //everyday at 8, 12 and 14

const job = schedule.scheduleJob(rule, teste);

module.exports = job;
