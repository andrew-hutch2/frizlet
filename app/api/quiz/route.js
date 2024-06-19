import {connectToDB} from '@utils/database';
import Quiz from '@models/quiz'
import { getServerSession } from 'next-auth/next';
import { handler } from '../auth/[...nextauth]/route';
export const revalidate = 0;
export const GET = async (req, res) => {
     /* if (apiRes.status === 200) {    
            // "Cache-Control"-header needed for production to avoid Vercel's default 
            // response caching mechanism        
            res.setHeader(
              "Cache-Control",
              "no-cache, no-store, max-age=0, must-revalidate"
            );
        } */
        
    try{
        await connectToDB();
       /*  res.setHeader('Cache-Control', 'no-store') */
       
        /* const session = await getServerSession(handler);
        console.log("This is the session", session) */
        
       /*  const session = await getServerSession(req,res,handler);
        const user_id = session?.user?.id */
        /* 
        console.log("user_id",user_id) */

        const quizzes = await Quiz.find({})
        /* const quizzes = await Quiz.find({}).populate('creator'); */
        /* const quizzes = await Quiz.find({creator: user_id}) */
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