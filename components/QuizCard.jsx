import React from 'react'
import Link from "next/link";

const QuizCard = ({title, quiz, creator, quiz_id}) => {
  /* console.log(quiz) */
  return (
    <article className='quizcard'>
      <h2> {title}</h2>
      <h5> Preview of {title}</h5>
      <div className='quizcard-buttons'>
        <button className='quizcard-button'><Link  href={"/study/" + quiz_id}>
        Study
        </Link></button>

        <button className='quizcard-button'>Delete</button>
      </div>
    </article>
  )
}

export default QuizCard