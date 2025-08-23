'use client';


export default function Loading() {
    return (
        <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-base animate-bounce"></div>
            <div
                className="w-4 h-4 rounded-full bg-orange-base animate-bounce [animation-delay:-.3s]"
            ></div>
            <div
                className="w-4 h-4 rounded-full bg-orange-base animate-bounce [animation-delay:-.5s]"
            ></div>
        </div>

    );
}
