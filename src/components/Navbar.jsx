import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="bg-blue-600 py-2">
            <div className="grid grid-cols-12">
                <section className="col-span-10 col-start-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link 
                                className="mr-2 text-sm font-semibold uppercase text-white"
                                to="/"
                            >
                                Rumah Makan
                            </Link>
                            <Link to="/product"><small className="text-white ms-3">Product</small></Link>
                            <Link to="/transaction"><small className="text-white ms-3">Transaction</small></Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
