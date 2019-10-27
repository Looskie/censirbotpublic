const Discord = require('discord.js');
const client = new Discord.Client();
const token = '';
const PREFIX = '>';

// DO NOT TOUCH UNLESS RELEASED VERS
var version = '1.0.0'

var website = 'https://www.CensirApp.com/'


client.on('ready', () => {
  client.user.setActivity("BETA #0.1.0", {type: "PLAYING"});
  console.log('Bot is online!');
})

client.on('message', async message => {

  // Bunch of ifs and constants
  if(message.author.bot) return;
  if(message.content.indexOf(PREFIX) !== 0) return;
  const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  //Commands

    // Message Commands
  if(command === "version") {
    message.channel.send("Version: " + version)
  }

  if(command === "website") {
    message.channel.send("Website: " + website)
  }

  //Weather Command

  if(command === "weather") {

    let API_KEY = "f118068f2221b29881e4092bbcf1a389";
    const fetch = require('node-fetch');
    let arg = message.content.split(' ').join(' ').slice(9);

    if (!arg) {
      return message.channel.send('Error! Please do "**{Country/Zipcode},{Country}**"')
    }
    if(message.content.toLowerCase().includes("us")) {
      console.log(arg);
      const call_api = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=` + arg + "&APPID=" + API_KEY + '&units=imperial');
      const data = await call_api.json();
      console.log(data);
      const embed = new Discord.RichEmbed()
      .setColor('#2C80B9')
      .setTitle(`Weather for ${data.name}`)
      .addField('Info:', `**Temperature**: ${data.main.temp}℉\n **High of**: ${data.main.temp_max}℉\n **Low of**: ${data.main.temp_min}℉\n **It is currently ${data.weather[0].main}**`);
      message.channel.send({embed})
      .catch(console.error);
    }else {
      console.log(arg);
      const call_api = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=` + arg + "&APPID=" + API_KEY + '&units=metric');
      const data = await call_api.json();
      console.log(data);
      const embed = new Discord.RichEmbed()
      .setColor('#2C80B9')
      .setTitle(`Weather for ${data.name}`)
      .addField('Info:', `**Temperature**: ${data.main.temp}℃\n **High of**: ${data.main.temp_max}℃\n **Low of**: ${data.main.temp_min}℃\n **It is currently ${data.weather[0].main}**`);
      message.channel.send({embed})
    };
    if (`${data.cod}` === "404") {
      message.channel.send('test');
    }
  };
});

client.login(token);
