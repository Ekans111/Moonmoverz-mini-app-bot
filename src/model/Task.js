import moongoose from "mongoose";

const Schema = moongoose.Schema;

const TaskSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    date: {
        type: Number,
        required: [true, "Date is Required."]
    },
    task: {
        type: [Boolean],
        required: [true, "Task is Required."],
        default: [false, false, false, false, false, false]
    }
});

const Task = moongoose.model("tasks", TaskSchema);
export default Task;