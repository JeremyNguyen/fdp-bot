const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const author = context.params.event.member.user.username;
console.log(author + ' /fdp-help');

let helpSection = `> **FDP-bot commands : **
> 
> /addkeyword <keyword>
> /addreplique <user> <replique>
> /taunt <user(optionnal)>
> /clairons-ouverts
> /clairons-fermes
> 
> Users : bib, phila, niko, annaka, nano,kaimz
> 
> Database refreshed every 5min. 
> 
> Played quotes will go into a dedicated pool.
> Quotes are selected randomly between the unplayed ones until there is no quote available.
> When all quotes are played they become all available again.
> Played quotes are reset every hour.
`;

await lib.discord.channels['@0.0.6'].messages.create({
  channel_id: context.params.event.channel_id,
  content: `> <@!${context.params.event.member.user.id}>,\n> \n${helpSection}`
});

