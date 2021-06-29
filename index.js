const bot_token = 'ODUzOTI1NTczNDY5NDA1MjA1.YMceKQ.BakQF6DqC4tH4cgcbUwacPw8Q4o';
const Discord = require('discord.js');
const client = new Discord.Client();
const disbut = require('discord-buttons');
disbut(client);
let telegramButton = new disbut.MessageButton()
  .setStyle('url')
  .setLabel('Telegram Channel') 
  .setURL('https://t.me/lunayieldann');

  let discordButton = new disbut.MessageButton()
  .setStyle('url')
  .setLabel('Discord Channel') 
  .setURL('https://discord.gg/f6WZN6qcgd');

  let homePageButton = new disbut.MessageButton()
  .setStyle('url')
  .setLabel('Home page') 
  .setURL('https://lunayield.com/');

  let twitterButton = new disbut.MessageButton()
  .setStyle('url')
  .setLabel('Twitter') 
  .setURL('https://twitter.com/Luna_yield');

  let row = new disbut.MessageActionRow().addComponent(homePageButton).addComponent(telegramButton).addComponent(twitterButton).addComponent(discordButton);
  let setting = {
	GuildChannelId : '855309934149632010',
	GuildChannelWelcomeMessage : 'Welcome to Luna Yield Lobby!',
	EnableAttachment: false,
	ReplyAttachmentMessage: "Not allow send url or image into here!!",
	EnableURL: false,
	ReplyURLMessage: "Not allow send url or image into here!!"
 };


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
  member.guild.channels.cache.get(setting.GuildChannelId).send(setting.GuildChannelWelcomeMessage,{ component: row }); 
});

client.on('message', async message => {

    // Voice only works in guilds, if the message does not come from a guild,
    // we ignore it
    if (!message.guild) return;
    
	if(message.content.startsWith('!')){
    if(message.content === '!hi'){
      message.reply('Hi');
      return;
    }
		if(message.content.startsWith('!edit'))
		if(CheckRoles(message, 'Admin')){
			var str = message.content;
			str = str.replace(/  +/g, ' ');
			var arr = str.split(' ');
			var updateContent = str.substring(str.indexOf(arr[2])).trim();
			if(arr && arr.length > 2){
				switch (arr[1]) {
					case 'GuildChannelId':
						setting.GuildChannelId = updateContent;
					
						break;
					case 'GuildChannelWelcomeMessage':
						setting.GuildChannelWelcomeMessage = updateContent;
					break;
					case 'EnableAttachment':
						setting.EnableAttachment =  updateContent.toLowerCase() == 'true';
					break;
					case 'ReplyAttachmentMessage':
						setting.ReplyAttachmentMessage = updateContent;
					break;
					case 'EnableURL':
						setting.EnableURL = updateContent.toLowerCase() == 'true';
						break;
					case 'ReplyURLMessage':
						setting.ReplyURLMessage = updateContent;
						break;
					default:
						break;
				}
			}
		}
		if(message.content.startsWith('!setting'))
		if(CheckRoles(message, 'Admin'))
		{
			message.channel.send(JSON.stringify(setting));
		}

    if(message.content.startsWith('!channelId'))
		if(CheckRoles(message, 'Admin'))
		{
			message.channel.send(message.channel.id);
		}
	}
	if(CheckRoles(message, 'Admin')){
		return;
	}
      if(message.author.bot) return;
	if(CheckURL(message.content) && !setting.EnableURL){
		message.delete();
		message.channel.send(setting.ReplyURLMessage);
		return;
	}
	  if(message.attachments && message.attachments.size > 0  && !setting.EnableAttachment ){
		  message.delete();
		  message.channel.send(setting.ReplyAttachmentMessage);
		  return;
	  }
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
