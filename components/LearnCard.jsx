import React from 'react'
import { useState, useEffect } from 'react'
const LearnCard = ({quiz}) => {
  const length = quiz?.length
  const [quizIndex, setQuizIndex] = useState(0)
  const [showanswer, setShowAnswer] = useState(false);
  const [learn,setLearn] = useState([])

  //get 3 random numbers for the incorrect answer
  function myRandomInts(quantity, max, correct){
    const arr = []
    while(arr.length < quantity){
      var candidateInt = Math.floor(Math.random() * max)
      if(arr.indexOf(candidateInt) === -1 && candidateInt !== correct) arr.push(candidateInt)
    }
  return(arr)
  }
  //create 3 wrong answers for each questio
     function do_learn(){
        const b = []
        for(let i = 0; i < length; i++){
          const a = myRandomInts(3,length,i);
          
          b.push({"correct_answer":quiz[i].answer, "question":quiz[i].question,"wrong1": quiz[a[0]].answer, "wrong2": quiz[a[1]].answer, "wrong3": quiz[a[2]].answer})
        }
        return b;
        
    }
    //set learn values once at the beginning of render
  useEffect(()=>{
    console.log("learn is being updated")
    setLearn(do_learn())
    
  }, [quiz])
  
  
  console.log(learn)


  useEffect(() => {
      setShowAnswer(false);
    },[quizIndex]) 

    function increment_up(){
      if((quizIndex + 1) < length && quiz){
        setQuizIndex(prev => prev += 1)
        setShowAnswer(false);
      }else{
        setQuizIndex(0);
        setShowAnswer(false);
      }
      
    }
    function increment_down(){
      if((quizIndex - 1) > 0 && quiz){
        setQuizIndex(prev => prev -= 1)
        setShowAnswer(false);
      }else{ 
        setQuizIndex(quiz.length - 1);
        setShowAnswer(false);
      }
    }
    function flipcard(){
      setShowAnswer(prev => !prev);
    }


  return (
    <div className="flashcards-container">
      <span className="left caret" onClick={increment_down}>^</span>
      <div className="flashcard">
        
        <p className="answer-question">{showanswer ? 
        (quiz && quiz[quizIndex]?.answer)
        :
        (quiz && quiz[quizIndex]?.question)
      }
        </p>
        <button className="get-answer" onClick={flipcard}>get {showanswer ? "question" : "answer"}</button>
      </div>
      <span className="right caret" onClick={increment_up}>^</span>
    </div>
  );
}

export default LearnCard