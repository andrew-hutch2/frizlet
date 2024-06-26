import { useState, useEffect} from 'react'
import QuizCard from './QuizCard'
/* import {useSession } from "next-auth/react"; */

const Quizzes = () => {

  const [quizzes, setQuizzes] = useState([]);
  const [refreshQuizzes, setRefreshQuizzes] = useState(0);


    useEffect(() => {
      async function fetchQuizzes() {
        const response = await fetch('/api/quiz');
        const json = await response.json();
        setQuizzes(json);
     }
      fetchQuizzes();

    }, [refreshQuizzes]);
  return (
    <section className='quizzes'>
        <h2 className='your-quizzes-title'> Your Quizzes</h2>
        <div className='your-quizzes'>
          {/* <h3>{quizzes.map(val => val?.title)}</h3> */}
          {quizzes && quizzes.map(val => <QuizCard setRefreshQuizzes={setRefreshQuizzes} key={val?._id} quiz_id={val?._id} creator={val?.creator} title={val?.title} quiz={val?.quiz}/>)}
        </div>
    </section>
  )
}

export default Quizzes