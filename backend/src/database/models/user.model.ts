import mongoose, { Document, mongo, Schema } from "mongoose";
import { hashValue } from "../../common/utils/bcrypt";

interface UserPreferences {
    enable2FA:boolean;
    emailNotification : boolean;
    twoFactorSecret?:string;

}

export interface UserDocument extends Document {
    name:string;
    email:string;
    password:string;
    isEmailVerified:boolean;
    createdAt:Date;
    updatedAt:Date;
    userPreference:UserPreferences;
    comparePassword(value:string):Promise<boolean>;
}
const userPreferenceSchema  = new Schema<UserPreferences>({
    enable2FA:{type:Boolean, default:true  },
    emailNotification:{type:Boolean , default:true},
    twoFactorSecret:{type:String, required:false},
});

const userSchema = new Schema<UserDocument>({
    name: {type:String, required:true},
    email:{type:String , unique:true , required:true},
    password:{type:String , required:true},
    userPreference:{
        type:userPreferenceSchema,
        default:{},
        },
    },
    {
        timestamps:true,
        toJSON:{}
    }
);

userSchema.pre("save" , async function(next){
    if(this.isModified("password")){
        this.password = await hashValue(this.password);
    }
});

userSchema.methods.comparePassword = async function(value:string){
    return compareValue(value, this.password);
}

userSchema.set("toJSON",{
    transform: function(doc , ret){
        delete ret.password;
        delete ret.userPreference.twoFactorSecret;
        return ret;
    }
});

const UserModel = mongoose.model<UserDocument>("User" , userSchema);
export default UserModel;