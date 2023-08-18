import React, { useEffect, useState, useRef } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import TaskList from "../components/TodoList";
import Popup from "../components/Popup";
import Edit from "../components/Edit";

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [editPopup, setEditPopup] = useState(false);
    const [addPopup, setAddPopup] = useState(false);
    const [editTask, setEditTask] = useState();
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();


    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = () => {
        setLoading(true);
        axiosClient
            .get("/todos")
            .then(({ data }) => {
                setLoading(false);
                console.log(data.data);
                setTodos(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onAddTodo = (payload) => {
        //event.preventDefault();

        axiosClient.post('/todos', payload)
        .then((data) => {
            getTodos();
            setAddPopup(!addPopup);
            setNotification(data.data.message);

        })
        .catch(err => {
            const response = err.response;
            console.log(response);
        })
    }

    const toggleAddPopup = (e) => {
        e.preventDefault();
        setAddPopup(!addPopup);
        console.log(addPopup);
    };

    const toggleEditPopup = (task) => {
        //e.preventDefault();
        setEditPopup(!editPopup);
        setEditTask(task);
        //console.log(task.id)
    };

    const onUpdateTodo = (payload) => {

        axiosClient.put(`/todos/${payload.id}`, payload)
        .then((data) => {
            console.log(data)
            getTodos();
            setNotification(data.data.message);

        })
        .catch(err => {
            const response = err.response;
            console.log(response);
        })

    }

    return (
        <div className="w-5/6">
            <a href="" className="text-2xl active:text-xl" onClick={toggleAddPopup}>
                <i className="ri-add-box-line"></i>
            </a>
            {/*------Add Popup--------*/}
            {addPopup && (
                <Popup popupFunction={toggleAddPopup} submitFunction={onAddTodo}></Popup>
            )}

            {/*-----Task List Loop---------*/}
            <div className="p-3 border-4 overflow-y-auto overflow-x-hidden border-black  rounded-md">
                {
                    loading ? <h2 className="text-center text-xl bg-gray-200 rounded-md drop-shadow p-1">Loading..</h2> :
                    todos && todos.length > 0 ? (
                        todos.map((task) => (
                            <TaskList key={task.id} task={task} getTodos={getTodos} toggleEditPopup={toggleEditPopup}></TaskList>
                        ))
                        ) : (
                        <h2 className="text-center text-xl bg-gray-200 rounded-sm drop-shadow p-1">No to do items yet <i className="ri-file-list-line"></i></h2>
                    )
                }

                {/*------Edit Popup--------*/}
                {editPopup && <Edit popupFunction={toggleEditPopup} submitFunction={onUpdateTodo} task={editTask}></Edit>}
            </div>
        </div>
    );
};

export default Todos;
