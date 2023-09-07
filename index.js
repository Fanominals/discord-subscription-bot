import fs from "fs/promises";
import { Client, Events, GatewayIntentBits, ActivityType } from "discord.js";
import { commandHandler } from "./commands/commandHandler.js";
import config from "./config.json" assert { type: "json" };
import { MongoClient } from "mongodb";
import { manager } from "./manager.js";

let codesCollection;
let usersCollection;
let trialsCollection;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const connectToCluster = async (uri) => {
  let mongoClient;
  try {
    mongoClient = new MongoClient(uri);
    console.log("Connecting to MongoDB Atlas Cluster");
    await mongoClient.connect();
    console.log("Successfully connected to MongoDB Atlas!");
    return mongoClient;
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
};

client.once(Events.ClientReady, async (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  // client.user.setActivity("discord.js");
  // client.user.setPresence({
  //   activities: [{ name: "over", type: ActivityType.Watching }],
  //   status: "online",
  // });
  let mongoClient;

  mongoClient = await connectToCluster(config.uri);
  const db = mongoClient.db("hwhelper");
  codesCollection = db.collection("codes");
  usersCollection = db.collection("users");
  trialsCollection = db.collection("trials");

  manager(usersCollection, client);

});

client.on(Events.MessageCreate, async (message) => {
  try {
    let args = message.content.split(/\s+/g); //removes empty spaces
    if (args[0].substring(0, config.prefix.length) !== config.prefix) {
      return;
    }
    if (message.channelId === config.unlockerChannel) {
      console.log('Code redeemed in unlockhere')
      return;
    }


    console.log(message.channelId)
    const data = {
      message: message,
      member: message.member,
      guild: message.member.guild,
      user: message.author,
      args: args,
      command: args[0].substring(config.prefix.length),
      commandPrefix: args[0].substring(0, config.prefix.length),
      codesCollection: codesCollection,
      usersCollection: usersCollection,
      trialsCollection: trialsCollection,
    };




    if (data.commandPrefix === config.prefix) {
      commandHandler(data);
    } else return;
  }
  catch (error) {
    console.log(error);
  }

});

client.on(Events.GuildMemberAdd, async (member) => {
  try {
    if (await member.roles.cache.has(config.role)) {
      return;
    }
    if (await usersCollection.findOne({ userId: `${member.id}` })) {
      await member.guild.members.addRole({ user: member.id, role: config.role });
      console.log("added role to user");
    }
    return
  }
  catch { return; }


})

client.login(config.token);
