import React, { useEffect, useState } from 'react';
import { request } from 'graphql-request';

const Home = () => {
    let [tasks, setTasks] = useState([]);
    let [newTask, setNewTask] = useState();
    let [email, setEmail] = useState();
    useEffect(() => {
        let email = localStorage.getItem('isLoggedIn');
        setEmail(email)
        const url = localStorage.getItem('url');
        const mutation = `
            query taskIds($email: String!) {
                taskIDs(getTaskInput: { email: $email }) {
                    _id
                }
            }
        `;
        const variables = {
            email: email
        };
        request(url, mutation, variables).then(result => {
            var arr = [];
            result['taskIDs'].forEach((_id, i) => {
                const url = localStorage.getItem('url');
                const mutation = `
                    query task($_id: String!) {
                        task(taskInput: { _id: $_id }) {
                            _id
                            task
                        }
                    }
                `;
                const variables = {
                    _id: _id['_id']
                };
                request(url, mutation, variables).then(result => {
                   // Find A Way to Push Item To Array And Save To State
                }).catch(err => {
                    console.error(err);
                });
            });
        }).catch(err => {
            console.error(err);
        });
    }, []);
    const handleChange = (e) => {
        setNewTask(e.target.value);
    };
    const handleClick = () => {
        const url = localStorage.getItem('url');
        const mutation = `
            mutation createTask($email: String!, $task: String!) {
                createTask(newTaskInput: { email: $email, task: $task }) {
                    tasks { 
                        task
                    }
                }
            }
        `;
        const variables = {
            email: email,
            task: newTask
        };
        request(url, mutation, variables).then(result => {
            window.location.reload();
        }).catch(err => {
            console.error(err);
        })
    };
    return (
        <div> 
            <div className="flex flex-col align-center">
                <input className="text-center" type="text" placeholder="New Task" onChange={handleChange} />
                <button className="text-center" onClick={handleClick}>Add New Task</button>
            </div>
            { tasks !== [] ? tasks.map((task, i) => (
                <div className="text-center" key={i}>{task.task}</div>
            )) : <i>No Tasks!</i>}
        </div>
    );
};

export default Home;