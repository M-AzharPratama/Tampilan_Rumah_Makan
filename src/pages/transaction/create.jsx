import { useEffect, useState } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TransactionCreate() {
    const [forms, setForms] = useState({
        product_id: '',
        order_date: '',
        quantity: ''
    });

    const [error, setError] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/product')
            .then(res => {
                setProducts(res.data.data);
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
                }
            });
    }, []);

    const handleCreateTransaction = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8000/transaction/create', forms)
            .then(res => {
                navigate('/transaction');
            })
            .catch(err => {
                setError(err.response.data.data);
                console.log(err.response);
            });
    };

    return (
        <Case>
            <div className="block m-auto h-screen bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                    <div className="flex justify-center">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Transaction</h5>
                    </div>
                    <form onSubmit={handleCreateTransaction} className="max-w-sm mx-auto">
                        <div className="mb-5">
                            <label htmlFor="product_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Makanan</label>
                            <select id="product" name="product_id" className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={e => setForms({ ...forms, product_id: e.target.value })}>
                                <option hidden disabled selected>Select Product</option>
                                {products.map(item => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="order_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Order</label>
                            <input type="date" name="order_date" id="order_date" className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required onChange={e => setForms({ ...forms, order_date: e.target.value })} />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                            <input type="number" name="quantity" id="quantity" className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required onChange={e => setForms({ ...forms, quantity: e.target.value })} />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </Case>
    );
}
