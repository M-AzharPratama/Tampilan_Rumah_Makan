import React from "react";
import Navbar from "./Navbar";

export default function Case({ children }) {
    return (
        <div className="bg-gray-900 dark:bg-gray-900 min-h-screen">
            <Navbar />
            <section className="p-4">{children}</section>
        </div>
    );
}
