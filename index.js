var Botkit = require("botkit");
require("dotenv").config();
var os = require("os");

if (!process.env.token) {
  console.log("Error: Specify token in environment");
  process.exit(1);
}

var controller = Botkit.slackbot({
  debug: false
  //include "log: false" to disable logging
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

// connect the bot to a stream of messages
controller.spawn({
  token: process.env.token,
}).startRTM()

// Response to 'hello' like input
controller.hears(["hello", "hey", "what's up", "whats up", "sup", "Rick" ],["direct_message","direct_mention","mention"],function(bot,message) {

  bot.reply(message,"What do you want <burp> JERRY???");

});

controller.hears(["uptime", "identify yourself", "who are you", "what is your name"], "direct_message,direct_mention,mention", function(bot, message) {
  // Returns a string yelling at the user and including Rick's time n prison and the hostname
  var hostname = os.hostname();
  bot.reply(message, "I'M RICK BITCH. I've been sitting in this shitty prison for like " + timeInPrison() + " days. I'm on " + hostname + " come get me you asshole!");
});

controller.hears("those guys are inside me", ["direct_message", "direct_mention", "mention"], function(bot, message) {
  // Referencing Anatomy Park
  bot.reply(message, "Those guys are inside you building a piece of shit, Ethan!! They're inside you building a monument to compromise! Fuck 'em. Fuck those people. Fuck this whole thing, Ethan.")
});


controller.hears(['call me (.*)', 'my name is (.*)'], 'direct_message,direct_mention,mention', function(bot, message) {
  bot.reply("What? No. I'll just call you 'Little Bitch'");
  // var name = message.match[1];
  // controller.storage.users.get(message.user, function(err, user) {
  //     if (!user) {
  //         user = {
  //             id: message.user,
  //         };
  //     }
  //     user.name = name;
  //     controller.storage.users.save(user, function(err, id) {
  //         bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
  //     });
  // });
});

function timeInPrison() {
  // Should return a string with the number of days since the airdate of S2 Finale When Rick is sent to prison
  var airdate = Date.UTC(2015, 10, 5, 2);
  var timeInMilliseconds = Date.now() - airdate;
  var days = ((((timeInMilliseconds / 1000) / 60) / 60) / 24).toFixed(2);
  return days;
}
