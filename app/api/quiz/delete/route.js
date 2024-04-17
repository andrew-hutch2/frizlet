import {connectToDB} from "@utils/database";
import Quiz from '@models/quiz';

export const DELETE = async (req) => {
    const {quiz_id} = await req.json()
    console.log(quiz_id)
    console.log(Quiz._id)
    const quizzes = await Quiz.find({_id: quiz_id})
    a = await Quiz.remove(quizzes)
    console.log(a)
    console.log(quizzes)
    try {
        await connectToDB();

        /* await Quiz.findByIdAndRemove(quiz_id);
        const quizzes = await Quiz.find({_id: quiz_id}) */
        await Quiz.remove(quizzes)
        console.log("worked")
        return new Response("Quiz deleted successfully", {
            status: 201
        })
    } catch (error) {
        console.log("didn't work")
        return new Response("Failed to  delete quiz", {status: 500})
    }
}