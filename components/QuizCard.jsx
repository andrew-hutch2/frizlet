import React from 'react'
import Link from "next/link";
import { useRouter } from 'next/navigation';
const QuizCard = ({title, quiz, creator, quiz_id, setRefreshQuizzes}) => {
  /* console.log(quiz) */
  const router = useRouter();
  async function handleDelete(){
    try {
      const response = await fetch("/api/quiz/delete", {
        method: "DELETE",
        body: JSON.stringify({
          quiz_id: quiz_id,
        }),
      });
      
      if (response.ok) {
        setRefreshQuizzes(prev=>prev+1)
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <article className='quizcard'>
      <h2> {title}</h2>
      <h5> Preview: {quiz[0] && quiz[0].question} : {quiz[0] && quiz[0].answer}</h5>
      <p className='mb'> {quiz.length} terms</p>
      <div className='quizcard-buttons'>
        <button className='quizcard-button'><Link  href={"/study/" + quiz_id}>Study</Link></button>
        <button className='quizcard-button'> <Link href={"learn/" + quiz_id}>Learn</Link> </button>
        <button onClick={handleDelete} className='quizcard-button'>Delete</button>
      </div>
    </article>
  )
}

export default QuizCard