import 'environment';

import { Client as DiscordClient } from 'discord.js';
import { handleStreams } from 'dispatch';

const client = new DiscordClient();

client.on('ready', () => {
  console.log('Ret-2-go!');
});

client.on('presenceUpdate', async (oldPresence, newPresence) => {
  await handleStreams(newPresence, client);
});

client.login(process.env.DISCORD_BOT_TOKEN);
