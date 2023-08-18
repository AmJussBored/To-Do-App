import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

const DefaultLayout = () => {
    const { user, token, setUser, setToken, notification } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (event) => {
        event.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div className="text-primary-blue text-3xl"><i className="ri-booklet-line"></i> <strong className="text-black">To Do List</strong></div>
                    <div>
                        <strong className="text-lg">{user.name}</strong>
                        <a href="#" onClick={onLogout} className="btn-logout">
                            Logout
                        </a>
                    </div>
                </header>
                <main className="place-items-center">

                    <Outlet />
                </main>
                {
                    notification &&
                    <div className="notification">
                        {notification}
                    </div>
                }
            </div>
        </div>
    );
};

export default DefaultLayout;
