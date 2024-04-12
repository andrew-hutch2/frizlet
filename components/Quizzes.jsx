import { useState, useEffect} from 'react'
import QuizCard from './QuizCard'
import {useSession } from "next-auth/react";
const Quizzes = () => {
  const { data: session } = useSession();
    const [quizzes, setQuizzes] = useState([]);
    /* console.log(quizzes, session) */
    useEffect(() => {
    const fetchQuizzes = async () => {
        const response = await fetch('/api/quiz');
        const data = await response.json();
        setQuizzes(data.filter( quiz => quiz.creator == session?.user.id));
    }
    fetchQuizzes();
    }, []);
    console.log(quizzes)
  return (
    <section className='quizzes'>
        <h2 className='your-quizzes-title'> Your Quizzes</h2>
        <div className='your-quizzes'>
          {/* <h3>{quizzes.map(val => val?.title)}</h3> */}
          {quizzes.map(val => <QuizCard quiz_id={val?._id} creator={val?.creator} title={val?.title} quiz={val?.quiz}/>)}
        </div>
    </section>
  )
}

export default Quizzes