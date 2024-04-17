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
    console.log(quizzes)
    const quiz = quizzes && quizzes[0]?.quiz;
    
  return (
    
    <div className='learn-container'>
        <h1 className='learn-title'> { quizzes && quizzes[0]?.title}</h1>
        <LearnCard/>
    </div>
    
  )
}

export default page