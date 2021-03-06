# Grandmaster

_A discord bot for fun and games_

## What is this?

Unable to play board games in person, I thought a Discord Bot might be able to help for some games. Currently, it only plays one game.

## Features:
### Wavelength

[With permission from the creator](https://twitter.com/AlxHague/status/1244988021587488774) of the fantastic [Wavelength](https://wavelength.zone), this bot's _raison d'être_ is to make playing games of Wavelength easy via a Discord server. None of these functions are permissioned, so make sure you're not playing in a room with griefers...

#### Generate the prompt
```
!w @username
```
![Prompt](./assets/wavelength/prompt.png)

PM's the tagged user with a clue and a gauge. Do this from the room you want to run the game in.

#### Adjust the dial
```
!w +10
```
![Adjust](./assets/wavelength/adjust.png)

In the room the game is running in, adjusts the dial by 10 degrees clockwise. Similarly, you can use -10 to reduce it by ten degrees. You can use any number, not just 10. No absolute figures though, only adjustments!

#### Reveal the answer
```
!w reveal
```
![Reveal](./assets/wavelength/reveal.png)

In the room the game is running in, reveal the gauge and score where the dial ended up.

### Teams
This feature probably doesn't work terribly well on servers with existing roles, but that's not the case on the server it was built for, so it's here regardless!
```
!teams @user1 @user2
```
Randomly divide the supplied users as evenly as possible in to two teams (roles). These roles are named randomly from a list; if you already have roles of the form 'The verbing nouns', there might be some cross-talk, so be careful of that.
```
!teams clear
```
Remove all users from teams.

### Janklord generator
```
!jank n
```
Where `n` is 1-5. Will return `n` legal commanders for a game of [EDH](https://mtgcommander.net/).

## Installation

To add this to your Discord server we think you just have to click [here](https://discordapp.com/oauth2/authorize?client_id=691008194201518130&permissions=268470272&scope=bot) but we're not totally sure! If you have trouble then feel free to ask for help in [this Discord](https://discord.gg/VdvmsaK).

## Credits

* [@area](https://github.com/area/)
* [@practual](https://github.com/practual/)
* [@ChrisEngland](https://github.com/ChrisEngland/)
