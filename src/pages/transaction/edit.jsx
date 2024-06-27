import { useEffect, useState } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function TransactionEdit() {
    const params = useParams();
    const id = params.id;

    const [products, setProducts] = useState([]);
    const [transactions, setTransactions] = useState({
        product_id: '',
        order_date: '',
        quantity: ''
    });
    const [error, setError] = useState([]);

    const navigate = useNavigate();

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
    });

    useEffect(() => {
        getDataproducts();
        getDataTransactions();
    }, []);

    function getDataproducts() {
        instance.get(`/product`)
            .then(res => {
                setProducts(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function getDataTransactions() {
        instance.get(`/transaction/${id}`)
            .then(res => {
                setTransactions(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleEditTransaction = (event) => {
        event.preventDefault();

        instance.patch(`/transaction/${id}`, transactions)
            .then(res => {
                navigate('/transaction');
            })
            .catch(err => {
                setError(err.response.data);
                console.log(err.response);
            });
    };

    // Get the name of the stuff based on the product_id
    const ProductName = products.find(item => item.id === transactions.product_id)?.name || 'Loading...';

    return (
        <Case name='transactions Edit'>
            <div className="block m-auto h-screen bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                    {Object.keys(error).length > 0 ? (
                        <div role="alert">
                            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                Gagal!
                            </div>
                            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                <ul>
                                    {Object.entries(error).map(([key, value], i) => (
                                        <li key={key}>{key !== "status" ? i + 1 + '. ' + value : ''}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : ''}
                    <div className="flex justify-center">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Transaction</h5>
                    </div>
                    <form onSubmit={handleEditTransaction} className="max-w-sm mx-auto">
                        <div className="mb-5">
                            <label htmlFor="product_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Makanan</label>
                            <select
                                id="product"
                                name="product_id"
                                className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={transactions.product_id}
                                onChange={e => setTransactions({ ...transactions, product_id: e.target.value })}
                            >
                                <option hidden disabled>Select Product</option>
                                {products.map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>

                            {/* <select id="product"  name="product_id" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={e => settransactions({...transactions, product_id: e.target.value})}>
                                <option hidden disabled>Select Makanan</option>
                                {
                                    Object.entries(products).map(([index, item]) => (
                                        <option key={index} value={item.id} defaultValue={transactions.product_id}>{item.name}</option>
                                    ))
                                }
                            </select> */}
                        </div>
                        <div className="mb-5">
                            <label htmlFor="order_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Order</label>
                            <input type="date" id="order_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukan Tanggal" defaultValue={transactions.order_date} required onChange={e => setTransactions({ ...transactions, order_date: e.target.value })} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                            <input type="number" id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukan Quantity" defaultValue={transactions.quantity} required onChange={e => setTransactions({ ...transactions, quantity: e.target.value })} />
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
