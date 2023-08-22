import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

const DeleteModal = ({todo_id, deleteFunction, getTodos }) => {
    const { setNotification } = useStateContext();



    const onDelete = (event) => {
        event.preventDefault()
        axiosClient
            .delete(`/todos/${todo_id}`)
            .then((data) => {
                setNotification(data.data.message)
                //console.log(data.data.message)
                deleteFunction("");
                getTodos();
            })
            .catch((error) => {
                console.log(error);
            });
    }





    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="bg-black opacity-25 absolute inset-0"
                onClick={deleteFunction}
            ></div>

            <div className="bg-white  relative z-50 p-4 flex flex-col">
                <p className="text-2xl p-2 pb-1">
                    Are you sure you want to delete this item?
                </p>
                <div className="flow item-center justify-end p-2 pt-1 mx-auto">
                    <a href="" className="text-red-600 text-3xl" onClick={onDelete}>
                        <i className="ri-checkbox-circle-fill"></i>
                    </a>
                    <a href="" className="text-3xl" onClick={deleteFunction}>
                        <i className="ri-close-circle-line"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
