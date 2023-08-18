import React, { useRef } from "react";

const Popup = ({task, popupFunction, submitFunction}) => {
    const titleRef = useRef();
    const descriptionRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
          title: titleRef.current.value,
          description: descriptionRef.current.value
        };

        submitFunction(payload);
      };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="bg-black opacity-25 absolute inset-0"
                onClick={popupFunction}
            ></div>

            <div className="bg-white w-1/4 h-96 relative z-10 p-4">
                <form onSubmit={handleSubmit}>
                    <a
                        href=""
                        className="text-xl active:text-2xl"
                        onClick={popupFunction}
                    >
                        <i className="ri-arrow-right-circle-line"></i>
                    </a>
                    <input
                        ref={titleRef}
                        type="text"
                        placeholder="Title"
                        className="mb-2 p-1 border-2 focus:border-black rounded-md "
                    />
                    <textarea
                        ref={descriptionRef}
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        placeholder="description"
                        className="p-1 w-full border-2 rounded-md border-gray-200"
                    ></textarea>
                    <button className="ml-auto rounded-md bg-black height text-white text-base w-20 active:text-lg">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Popup;
