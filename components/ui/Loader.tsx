import React from 'react'


const Loader = () => {
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-orange-base animate-bounce"></div>
                <div
                    className="w-4 h-4 rounded-full bg-orange-base animate-bounce [animation-delay:-.3s]"
                ></div>
                <div
                    className="w-4 h-4 rounded-full bg-orange-base animate-bounce [animation-delay:-.5s]"
                ></div>
            </div>
        </div>)
}

export default Loader