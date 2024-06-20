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
    <section className="w-full flex-col home-main">
      <h2 className='explain-title'> Quick Guide to create a quiz</h2>
      <div className="perw60">
        <p> Simply click the link below and copy and paste your quiz from the website that starts with a Q and ends with a uizlet. Then you will have unlimited free learn to study with.</p>
        <p> login with your google account to save quizzes</p>
      </div>
      <Link href="/createquiz" className='makequizlink'> <button className='quiz-make'>Make a Quiz</button></Link>
      <hr className="bar-seperate"/>
    <div>
        <Quizzes/>
    </div>
    </section>

    </>
  )
}

export default Home