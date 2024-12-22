import Question from "../model/Question.js";
import QuestionResult from "../model/QuestionResult.js";
import User from "../model/UserInfo.js";
import Score from "../model/Score.js";
import { getDate } from "../utils/getDate.js";

export const test = (req, res) => {
    res.send("question route is working fine");
}

export const GetQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        const user = await User.findOne({ telID: id });

        const questionResult = await QuestionResult.findOne({ user: user._id, dateDisplay: formattedDate });

        if (questionResult) {
            res.status(400).json({ questionResult });
            return;
        }

        const question = await Question.findOne({ date: formattedDate });
        res.status(200).json({ question });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

export const SetQuestionResult = async (req, res) => {
    try {
        const { date, question, result, telID } = req.body;
        const telIDString = telID.toString();

        const dateCount = getDate();

        const userID = await User.findOne({ telID: telIDString });

        const questionResult = new QuestionResult({
            user: userID._id,
            dateDisplay: date,
            date: dateCount,
            question,
            result
        });
        await questionResult.save();

        const scoreResult = await Score.findOne({ user: userID._id, date: dateCount });
        if (scoreResult) {
            scoreResult.score += 5000;
            await scoreResult.save();
            res.status(200).json({ questionResult });
            return;
        }

        const newScore = new Score({
            user: userID._id,
            date: dateCount,
            score: 5000,
            username: userID.username
        });

        await newScore.save();

        res.status(200).json({ questionResult });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}