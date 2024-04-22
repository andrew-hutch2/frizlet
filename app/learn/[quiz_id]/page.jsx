"use client"

import React from 'react'
import { useEffect, useState } from 'react';
import LearnCard from '@components/LearnCard';

const page = ({params}) => {
    const [quizzes, setQuizzes] = useState([]);
    useEffect(() => {
    const fetchQuizzes = async () => {
        const response = await fetch('/api/quiz');
        const data = await response.json();
        setQuizzes(data.filter( quiz  => quiz._id === params.quiz_id));
    }
    fetchQuizzes();
    }, []);
    
    const quiz = quizzes && quizzes[0]?.quiz;
    const length = quiz?.length
  return (
    
    <section className='learn-container2'>
        <h1 className='learn-title'> { quizzes && quizzes[0]?.title}</h1>
        <LearnCard quiz={quiz} />
    </section>
    
  )
}

export default page