import { getDatabase } from "@/lib/mongodb";
import { User } from "@/types/user";
import { ObjectId } from "mongodb";


type UserDocument = Omit<User, "_id"> & {
    _id: ObjectId;
};

const COLLECTION_NAME = "users";

export async function getUserByEmail(
    email: string,
): Promise<User | null>{
    const db = await getDatabase();

    const user = await db.collection<UserDocument>(COLLECTION_NAME).findOne({email: email.toLowerCase()});

    if(!user){
        return null;
    }

    return {
        ...user,
        _id: user._id.toString(),
    }
}