//import modules
import React, { Fragment, useEffect, useState } from 'react';
import '../App.css';

import { toast } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';

//components
import InputTodo from './InputTodo';
import ListTodos from './ListTodos';

function TodoApp() {
    // state
    const [name, setName] = useState('');
    const [userID, setUserID] = useState('');

    // login
    const login = localStorage.user_login;

    const isLogin = () => {
        if (login) console.log('Logged in');
        else window.location = '/login';
    };

    // the name and set the setName
    const getName = async () => {
        // get the id from localstorage
        const id = localStorage.user_id;
        try {
            const response = await fetch(`https://grouptesttodoappserver.herokuapp.com/users/${id}`);
            const data = await response.json();

            setName(data.name);
        } catch (err) {
            console.error(err.message);
        }
    };

    // logout function that will clear the localstorage
    const logout = () => {
        Promise.resolve()
            .then(() => {
                toast.success('Logged out successfully!');
                return Promise.resolve();
            })
            .then(() => {
                setTimeout(() => {
                    localStorage.clear();
                    window.location = '/app';
                }, 2000);
            });
    };

    useEffect(() => {
        getName();
        isLogin();
    }, []);

    return (
        <Router>
            <Fragment>
                <div className="container">
                    <div className="container">
                        <h4 className="mt-5 text-right">User: {name}</h4>
                        <button className="btn btn-danger" onClick={logout}>
                            Logout
                        </button>
                    </div>
                    <InputTodo />
                    <ListTodos />
                </div>
            </Fragment>
        </Router>
    );
}

export default TodoApp;
