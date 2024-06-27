import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import Product from "./pages/product/index";
import ProductCreate from "./pages/product/create";
import ProductEdit from "./pages/product/edit";

import Transaction from "./pages/transaction/index";
import TransactionCreate from "./pages/transaction/create";
import TransactionEdit from "./pages/transaction/edit";

export const router = createBrowserRouter([

    { path: '/', element: <App /> },

    { path: '/product', element: <Product /> },
    { path: '/product/create', element: <ProductCreate /> },
    { path: '/product/edit/:id', element: <ProductEdit /> },

    { path: '/transaction', element: <Transaction /> },
    { path: '/transaction/create', element: <TransactionCreate /> },
    { path: '/transaction/edit/:id', element: <TransactionEdit /> },
    
])