import {connectToDB} from '@utils/database';
import Quiz from '@models/quiz'



export const GET = async (req, res) => {
    /* console.log("this is the session", session) */
    try{
        res.setHeader('Cache-Control', 'no-store')

       /*  if (apiRes.status === 200) {    
            // "Cache-Control"-header needed for production to avoid Vercel's default 
            // response caching mechanism        
            res.setHeader(
              "Cache-Control",
              "no-cache, no-store, max-age=0, must-revalidate"
            );
        } */
        /* const session = await getServerSession(handler);
        console.log("This is the session", session) */
        await connectToDB();

        /* const quizzes = await Quiz.find({}).populate('creator'); */
        const quizzes = await Quiz.find({})
        /* console.log(quizzes) */
        /* res.setHeader(
            "Cache-Control",
            "nocache, no-store, max-age=0, must-revalidate"
        ); */
        return new Response(JSON.stringify(quizzes), {
            status: 200
        })
    } catch(error){
        return new Response("Failed to fetch data", {
            status: 500
        })
    }
}