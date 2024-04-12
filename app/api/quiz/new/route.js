import {connectToDB} from "@utils/database";
import Quiz from '@models/quiz';
export const POST = async (req) => {
    const {quiz, creator, title} = await req.json()
    try {
        await connectToDB();
        const newQuiz = new Quiz({ 
            quiz, 
            creator,
            title
        })

        await newQuiz.save();

        return new Response(JSON.stringify(newQuiz), {
            status: 201
        })
    } catch (error) {
        return new Response("Failed to create a new quiz", {status: 500})
    }
}