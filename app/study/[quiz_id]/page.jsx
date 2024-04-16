"use client"
import React from 'react'
import FlashCards from '@components/FlashCards';
import {useSession } from "next-auth/react";
import { useState, useEffect} from 'react'

const page = ({params}) => {
  const { data: session } = useSession();
  const [quizzes, setQuizzes] = useState([]);
    useEffect(() => {
    const fetchQuizzes = async () => {
        const response = await fetch('/api/quiz');
        const data = await response.json();
        setQuizzes(data.filter( quiz  => quiz._id === params.quiz_id));
    }
    fetchQuizzes();
    }, []);
    console.log(quizzes)
  return (
    <div>
      <h1 className='study-title'> {quizzes[0] && quizzes[0].title}</h1>
      <FlashCards quiz={quizzes}/>
    
    </div>

  )
}

export default page