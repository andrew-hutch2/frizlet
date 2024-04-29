"use client"

import Link from "next/link";
import {useSession, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";
import Quizzes from '@components/Quizzes';
  

function Home() {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
 

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  return (
    <>
    { session ? (
      //homepage code for logged in user
    <section className="w-full flex-col home-main">
      <h2> Quick Guide to create a quiz</h2>
      <div className="perw60">
        <p> Simply click the link below and copy and paste your quiz from the website that starts with a Q and ends with a uizlet. Then you will have unlimited free learn to study with.</p>
      </div>
      <Link href="/createquiz" className='makequizlink'> <button className='quiz-make'>Make a Quiz</button></Link>
      <hr className="bar-seperate"/>
    <div>
        <Quizzes/>
    </div>
    </section>
    
    ) : 
    (
      //homepage code for "guest" user (not logged in)
      <div className="guest-container">
        <h2 className="guest-title"> Log in with google to continue </h2>
        <h4> {!providers && "If you cannot see the login button in top right please refresh until you can"}</h4>
      </div>
      
    )
    }
    </>
  )
}

export default Home