import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    date: {
        type: Number,
        required: [true, "Date is Required."]
    },
    score: {
        type: Number,
        required: [true, "Score is Required."]
    },
    username: {
        type: String,
        required: [true, "Username is Required."]
    }
});

const Score = mongoose.model("scores", ScoreSchema);
export default Score;