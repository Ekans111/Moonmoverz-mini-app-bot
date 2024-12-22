import Friend from "../model/Friend.js";
import User from "../model/UserInfo.js";
import Task from "../model/Task.js";
import Score from "../model/Score.js";
import { getDate } from "../utils/getDate.js";
import QuestionResult from "../model/QuestionResult.js";

const formattedDate = getDate();
export const test = async (req, res) => {
  res.send("friend route is working fine");
};

export const addFriend = async (req, res) => {
  const { username, userId, referralCode } = req.body;
  try {
    let friend = await User.findOne({ telID: userId });
    console.log("friend: ", friend);
    if (friend) {
      console.log("Friend already exists: ", friend);
    } else {
      const newFriend = new User({
        telID: userId,
        username: username,
      });
      console.log("New Friend: ", newFriend);
      newFriend.lastLoginDate = getDate();
      const task = new Task({ user: newFriend._id, date: formattedDate });
      newFriend.task = task._id;
      await newFriend.save();
      await task.save();

      friend = newFriend;
    }

    const currentUser = await User.findOne({ telID: referralCode });
    console.log("currentUser: ", currentUser);
    if (!currentUser) {
      return res.status(400).json({ error: "User not found" });
    }

    const friendData = await Friend.findOne({
      user: currentUser._id,
      friend: friend._id,
    });
    console.log("friendData: ", friendData);
    if (friendData) {
      return res.status(400).json({ error: "Friend is already invited by user" });
    }

    if (friend.username === currentUser.username) {
      return res.status(400).json({ error: "Cannot invite yourself" });
    }

    const existingFriendship = await Friend.findOne({
      user: currentUser._id,
      friend: friend._id,
    });
    if (existingFriendship) {
      return res.status(400).json({ error: "Friend is already added" });
    }

    const score = await Score.findOne({
      user: currentUser._id,
      date: formattedDate,
    });
    if (!score) {
      const newScore = new Score({
        user: currentUser._id,
        date: formattedDate,
        score: 2000,
        username: currentUser.username,
      });
      await newScore.save();
    } else {
      score.score += 2000;
      await score.save();
    }

    const scoreFriend = await Score.findOne({
      user: friend._id,
      date: formattedDate,
    });
    if (!scoreFriend) {
      const newScoreFriend = new Score({
        user: friend._id,
        date: formattedDate,
        score: 2000,
        username: friend.username,
      });
      await newScoreFriend.save();
    } else {
      scoreFriend.score += 2000;
      await scoreFriend.save();
    }

    const friendNew = await Friend.create({
      user: currentUser._id,
      friend: friend._id,
      date: formattedDate,
    });
    res.status(200).json({ friend: friendNew });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getFriends = async (req, res) => {
  const { telID } = req.body;
  try {
    const user = await User.findOne({ telID });
    const friends = await Friend.find({
      user: user._id,
    });

    if (!friends) {
      res.status(400).json({ error: "friends not found" });
    }

    let friendsData = [];
    for (let i = 0; i < friends.length; i++) {
      const friend = friends[i];
      const friendScores = await Score.find({ user: friend.friend });

      const friendTotalScore = friendScores.reduce(
        (total, score) => total + score.score,
        0
      );

      let isInvited = false;
      const isAnswered = await QuestionResult.findOne({
        user: friend.friend,
        date: formattedDate,
      });
      if (isAnswered) {
        isInvited = true;
      }

      const friendUser = await User.findOne({ _id: friend.friend });

      friendsData.push({
          username: friendUser.username,
          score: friendTotalScore,
          isInvited: isInvited
      })
    }
    friendsData.sort((a, b) => b.score - a.score);
    console.log("friendsData: ", friendsData);
    res.status(200).json({ friends: friendsData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
