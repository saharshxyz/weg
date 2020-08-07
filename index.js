require('dotenv').config();

const { WebClient } = require('@slack/web-api');
const { RTMClient } = require('@slack/rtm-api');
const app = require('express')();

const USER_OAUTH_TOKEN = process.env.USER_OAUTH_TOKEN;
const BOT_OAUTH_TOKEN = process.env.BOT_OAUTH_TOKEN;
const USER_ID = process.env.USER_ID;

//initialize web client as user
const client = new WebClient(USER_OAUTH_TOKEN);
//initialize RTM client as bot
const rtm = new RTMClient(BOT_OAUTH_TOKEN);

const addUserSubscription = async () => {
  await rtm.subscribePresence([USER_ID]);
};

const setDnd = async (time) => {
  // console.log('Starting DND change');
  if (time > 1) {
    console.log('Turning on DND 🔕');
    return await client.dnd.setSnooze({
      token: USER_OAUTH_TOKEN,
      num_minutes: time,
    });
  } else if (time == 0) {
    console.log('Turning off DND 🔔');
    return await client.dnd.endDnd({
      token: USER_OAUTH_TOKEN,
    });
  }
};

rtm.on('ready', async () => {
  try {
    console.log('Starting 🏁');
    await addUserSubscription();
  } catch (err) {
    console.error(err);
  }
});

//listen for sub_presence event
rtm.on('presence_change', async (event) => {
  console.log(event);
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
  // console.log('Changed Successful ✅');
});

app.get('/keepalive', (req, res) => {
    res.status(200).send('hi there, i\'m alive - how are you?');
})

app.listen((process.env.PORT || 3000), async () => {
    try {
    console.log('Starting express server 🟢');
    await rtm.start({
        token: BOT_OAUTH_TOKEN
    }); } catch (err) { console.error(err); }
})