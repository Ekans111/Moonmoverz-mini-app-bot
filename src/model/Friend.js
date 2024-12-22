import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FriendSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    friend: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    date: {
        type: Number,
        required: [true, "Date is Required."]
    }
});

const Friend = mongoose.model("friends", FriendSchema);
export default Friend;