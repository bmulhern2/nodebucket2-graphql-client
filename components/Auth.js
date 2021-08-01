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
        const mutation = `
            mutation signIn($email: String!, $password: String!) {
                signIn(userInput: { email: $email, password: $password }) {
                    res
                }   
            }
        `;
        const url = localStorage.getItem('url');
        const variables = {
            email,
            password,
        };
        request(url, mutation, variables).then(result => {
            console.log(result);
            if (result['signIn']['res'] === true) {
                localStorage.setItem('isLoggedIn', variables['email']);
                window.location.reload();
            }
        }).catch(err => {
            console.log(err);
        })
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
        <div className="flex flex-col mt-1/2">
            <div className="flex flex-col">
                <input className="text-center border border-gray-200" type="email" placeholder="Email" onChange={handleEmail} />
                <input className="text-center border border-gray-200" type="password" placeholder="Password" onChange={handlePassword} />
            </div>
            <div className="flex justify-center">
                <button className="bg-gray-100 border border-gray-200 ml-2" onClick={handleSignIn}>Sign In</button>
                <button className="bg-gray-100 border border-gray-200 ml-2" onClick={handleSignUp}>Sign Up</button>
            </div>
        </div>
    );
};

export default Auth;