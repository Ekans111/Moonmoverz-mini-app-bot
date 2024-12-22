import mongoose from "mongoose";

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    date: {
        type: String,
        required: [true, "Date is Required."]
    },
    question: {
        type: String,
        required: [true, "Question is Required."]
    },
    options: {
        type: [String],
        required: [true, "Options are Required."]
    }
});

const Question = mongoose.model("questions", QuestionSchema);
export default Question;