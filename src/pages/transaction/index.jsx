import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Case from "../../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Transaction() {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = () => {
        let url = 'http://localhost:8000/transaction';
        if (startDate && endDate) {
            url += `?start_date=${startDate}&end_date=${endDate}`;
        }
        axios.get(url)
        .then(res => {
            setTransactions(res.data.data);
        })
        .catch(err => {
            setError(err.response ? err.response.data : { message: "An error occurred" });
        });
    };

    const deleteTransaction = (id) => {
        axios.delete(`http://localhost:8000/transaction/${id}`)
        .then(res => {
            setTransactions(transactions.filter(transaction => transaction.id !== id));
        })
        .catch(err => {
            setError(err.response ? err.response.data : { message: "An error occurred" });
        });
    };

    const handleFilter = (event) => {
        event.preventDefault();
        fetchTransactions();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <Case>
            <div className="block m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                    <div className="flex justify-between">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Transaction</h5>
                        <Link to='create' className="px-4 py-2 bg-teal-700 text-white shadow-md border-sky-500 rounded-lg">
                            Tambah
                            <FontAwesomeIcon icon="fa-solid fa-plus" className="pl-1 w-4 h-4 text-inherit" />
                        </Link>
                    </div>
                    <form onSubmit={handleFilter} className="mt-4 md:mt-6">
                        <div className="flex items-center space-x-4">
                            <div>
                                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date</label>
                                <input
                                    type="date"
                                    id="start_date"
                                    name="start_date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="block w-full mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date</label>
                                <input
                                    type="date"
                                    id="end_date"
                                    name="end_date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="block w-full mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                    Filter
                                </button>
                            </div>
                        </div>
                    </form>
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
                                    <th scope="col" className="px-6 py-4">Product</th>
                                    <th scope="col" className="px-6 py-4">Order Date</th>
                                    <th scope="col" className="px-6 py-4">Quantity</th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction, id) => (
                                    <tr key={transaction.id} className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4">{id + 1}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{transaction.product ? transaction.product.name : ''}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{formatDate(transaction.order_date)}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{transaction.quantity}</td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <Link to={'/transaction/edit/' + transaction.id} className="px-4 py-2 bg-orange-500 rounded-lg mr-2 font-bold text-white">Edit</Link>
                                            <button type="button" onClick={() => deleteTransaction(transaction.id)} className="px-4 py-2 bg-red-500 rounded-lg mr-2 font-bold text-white">Hapus</button>
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
