import React, { useState } from "react";
import axiosClient from "../axios-client";


const TodoList = ({ task, deleteFunction, toggleEditPopup }) => {
    const [checkboxValue, setCheckboxValue] = useState(
        task.finished === 1 ? true : false
    );
    const [dropdown, setDropdown] = useState(false);


    const handleEditPopup = (event) => {
        event.preventDefault();

        toggleEditPopup(task);
    };

    const handleDropDown = (event) => {
        event.preventDefault();

        setDropdown(!dropdown);
    };

    const onChange = () => {
        setCheckboxValue(!checkboxValue);
        axiosClient
            .get(`/todos/markFinished/${task.id}`)
            .then((data) => {
                //getTodos();
            })
            .catch((err) => {
                const response = err.response;
                console.log(response);
                console.log(response.data.message);
            });
    };

    const handleDelete = (event) => {
        event.preventDefault();
        deleteFunction(task.id);
    };

    return (
        <div
            className="border-1 border-black  w-full rounded-sm mb-2 drop-shadow"
            key={task.id}
        >

            <div className={`flex text-black items-center h-8 ${!checkboxValue ? "bg-white" : "bg-gray-400"}`}>
                <input
                    type="checkbox"
                    className="w-4 mb-0 ml-2 self-center z-10 accent-gray-700"
                    defaultChecked={checkboxValue}
                    onChange={onChange}
                />
                <h1
                    className={`text-lg ml-3 ${
                        checkboxValue ? "line-through" : ""
                    }`}
                >
                    {task.title}
                </h1>
                <div className="mr-0 ml-auto">
                    {!dropdown ? (
                        <a
                            href=""
                            className="mr-3 text-lg"
                            onClick={handleDropDown}
                        >
                            <i className="ri-arrow-down-s-line"></i>
                        </a>
                    ) : (
                        <a
                            href=""
                            className="mr-3 text-lg"
                            onClick={handleDropDown}
                        >
                            <i className="ri-arrow-up-s-line"></i>
                        </a>
                    )}

                    <a
                        href="#"
                        className="mr-3 text-lg"
                        onClick={handleEditPopup}
                    >
                        <i className="ri-edit-line"></i>
                    </a>
                    <a href="" className=" mr-3 text-lg" onClick={handleDelete}>
                        <i className="ri-delete-bin-line"></i>
                    </a>
                </div>
            </div>
            {dropdown && (
                <div className="bg-gray-200 pl-9">
                    <div className="mb-1">
                        <h3 className="text-sm font-bold">Description</h3>
                    </div>

                    <div className="pl-4 pb-1 text-sm">
                        <p>{task.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodoList;
