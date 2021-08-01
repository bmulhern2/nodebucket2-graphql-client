import Head from 'next/head';
import { useEffect, useState } from 'react';
import Auth from '../components/Auth';

const Index = () => {
  let [isLoggedIn, setIsLoggedIn] = useState();
  useEffect(() => {
    localStorage.setItem('url', 'https://nodebucket2-api.herokuapp.com/graphql');
    let loggedInEmail = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInEmail);
  }, [])
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      { isLoggedIn ? <h1>Logged In</h1> : <Auth /> }
    </div>
  )
}

export default Index;