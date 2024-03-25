import { Types } from "mongoose";
import { IUser } from "src/module/users/entities/user.entity";

export interface IRoom {
    _id: Types.ObjectId;
    members: IUser[];
}
