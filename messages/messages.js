import { EmbedBuilder } from "discord.js";
import config from "../config.json" assert { type: "json" };

export const errorMessage = async (data, error) => {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: data.user.tag,
      iconURL: data.user.avatarURL(),
    })
    .setColor("#FF7F7F")
    .setTitle(`Oops! There was an error...`)
    // .setThumbnail(
    //   "https://i.gifer.com/origin/78/787899e9d4e4491f797aba5c61294dfc_w200.gif"
    // )
    .setDescription(`We couldn't perform your command!\nReason: **${error}**`)
    .setFooter({
      text: `Please create a ticket for assistance.`,
    });
  await data.message.reply({
    embeds: [embed],
  });
};

export const generateSuccessMessage = async (data, codes, multiplier, time) => {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: data.user.tag,
      iconURL: data.user.avatarURL(),
    })
    .setColor(`#00FF00`)
    .setTitle(`${codes.length} Code(s) Generated!`)
    .setDescription(codes.join("\n"))
    .addFields({ name: "Time", value: `${multiplier}${time}` })
    .setFooter({
      text: config.messageText,
    });
  await data.message.reply({ content: `<@${data.user.id}>`, embeds: [embed] });
};

export const clearSuccessMessage = async (data) => {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: data.user.tag,
      iconURL: data.user.avatarURL(),
    })
    .setColor(`#00FF00`)
    .setTitle(`Codes Cleared!`)
    .setFooter({
      text: config.messageText,
    });
  await data.message.reply({ content: `<@${data.user.id}>`, embeds: [embed] });
};

export const listSuccessMessage = async (data, codes) => {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: data.user.tag,
      iconURL: data.user.avatarURL(),
    })
    .setColor(`#00FF00`)
    .setTitle(`Codes List`)
    .setDescription(codes.join("\n"))
    .setFooter({
      text: config.messageText,
    });
  await data.message.reply({ content: `<@${data.user.id}>`, embeds: [embed] });
};

export const redeemSuccessMessage = async (data, codeData) => {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: data.user.tag,
      iconURL: data.user.avatarURL(),
    })
    .setColor(`#00FF00`)
    .setTitle(`License Redeemed Successfully!`)
    .setDescription(
      `You have been granted access for **${codeData.duration / 3600000 >= 1
        ? `${codeData.duration / 3600000} hour(s)`
        : `${codeData.duration / 60000} minute(s)`
      }**`
    )
    // .addFields({name: 'Time', value: `${multiplier}${time}`})
    .setFooter({
      text: config.messageText,
    });
  await data.message.reply({ embeds: [embed] });
};

export const redeemNotificationMessage = async (data, channelId, codeData) => {
  const embed = new EmbedBuilder()
    .setColor(`#00FF00`)
    .setTitle(`License Redeemed!`)
    .setDescription(
      `<@${data.user.id}> has purchased a license for **${codeData.duration / 3600000 >= 1
        ? `${codeData.duration / 3600000} hour(s)`
        : `${codeData.duration / 60000} minute(s)`
      }**`
    )
    // .addFields({name: 'Time', value: `${multiplier}${time}`})
    .setFooter({
      text: config.messageText,
    });
  const notificationChannel = await data.guild.channels.fetch(channelId)
  await notificationChannel.send({ embeds: [embed] });
};

export const infoSuccessMessage = async (data, licenseInfo) => {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: data.user.tag,
      iconURL: data.user.avatarURL(),
    })
    .setColor(`#00FF00`)
    .setTitle(`User Information`)
    .setDescription(licenseInfo)
    .setFooter({
      text: config.messageText,
    });
  await data.message.reply({ embeds: [embed] });
};

export const manageUserAddMessage = async (data, managedUserId, duration) => {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: data.user.tag,
      iconURL: data.user.avatarURL(),
    })
    .setColor(`#00FF00`)
    .setTitle(`License Added Successfully!`)
    .setDescription(
      `**${duration / 3600000 >= 1
        ? `${duration / 3600000} hour(s)`
        : `${duration / 60000} minute(s)`
      }** has been added to ${managedUserId}`
    )
    .setFooter({
      text: config.messageText,
    });
  await data.message.reply({ embeds: [embed] });
};

export const manageUserRemoveMessage = async (data, userId) => {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: data.user.tag,
      iconURL: data.user.avatarURL(),
    })
    .setColor(`#00FF00`)
    .setTitle(`Roles Removed`)
    .setDescription(`Roles removed from <@${userId}>!`)
    .setFooter({
      text: config.messageText,
    });
  await data.message.reply({ embeds: [embed] });
};

export const syncUserMessage = async (data, message) => {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: data.user.tag,
      iconURL: data.user.avatarURL(),
    })
    .setColor(`#00FF00`)
    .setTitle(`User Synced`)
    .setDescription(message)
    .setFooter({
      text: config.messageText,
    });
  await data.message.reply({ embeds: [embed] });
};

export const backupMessage = async (data, fileName) => {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: data.user.tag,
      iconURL: data.user.avatarURL(),
    })
    .setColor(`#00FF00`)
    .setTitle(`Backup Successful`)
    .setDescription(`Database Backup saved as **${fileName}**`)
    .setFooter({
      text: config.messageText,
    });
  await data.message.reply({ embeds: [embed] });
};

export const freeTrialMessage = async (data) => {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: data.user.tag,
      iconURL: data.user.avatarURL(),
    })
    .setColor(`#00FF00`)
    .setTitle(`Claimed Free Trial!`)
    .setDescription("License key has been sent to your dm.")
    .setFooter({
      text: config.messageText,
    });
  await data.message.reply({ embeds: [embed] });
};

export const freeTrialDMMessage = async (data, code) => {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: data.user.tag,
      iconURL: data.user.avatarURL(),
    })
    .setColor(`#00FF00`)
    .setTitle(`Free Trial Code`)
    .setDescription(
      `Type **!redeem <key>** in the server to redeem.\nLicense key: **${code}**`
    )
    .setFooter({
      text: config.messageText,
    });
  const dmChannel = await data.member.createDM();
  await dmChannel.send({ embeds: [embed] });
};

export const endLicenseMessage = async (member) => {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: member.user.tag,
      iconURL: member.user.avatarURL(),
    })
    .setColor(`#00FF00`)
    .setTitle(`Subscription Ended!`)
    .setDescription(
      `To **REGAIN** access, please resubscribe`
    )
    .setFooter({
      text: config.messageText,
    });
  try {
    const dmChannel = await member.createDM();
    await dmChannel.send({ embeds: [embed] });
  } catch { return }



};

//