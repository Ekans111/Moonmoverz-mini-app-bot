import User from "../model/UserInfo.js";
import Score from "../model/Score.js";
import { getDate } from "../utils/getDate.js";

const formattedDate = getDate();

export const test = (req, res) => {
  res.send("rank route is working fine");
};

export const TodayRanking = async (req, res) => {
  try {
    const todayScorebyUsers = await Score.find({ date: formattedDate });
    console.log(todayScorebyUsers);
    let result = {};
    todayScorebyUsers.map((score) => {
      const userID = score.user;
      if (!result[userID]) {
        result[userID] = { score: 0 }; // Initialize the object if it doesn't exist
      }
      result[userID]["score"] += score.score;
      result[userID]["username"] = score.username;
    });
    const todayScoreResult = Object.values(result);
    todayScoreResult.sort((a, b) => b.score - a.score);
    res.status(200).json({ result: todayScoreResult });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const WeekRanking = async (req, res) => {
  const formattedOneWeekAgoDate = formattedDate - 7;
  try {
    const todayScorebyUsers = await Score.find({
      date: {
        $gte: formattedOneWeekAgoDate,
        $lte: formattedDate,
      },
    });
    let result = {};
    todayScorebyUsers.map((score) => {
      const userID = score.user;
      if (!result[userID]) {
        result[userID] = { score: 0 }; // Initialize the object if it doesn't exist
      }
      result[userID]["score"] += score.score;
      result[userID]["username"] = score.username;
    });
    const todayScoreResult = Object.values(result);
    todayScoreResult.sort((a, b) => b.score - a.score);
    res.status(200).json({ result: todayScoreResult });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const MonthRanking = async (req, res) => {
const formattedOneMonthAgoDate = formattedDate - 30;
  try {
    const todayScorebyUsers = await Score.find({ date: {
      $gte: formattedOneMonthAgoDate,
      $lte: formattedDate,
    } });
    let result = {};
    todayScorebyUsers.map((score) => {
      const userID = score.user;
      if (!result[userID]) {
        result[userID] = { score: 0 }; // Initialize the object if it doesn't exist
      }
      result[userID]["score"] += score.score;
      result[userID]["username"] = score.username;
    });
    const todayScoreResult = Object.values(result);
    todayScoreResult.sort((a, b) => b.score - a.score);
    res.status(200).json({ result: todayScoreResult });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const AllRanking = async (req, res) => {
  try {
    const todayScorebyUsers = await Score.find({});
    let result = {};
    todayScorebyUsers.map((score) => {
      const userID = score.user;
      if (!result[userID]) {
        result[userID] = { score: 0 }; // Initialize the object if it doesn't exist
      }
      result[userID]["score"] += score.score;
      result[userID]["username"] = score.username;
    });
    const todayScoreResult = Object.values(result);
    todayScoreResult.sort((a, b) => b.score - a.score);
    res.status(200).json({ result: todayScoreResult });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
