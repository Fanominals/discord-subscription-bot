import { clearSuccessMessage } from "../../messages/messages.js";

export const clearCodes = async (data) => {
  if (!data.member.permissions.has("Administrator"))
    return errorMessage(data, "You don't have permission!");

  const collection = data.codesCollection;
  await collection.deleteMany({});
  clearSuccessMessage(data);
};
