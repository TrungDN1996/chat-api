import { Types } from "mongoose";
import { IRoom } from "src/module/rooms/entities/room.entity";
import { IUser } from "src/module/users/entities/user.entity";

export interface IMessage {
    _id: Types.ObjectId;
    room: IRoom;
    sender: IUser;
    message: string;
}
