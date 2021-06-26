const bot_token = 'ODUzOTI5MzY0NDYyMzcwODI2.YMchsQ.9mGiAOyBWY9XjOO6XT7lY0yuXIo';
const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interaction', async interaction => {
	if (!interaction.isCommand()) return;
	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});

client.login(bot_token);
client.on('guildMemberAdd', member => {
  
});
client.on('message', async message => {

    // Voice only works in guilds, if the message does not come from a guild,
    // we ignore it
    if (!message.guild) return;

  //  message.channel.send('Hi',disbut);	
   // client.channel.send('hi hi',disbut);
    if (message.content === '/join') {
      // Only try to join the sender's voice channel if they are in one themselves
      if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
      } else {
        message.reply('You need to join a voice channel first!');
      }
    }
	if(message.content === '!hi'){
		message.reply('Hi');
	}
  });


  function CheckRoles(message, roleName){
	return  message.member.roles.cache.find(role => role.name === roleName);
  }

  function CheckURL(str){
		var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
		  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
		  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
		  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
		  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
		  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
		return !!pattern.test(str);
  }