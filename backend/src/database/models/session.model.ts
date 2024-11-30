import mongoose, { Document, Schema } from "mongoose";
import { daysFromNow } from "../../common/utils/date";

export interface SessionDocument extends Document {
    userId : mongoose.Types.ObjectId;
    userAgent?: string;
    expiredAt: Date;
    createdAt: Date;

}

const sessionSchema = new Schema<SessionDocument>({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        index:true,
        required:true,
    },
    userAgent:{
        type:String,
        required:false,

    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    expiredAt:{
        type:Date,
        required:true,
        default: daysFromNow(30),
    }
});

const SessionModel = mongoose.model<SessionDocument>("Sesssion" , sessionSchema);

export default SessionModel;