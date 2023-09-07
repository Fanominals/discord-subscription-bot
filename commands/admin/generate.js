import {
  errorMessage,
  generateSuccessMessage,
} from "../../messages/messages.js";

export const generateCodes = (data) => {
  if (!data.member.permissions.has("Administrator"))
    return errorMessage(data, "You don't have permission!");

  let codes = [];
  let multiplier;
  let time;
  let duration;
  let quantity;
  try {
    multiplier = parseInt(data.args[2].match(/\d+/g)[0]);
    time = data.args[2].match(/\D+/g)[0].toLowerCase();

    switch (time) {
      case "s":
        duration = multiplier * 1000; //seconds
        break;
      case "m":
        duration = multiplier * 1000 * 60; //minutes
        break;
      case "h":
        duration = multiplier * 1000 * 60 * 60; //hours
        break;
      case "d":
        duration = multiplier * 1000 * 60 * 60 * 24; //days
        break;
      case "w":
        duration = multiplier * 1000 * 60 * 60 * 24 * 7; //weeks
        break;
      case "mo":
        duration = multiplier * 1000 * 60 * 60 * 24 * 30; //months
        break;
      case "y":
        duration = multiplier * 1000 * 60 * 60 * 24 * 365; //years
        break;
    }

    if (!duration || duration === 0) return errorMessage(data, "Invalid Time");
  } catch (e) {
    return errorMessage(data, "Invalid Time");
  }

  if (
    !data.args[3] ||
    !Number.isInteger(parseInt(data.args[3])) ||
    data.args[3] < 1 ||
    data.args[3] > 10
  ) {
    quantity = 1;
  } else {
    quantity = parseInt(data.args[3]);
  }

  for (let i = 0; i < quantity; i++) {
    let code = "";
    const codeLength = Math.floor(Math.random() * 5) + 6;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let j = 0; j < codeLength; j++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    codes.push(code);
  }
  addCodes(data, codes, duration);
  generateSuccessMessage(data, codes, multiplier, time);
};

const addCodes = async (data, codes, duration) => {
  const collection = data.codesCollection;
  codes.forEach(async (code) => {
    await collection.insertOne({ code: code, duration: duration });
  });
};
