import React from 'react'
import { useState, useEffect } from 'react'
const LearnCard = ({quiz}) => {
  const length = quiz?.length
  const [quizIndex, setQuizIndex] = useState(0)
  const [showanswer, setShowAnswer] = useState(false);
  const [learn,setLearn] = useState([]);
  const [showCheck, setShowCheck] = useState(false);
  
  
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

    const shuffle = (array) => { 
      for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
      } 
      return array; 
    }; 

    function randomizechoices(){
      const a = ["correct_answer", "wrong1", "wrong2", "wrong3",];
      const b = shuffle(a);
      /* const c = {"one": b[0], "two": b[1], "third": b[2], "fourth": b[3],} */
      return b;
    }
    const [randomize, setRandomize] = useState(randomizechoices)
    useEffect(()=>{
      setRandomize(randomizechoices);
    }, [quizIndex])
    console.log(randomize[0]);
    function color(n){
      if(randomize[n] == "correct_answer"){
        return "green"
      }else{
        return "red"
      }
    }

    function handleClick(event){
      event.preventDefault();
      setShowAnswer(true)
      console.log("this is printing", event.target.value);
      if(event.target.value === learn[quizIndex]?.correct_answer){
        setShowCheck(true)
      }else{
        setShowCheck(false)
      }
      /* ()=>setShowAnswer(true) */
    }
  
  return (
    <div className="learn-container">
      <span className="left caret" onClick={increment_down}>^</span>
      <div className="learn-card">
        
        {showanswer ? 
        (
          
          <div className='back'>
            <h3 className='learn-question'> {learn[quizIndex]?.question}</h3>
            <div className='learn-answers'>
            <button onClick={()=>setShowAnswer(false)} className={'learn-answer ' + color(0)}>{learn[quizIndex]?.[randomize[0]]}</button>
            <button onClick={()=>setShowAnswer(false)} className={'learn-answer ' + color(1)}>{learn[quizIndex]?.[randomize[1]]}</button>
            <button onClick={()=>setShowAnswer(false)} className={'learn-answer ' + color(2)}>{learn[quizIndex]?.[randomize[2]]}</button>
            <button onClick={()=>setShowAnswer(false)} className={'learn-answer ' + color(3)}>{learn[quizIndex]?.[randomize[3]]}</button>
            
            </div>
            {showCheck ? <p className='check'>correct</p> : <p className='check'> incorrect</p>}
          </div>
        )
        :
        (
          
          <div className='front'>
            <h3 className='learn-question'> {learn[quizIndex]?.question}</h3>
              <div className='learn-answers'>
              <button value={learn[quizIndex]?.[randomize[0]]} onClick={handleClick}className='learn-answer'>{learn[quizIndex]?.[randomize[0]]}</button>
              <button value={learn[quizIndex]?.[randomize[1]]} onClick={handleClick}className='learn-answer'>{learn[quizIndex]?.[randomize[1]]}</button>
              <button value={learn[quizIndex]?.[randomize[2]]} onClick={handleClick}className='learn-answer'>{learn[quizIndex]?.[randomize[2]]}</button>
              <button value={learn[quizIndex]?.[randomize[3]]} onClick={handleClick}className='learn-answer'>{learn[quizIndex]?.[randomize[3]]}</button>
            </div>
          </div>
        )
      }
      
       
      </div>
      <span className="right caret" onClick={increment_up}>^</span>
    </div>

  );
}

export default LearnCard;