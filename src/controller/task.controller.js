import User from "../model/UserInfo.js";
import Task from "../model/Task.js";
import Score from "../model/Score.js";
import { getDate } from "../utils/getDate.js";

const formattedDate = getDate();

export const test = (req, res) => {
  res.send("task route is working fine");
};

export const setTask = async (req, res) => {
  const { task, telID } = req.body;
  try {
    const user = await User.findOne({ telID });
    if (!user) {
      res.status(400).json({ error: "User not found" });
    }

    const newTask = await Task.findOne({ user: user._id, date: formattedDate });
    if (!newTask) {
      const taskNew = new Task({ task, user: user._id, date: formattedDate });
      await taskNew.save();

      const newScore = await Score.findOne({
        user: user._id,
        date: formattedDate,
      });
      if (newScore) {
        newScore.score += 50000;
        await newScore.save();
      } else {
        const scoreNew = new Score({
          user: user._id,
          date: formattedDate,
          score: 50000,
          username: user.username,
        });
        await scoreNew.save();
      }

      res.status(200).json({ task: taskNew });
    } else {
      let changedTaskCount = 0;
      for(let i = 0; i < task.length; i++) {
        if (!newTask.task[i] && task[i]) {
          changedTaskCount += 1;
        }
        if (!newTask.task[i]) newTask.task[i] = task[i];
      }
      await newTask.save();

      const newScore = await Score.findOne({
        user: user._id,
        date: formattedDate,
      });
      if (newScore) {
        newScore.score += 50000 * changedTaskCount;
        await newScore.save();
      } else {
        const scoreNew = new Score({
          user: user._id,
          date: formattedDate,
          score: 50000 * changedTaskCount,
          username: user.username,
        });
        await scoreNew.save();
      }

      res.status(200).json({ task: newTask });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getTask = async (req, res) => {
  const { telID } = req.body;
  try {
    const user = await User.findOne({ telID });
    console.log("getTask User: ", user);
    if (!user) {
      res.status(400).json({ error: "User not found" });
    }
    const task = await Task.findOne({ user: user._id, date: formattedDate });
    if (!task) {
      const newTask = new Task({ user: user._id, date: formattedDate });

      // check if some tasks are true before days
      const previousTask = await Task.findOne({
        user: user._id,
        date: { $lt: formattedDate },
      })
        .sort({ date: -1 })
        .limit(1);

      if (previousTask.task[0]) {
        newTask.task[0] = true;
      }
      if (previousTask.task[1]) {
        newTask.task[1] = true;
      }
      if (previousTask.task[4]) {
        newTask.task[4] = true;
      }
      if (previousTask.task[5]) {
        newTask.task[5] = true;
      }
      
      await newTask.save();
      console.log("newTask: ", newTask);
      res.status(200).json({ task: newTask });
    } else {
      console.log("task: ", task);
      res.status(200).json({ task });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
