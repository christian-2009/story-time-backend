import { allUsersType } from "../types";

export default function leaveRoom(
  userId: string,
  chatRoomUsers: allUsersType[]
) {
  return chatRoomUsers.filter((user) => user.username !== userId);
}
