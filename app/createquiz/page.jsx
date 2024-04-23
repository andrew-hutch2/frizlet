"use client"

import {useSession } from "next-auth/react";
import {useRouter} from 'next/navigation';
import { useState } from "react";
  
const CreateQuiz = () => {
const { data: session } = useSession();

const [formData, setFormData] = useState({flashcards: "", title: ""})
const router = useRouter();
const handleSubmit = async(e) => {
  e.preventDefault();
  let a = formData.flashcards.split("\n")
  /* setFormData({...formData, "flashcards": a.filter((word) => word.length > 1)}) */
  a = a.filter((word) => word.length > 1)
  console.log(a)
  

  const b = [];
  for (var i = 0; i < a.length; i++){
    if(i % 2 == 0) {
      
      b[i/2] = { question: a[i], answer: a[i+1]};
    
    }
  }
  
  
  
  try {
    const response = await fetch("/api/quiz/new", {
      method: "POST",
      body: JSON.stringify({
        quiz: b,
        creator: session?.user.id,
        title: formData.title,
      }),
    });

    if (response.ok) {
      router.push("/");
    }
  } catch (error) {
    console.log(error);
  }
}

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='new-quiz'>
          <div className='create-quiz-container'>
              <h2> Copy and Paste flash cards</h2>
                {/* <pre> Who was the first president of the United State of America {"\n"} George Washington {"\n"} Who was the sixteenth president of the United State of America {"\n"} Abraham Lincoln </pre> */}
                <pre> Make sure to put follow the pattern: {"\n"} question  (enter to new line) {"\n"} answer (enter to new line) {"\n"} question (enter to new line) {"\n"} answer (new line) etc. to insure the quiz is created correctly</pre>
              <label >Title of quiz: {" "}
                <input className='quiz-title' value={formData.title} onChange={(e)=> setFormData({...formData, "title": e.target.value})}></input>
              </label>
              <textarea autoFocus name="flashcards" value={formData.flashcards} onChange={(e)=> setFormData({...formData, "flashcards": e.target.value})} placeholder={"Example: \n Who was the first president of the United State of America \n George Washington \n Who was the sixteenth president of the United State of America \n Abraham Lincoln"}className='quiz-textarea'></textarea>
              <button  className="create-quiz-button"  type="submit">Create Quiz</button>
          </div>
        
        </div>
      </form>
    </>
  )
}

export default CreateQuiz