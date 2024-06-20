


"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import {useRouter} from 'next/navigation';

const Nav = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className='flex-between w-full '>
      <Link href='/' className='flex logo gap-2 flex-center'>
        <Image
          src='/images/frizlet-logo1.jpg'
          alt='logo'
          width="0"
          height="0"
          sizes="8vw"
          className="w-full h-auto logo-img"
        />
        <p className='logo_text'>Frizlet</p>
      </Link>
      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/createquiz' className='btn createquiz'>
              Create Quiz
            </Link>

            <button type='button'onClick={() =>{
              signOut()
              }} className='sign-out btn'>
              Sign Out
            </button>

            <Link href='/'>
              <Image
                src={session?.user.image}
                /* src='/images/frizlet-logo1.jpg' */
                width={55}
                height={55}
                className='rounded-full profile-img'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex mobile-profile'>
            <Image
              src={session?.user.image}
             /*  src='/images/frizlet-logo1.jpg' */
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/createquiz'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Quiz
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;