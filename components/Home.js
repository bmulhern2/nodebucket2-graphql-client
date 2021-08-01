// How to find which id is the right one
// Edit Task
// Delete Task
// React-Sortable
// Styling

import React, { useEffect, useState } from 'react';
import { request } from 'graphql-request';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import EditTask from './EditTask';
import DeleteTask from './DeleteTask';

const Home = () => {
    let [open, setOpen] = useState(false);
    let [open2, setOpen2] = useState(false);
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
                   setTasks(tasks => [...tasks, result['task']] );
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
    const Display = ({ task , i }) => {   
        const onOpenModal1 = () => setOpen(true);
        const onCloseModal1 = () => setOpen(false);
        const onOpenModal2 = () => setOpen2(true);
        const onCloseModal2 = () => setOpen2(false)
        return ( 
            <div className="flex flex-col">
                        <div>
                            <div className="text-center">{task.task}</div>
                        </div>
                        <div className="text-center">
                            <button className="modal-open mr-2 btn border border-gray-200 bg-gray-100" onClick={onOpenModal1}>Edit</button>
                            <Modal open={open} onClose={onCloseModal1} center><EditTask id={task._id} /></Modal>
                            <button className="modal-open ml-2 btn border border-gray-200 bg-gray-100" onClick={onOpenModal2}>Delete</button>
                            <Modal open={open2} onClose={onCloseModal2} center><DeleteTask id={task._id} /></Modal>
                        </div>
            </div>
        );
    };
    return (
        <div> 
            <div className="flex flex-col align-center">
                <input className="text-center" type="text" placeholder="New Task" onChange={handleChange} />
                <button className="text-center" onClick={handleClick}>Add New Task</button>
            </div>
            { tasks !== [] ? tasks.map((task, i) =>
              <>
                <Display key={task._id} task={task} i={i} />
              </>
            ) : <i>No Tasks!</i>}
        </div>
    );
};

export default Home;