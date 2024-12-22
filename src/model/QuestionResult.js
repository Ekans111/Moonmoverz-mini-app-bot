import mongoose from "mongoose";

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    dateDisplay: {
        type: String,
        required: [true, "Date is Required."]
    },
    date: {
        type: Number,
        required: [true, "Date is Required."]
    },
    question: {
        type: String,
        required: [true, "Question is Required."]
    },
    result: {
        type: String,
        required: [true, "Result is Required."]
    }
});

const QuestionResult = mongoose.model("questionResults", QuestionSchema);
export default QuestionResult;