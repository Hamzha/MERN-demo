require('dotenv').config();
const Number = require('../models/number')
const Agenda = require('agenda')

module.exports = () => {
  try {
    const agenda = new Agenda({ db: { address: process.env.MONGOURI } });

    agenda.define("saving number", async (job) => {
      const number = new Number({
        number: 1
      });
      await number.save()
      console.log(number)
    });
    agenda.define("saving number again", async (job) => {
      const numbers = await Number.find({});
      console.log(numbers)
    });

    (async function () {
      // IIFE to give access to async/await
      try {
        await agenda.start();
        console.log('start --')

        await agenda.on('ready', async (job) => {
          console.log("Job %s ready", job.attrs.name);

        });

        await agenda.every("1 minutes", ["saving number", "saving number again"]);
        agenda.on("start", (job) => {
          console.log("Job %s starting", job.attrs.name);

        })
        agenda.on('complete', (job) => {
          console.log("Job %s completed", job.attrs.name);
        })
        agenda.on('success', (job) => {
          console.log("Job %s success", job.attrs.name);
        })
        agenda.on('fail', (err, job) => {
          console.log("Job %s fail", job.attrs.name, err);
        })
      } catch (err) { console.log(err) }
    })();
  } catch (err) {
    console.log('error', err)
  }
}
