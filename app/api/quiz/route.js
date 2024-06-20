import {connectToDB} from '@utils/database';
import Quiz from '@models/quiz'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export const revalidate = 0;

export const GET = async (req, res) => {
        
    try{
        await connectToDB();
        
        const session = await getServerSession(authOptions);
        const user_id = session?.user?.id

        const quizzes = await Quiz.find({creator: user_id})
    
        return new Response(JSON.stringify(quizzes), {
            status: 200
        })
    } catch(error){
        return res.json({
            message: "Failed to fetch data",
            status: 500
          })
    }
}