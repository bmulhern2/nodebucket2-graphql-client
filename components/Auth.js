import React, { useState } from 'react';
import { request } from 'graphql-request';

const Auth = () => {
    let [email, setEmail] = useState();
    let [password, setPassword] = useState();
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleSignIn = () => {

    };
    const handleSignUp = () => {
        const mutation = `
            mutation create($email: String! $password: String!) {
                createUser(userInput: { email: $email, password: $password }) {
                    email
                }
            }
        `;
        var url = localStorage.getItem('url');
        var variables = { 
            email, 
            password, 
        }
        request(url, mutation, variables).then(result => {
            console.log(result);
        }).catch(err => {
            console.error(err);
        });
    };
    return (
        <div>
            <input type="email" placeholder="Email" onChange={handleEmail} />
            <input type="password" placeholder="Password" onChange={handlePassword} />
            <button onClick={handleSignIn}>Sign In</button><button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
};

export default Auth;