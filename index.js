require('dotenv').config();

const { WebClient } = require('@slack/web-api');
const { RTMClient } = require('@slack/rtm-api');
const express = require('express');
const app = express();

const USER_OAUTH_TOKEN = process.env.USER_OAUTH_TOKEN;
const BOT_OAUTH_TOKEN = process.env.BOT_OAUTH_TOKEN;
const USER_ID = process.env.USER_ID;
const CHANNEL_ID = process.env.ADMIN_CHANNEL_ID;

//initialize web client as user
const client = new WebClient(USER_OAUTH_TOKEN);
//initialize RTM client as bot
const rtm = new RTMClient(BOT_OAUTH_TOKEN);

const addUserSubscription = async () => {
  await rtm.subscribePresence([USER_ID]);
};

const log = async (msg) => {
  console.log(msg);
  await client.chat.postMessage({
    token: BOT_OAUTH_TOKEN,
    text: msg,
    channel: CHANNEL_ID,
  });
};

const setDnd = async (time) => {
  console.log('Starting DND change');
  if (time > 1) {
    log('Turning on DND 🔕');
    return await client.dnd.setSnooze({
      token: USER_OAUTH_TOKEN,
      num_minutes: time,
    });
  } else if (time == 0) {
    log('Turning off DND 🔔');
    return await client.dnd.endDnd({
      token: USER_OAUTH_TOKEN,
    });
  }
};

rtm.on('ready', async () => {
  try {
    log('Starting App 🟢');
    await addUserSubscription();
  } catch (err) {
    console.error(err);
    log('THERE WAS AN ERROR STARTING THE APP 🚨');
  }
});

//listen for sub_presence event
rtm.on('presence_change', async (event) => {
  switch (event.presence) {
    case 'away': {
      setDnd(7200);
      break;
    }
    case 'active': {
      setDnd(0);
      break;
    }
  }
  console.log('Successful Change ✅');
});

app.get('/', (req, res) => {
  res.status(200).send("Hi! I'm awake");
  log('Pinged 🤖');
});

app.listen(process.env.PORT || 3000, async () => {
  try {
    console.log('Starting express server 🏁');
    await rtm.start({
      token: BOT_OAUTH_TOKEN,
    });
  } catch (err) {
    console.error(err);
    log('THERE WAS AN ERROR WITH THE EXPRESS SERVER 🚨');
  }
});

process.on('SIGINT' || 'SIGTERM', () => {
  log('Down 🔴');
});
