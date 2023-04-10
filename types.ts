interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  receive_message: (arg: any) => void;
  chatroom_users: (arg: allUsersType[]) => void;
}

interface ClientToServerEvents {
  hello: () => void;
  join_room: (data: any) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

interface allUsersType {
  id: string;
  username: string;
  room: string;
}
