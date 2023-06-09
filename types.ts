export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    receive_message: (arg: any) => void;
    timer: (arg: any) => void;
    chatroom_users: (arg: allUsersType[]) => void;
    last_100_messages: (arg: any) => void;
    error: (e: string) => void;
}

export interface ClientToServerEvents {
    hello: () => void;
    join_room: (data: any) => void;
    send_message: (data: ClientToServerDataInterface) => void;
    leave_room: (data: allUsersType) => void;
    connect_error: (arg: any) => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    name: string;
    age: number;
}

export interface allUsersType {
    id: string;
    username: string;
    room: string;
}

export interface ClientToServerDataInterface {
    message: string;
    username: string;
    room: string;
    __createdtime__: Date;
}

export interface Rooms {
    room: string;
    password: string;
    __createdtime__: number;
    __updatedtime__: number;
}
