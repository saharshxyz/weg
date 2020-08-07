# away-pause [![Run on Repl.it](https://repl.it/badge/github/saharshy29/away-pause)](https://repl.it/github/saharshy29/away-pause)

A slack app that turns off DND when you go online and turns on DND when you go online

## Usage

Create a slack app with scopes of `bot`, `dnd:read`, and `dnd:write`. Install the app to your workspace.

Create a `.env` file with the following structure and define the appropriate varibles:
```
USER_OAUTH_TOKEN=
BOT_OAUTH_TOKEN=
USER_ID=
```

Run `npm i` to install the packages, then `npm start` and app should be working!
