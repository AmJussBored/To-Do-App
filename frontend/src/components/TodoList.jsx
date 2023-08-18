import React, { useState } from "react";
import axiosClient from "../axios-client";
import Popup from "./Popup";

const TodoList = ({ task, getTodos, toggleEditPopup }) => {
    const [checkboxValue, setCheckboxValue] = useState(task.finished === 1 ? true : false);

    const handleEditPopup = (event) => {
        event.preventDefault();

        toggleEditPopup(task);
    }

    const onChange = () => {
        setCheckboxValue(!checkboxValue);
        axiosClient.get(`/todos/markFinished/${task.id}`)
            .then((data) => {
                getTodos();
            })
            .catch((err) => {
                const response = err.response;
                console.log(response);
                console.log(response.data.message);
            });
    }

    const onDelete = (event) => {
        event.preventDefault();
        if (!window.confirm("Are you sure you want to delete this Task?"))
        {
            return;
        }
        axiosClient
            .delete(`/todos/${task.id}`)
            .then((data) => {
                window.alert(data.data.message);
                //console.log(data.data.message)
                getTodos();
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <div
            className="border-1 border-black  w-full rounded-sm mb-2 drop-shadow"
            key={task.id}
        >
            <div className="flex bg-white text-black items-center h-8">
                <input
                    type="checkbox"
                    className="w-4 mb-0 ml-2 self-center"
                    defaultChecked={checkboxValue}
                    onChange={onChange}
                />
                <h1 className={`text-lg ml-3 ${checkboxValue ? "line-through" : ""}`}>
                    {task.title}
                </h1>
                <div className="mr-0 ml-auto">
                    <a href="#" className="mr-3 text-lg" onClick={handleEditPopup}>
                        <i className="ri-edit-line"></i>
                    </a>
                    <a href="" className=" mr-3 text-lg" onClick={onDelete}>
                        <i className="ri-delete-bin-line"></i>
                    </a>
                </div>
            </div>
            {/*<div className="p-2">
                        <p>
                            {task.description}
                        </p>
                    </div>*/}

        </div>
    );
};

export default TodoList;
