import {connectToDB} from '@utils/database';
import Quiz from '@models/quiz'

export const GET = async (req) => {
    try{
    
        /* const session = await getServerSession(handler);
        console.log("This is the session", session) */
        await connectToDB();

        /* const quizzes = await Quiz.find({}).populate('creator'); */
        const quizzes = await Quiz.find({})
        console.log(quizzes)
        return new Response(JSON.stringify(quizzes), {
            status: 200
        })
    } catch(error){
        return new Response("Failed to fetch data", {
            status: 500
        })
    }
}