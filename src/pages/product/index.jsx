import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Case from "../../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/product')
        .then(res => {
            setProducts(res.data.data);
        })
        .catch(err => {
            setError(err.response ? err.response.data : { message: "An error occurred" });
        });
    }, []);

    const deleteProduct = (id) => {
        axios.delete(`http://localhost:8000/product/${id}`)
        .then(res => {
            setProducts(products.filter(product => product.id !== id));
        })
        .catch(err => {
            setError(err.response ? err.response.data : { message: "An error occurred" });
        });
    };

    return (
        <Case>
            <div className="block m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                    <div className="flex justify-between">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Product</h5>
                        <Link to='create' className="px-4 py-2 bg-teal-700 text-white shadow-md border-sky-500 rounded-lg">
                            Tambah
                            <FontAwesomeIcon icon="fa-solid fa-plus" className="pl-1 w-4 h-4 text-inherit" />
                        </Link>
                    </div>
                    {
                        Object.keys(error).length > 0 && (
                            <div role="alert">
                                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                    Gagal!
                                </div>
                                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                    <ul>
                                        {error.message}
                                    </ul>
                                </div>
                            </div>
                        )
                    }
                    <div className="flex mt-4 md:mt-6">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-4">No</th>
                                    <th scope="col" className="px-6 py-4">Name</th>
                                    <th scope="col" className="px-6 py-4">Price</th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, id) => (
                                    <tr key={product.id} className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4">{id + 1}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{product.name}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{product.price}</td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <Link to={'/product/edit/' + product.id} className="px-4 py-2 bg-orange-500 rounded-lg mr-2 font-bold text-white">Edit</Link>
                                            <button type="button" onClick={() => deleteProduct(product.id)} className="px-4 py-2 bg-red-500 rounded-lg mr-2 font-bold text-white">Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Case>
    );
}
