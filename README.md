# away-pause [![Run on Repl.it](https://repl.it/badge/github/saharshy29/away-pause)](https://repl.it/github/saharshy29/away-pause)

A slack app that turns off DND when you go online and turns on DND when you go online

## Usage

Create a slack app with scopes of `bot`, `chat:read:bot`, `dnd:read`, and `dnd:write`. Then, install the app to your workspace.

Create a `.env` file with the following structure and define the appropriate varibles:

```txt
USER_OAUTH_TOKEN=
BOT_OAUTH_TOKEN=
USER_ID=
ADMIN_CHANNEL_ID=
```

`USER_OAUTH_TOKEN=` and `BOT_OAUTH_TOKEN=` are tokens provided in the OAuth & Permissions's tab of the app dashboard. `USER_ID` is the id of the user in question. `ADMIN_CHANNEL_ID=` is the id of the channel where logging messages will be sent.

Run `npm i` to install the packages, then `npm start` and app should be working!

If you would like to use the app with repl.it, you will need to set up [UptimeRobot](https://uptimerobot.com) in order to keep the repl running.

## Credits

Special thanks to [@lukec11](https://lukec.me) for help on the app.
