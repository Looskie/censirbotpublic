const Discord = require('discord.js');
const client = new Discord.Client();
const token = '';
const PREFIX = '>';
const API_KEY = '';

// DO NOT TOUCH UNLESS RELEASED VERS
var version = "0.2.0";
var website = "https://www.Censirapp.com/";

client.on("ready", () => {
  client.user.setActivity("Released Beta #1.0", { type: "PLAYING" });
  console.log("Bot is online!");
});

function calFahrenheit(temperature) {
  let fah = Math.floor((temperature*9/5)+32);
  return fah;
};

client.on('message', async message => {
  // Bunch of ifs and constants
  if (message.author.bot) return;
  if (message.content.indexOf(PREFIX) !== 0) return;
  const args = message.content
    .slice(PREFIX.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  // Uptime PARAMS
  let totalSeconds = client.uptime / 1000;
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  let uptime = `The bot has been online for ${days} days, ${hours} hours, ${minutes} minutes and ${parseFloat(seconds.toFixed(0))} seconds!`;

  //Commands

    // Message Commands
  if(command === "version") {
    message.channel.send("Version: " + version)
  }

  if(command === "website") {
    message.channel.send("Website: " + website)
  }
  
   if (command === "uptime") {
    message.channel.send(uptime);
  }

  //Weather Command

  if(command === "weather") {

    let API_KEY = "f118068f2221b29881e4092bbcf1a389";
    const fetch = require('node-fetch');
    let arg = message.content.split(' ').join(' ').slice(9);

    if (!arg) {
      return message.channel.send('Error! Please do "**{Country/Zipcode},{Country}**"')
    }
  try {
    const call_api = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=` + arg + "&APPID=" + API_KEY + "&units=metric");
    const data = await call_api.json();
    if (data.sys.country === 'US') {
      temperature = calFahrenheit(data.main.temp)
      temp_max = calFahrenheit(data.main.temp_max)
      temp_min = calFahrenheit(data.main.temp_min)
      const embed = new Discord.RichEmbed().setColor("#2C80B9").setTitle(`Weather for ${data.name}`).addField("Weather:", `**Temperature**: ${temperature} ℉\n **High of**: ${temp_max} ℉\n **Low of**: ${temp_min} ℉\n **Description**: ${data.weather[0].main}`);
      message.channel.send({ embed });
    } else {
      const embed = new Discord.RichEmbed().setColor("#2C80B9").setTitle(`Weather for ${data.name}`).addField("Weather:", `**Temperature**: ${data.main.temp} ℃\n **High of**: ${data.main.temp_max} ℃\n **Low of**: ${data.main.temp_min} ℃\n **Description**: ${data.weather[0].main}`);
      message.channel.send({ embed });
    }
  } catch(err) {
    message.channel.send("Error! Try checking the way you spelled or inputed your city/country!")
    console.log(`The args put for this error are, ${arg}`);
  }
};
});

client.login(token);
