import fs from "fs";
import Questions from "../model/Question.js";

async function importJSONData() {
  const data = JSON.parse(
    fs.readFileSync("./src/utils/questions.json", "utf-8")
  );

  const questionsArray = Object.entries(data).map(
    ([date, questionDetails]) => ({
      date: date,
      ...questionDetails,
    })
  );

  try {
    for (const question of questionsArray) {
      // Check if a question with the same details already exists
      const existingQuestion = await Questions.findOne({
        date: question.date,
        // Add other fields you want to check against here
      });

      // If no existing question is found, create a new one
      if (!existingQuestion) {
        await Questions.create(question);
      }
    }
    // to exit the process
    return {
      success: true,
      message: "data successfully imported",
    };
  } catch (error) {
    console.log("error", error);
    return { success: false, message: "data not imported" };
  }
}

export default importJSONData;
