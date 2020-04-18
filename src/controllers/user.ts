import model from "../models/user";
import * as socket_io from "socket.io";
import { HttpError } from "../utils/errors";

export const index = async (id: string) => {
  const loggedUser = await model.findById(id);

  const users = await model.find(
    {
      $and: [
        { _id: { $ne: id } },
        { _id: { $nin: loggedUser.likes } },
        { _id: { $nin: loggedUser.dislikes } },
      ],
    },
    { profile: 1 }
  );

  return users;
};

export const like = async (
  user: string,
  userTarget: string,
  connectedUsers: string[],
  io: socket_io.Server
) => {
  const loggedUser = await model.findById(user);
  const targetUser = await model.findById(userTarget);

  if (!targetUser) throw new HttpError(400, "User not found");

  loggedUser.likes.push(targetUser._id);

  await loggedUser.save();

  if (targetUser.likes.includes(loggedUser._id)) {
    const loggedSocket = connectedUsers.find(
      (connectedUser) => connectedUser === user
    );
    const targetSocket = connectedUsers.find(
      (connectedUser) => connectedUser === userTarget
    );

    if (loggedSocket) {
      io.to(loggedSocket).emit("match", targetUser);
    }

    if (targetSocket) {
      io.to(targetSocket).emit("match", loggedUser);
    }
  }

  return loggedUser;
};

export const dislike = async (user: string, userTarget: string) => {
  const userDocument = await model.findById(user);
  const targetDocument = await model.findById(userTarget);

  if (!targetDocument) throw new HttpError(400, "User not found");

  userDocument.dislikes.push(targetDocument._id);

  await userDocument.save();

  return userDocument;
};
