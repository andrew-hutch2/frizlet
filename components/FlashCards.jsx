"use client"

import {useState, useEffect, useCallback} from "react";

function FlashCards({quiz}) {
  const [quizIndex, setQuizIndex] = useState(0)
  const [showanswer, setShowAnswer] = useState(false);
  const thequiz = quiz[0];
  
  const questions = thequiz?.quiz;

  
  /* useEffect(() => {
      setShowAnswer(false);
    },[quizIndex]) */
    /* console.log(quizIndex); */
  function increment_up(){
    if((quizIndex + 1) < questions.length && questions){
      setQuizIndex(prev => prev += 1)
      setShowAnswer(false);
    }else{
      setQuizIndex(0);
      setShowAnswer(false);
    }
    
  }
  function increment_down(){
    if((quizIndex - 1) > 0 && questions){
      /* console.log("in the update function", quizIndex) */
      setQuizIndex(prev => prev -= 1)
      console.log("in the update function", quizIndex)
      setShowAnswer(false);
    }else{
      /* console.log(questions) */
      setQuizIndex(questions.length - 1);
      setShowAnswer(false);
    }
  }
  function flipcard(e){
    e.stopPropagation();
    setShowAnswer(prev => !prev);
  }
  function cardclick(){
    setShowAnswer(prev => !prev);
  }



  //shortcut code
  /* const handleKeyPress = useCallback((event) => {
    if(event.key == " "){
      setShowAnswer(prev => !prev); 
    }else if(event.key == "l" || event.key == "ArrowRight"){
      increment_up();
    }else if(event.key == "j" || event.key == "ArrowLeft"){
      increment_down();
    }
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]); 
  */
   
  return (
    <div className="flashcards-container">
      <span className="left caret" onClick={increment_down}>^</span>
      <div onClick={cardclick} className="flashcard">
        
        <p className="answer-question">{showanswer ? 
        (questions && questions[quizIndex]?.answer)
        :
        (questions && questions[quizIndex]?.question)
      }
        </p>
        <button className="get-answer" onClick={flipcard}>get {showanswer ? "question" : "answer"}</button>
      </div>
      <span className="right caret" onClick={increment_up}>^</span>
    </div>
  );
}

export default FlashCards;