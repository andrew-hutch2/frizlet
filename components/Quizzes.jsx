import { useState, useEffect} from 'react'
import QuizCard from './QuizCard'
import {useSession } from "next-auth/react";
const Quizzes = () => {
  const { data: session } = useSession();
    const [quizzes, setQuizzes] = useState([]);
    const [refreshQuizzes, setRefreshQuizzes] = useState(0);
    /* console.log(quizzes, session) */
    const fetchQuizzes = async () => {
      const response = await fetch('/api/quiz');
      const data = await response.json();
      
      /* setQuizzes(data.filter( quiz => quiz.creator == session?.user.id)); */
      setQuizzes(data)
      console.log(quizzes);
  }

    useEffect(() => {
    
    fetchQuizzes();
    }, [refreshQuizzes]);
  return (
    <section className='quizzes'>
        <h2 className='your-quizzes-title'> Your Quizzes</h2>
        <div className='your-quizzes'>
          {/* <h3>{quizzes.map(val => val?.title)}</h3> */}
          {quizzes.map(val => <QuizCard setRefreshQuizzes={setRefreshQuizzes} key={val?._id} quiz_id={val?._id} creator={val?.creator} title={val?.title} quiz={val?.quiz}/>)}
        </div>
    </section>
  )
}

export default Quizzes