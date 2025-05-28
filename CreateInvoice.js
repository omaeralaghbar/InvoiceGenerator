// src/pages/CreateInvoice.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const CreateInvoice = () => {
    const [customer, setCustomer] = useState('');
    const [date, setDate] = useState('');
    const [products, setProducts] = useState([{ name: '', quantity: 1, price: 0 }]);
    const navigate = useNavigate();

    const handleChange = (i, field, value) => {
        const newProducts = [...products];
        newProducts[i][field] = field === 'quantity' || field === 'price' ? Number(value) : value;
        setProducts(newProducts);
    };

    const addProduct = () => setProducts([...products, { name: '', quantity: 1, price: 0 }]);
    const removeProduct = i => setProducts(products.filter((_, idx) => idx !== i));

    const subtotal = products.reduce((sum, p) => sum + p.quantity * p.price, 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    const saveInvoice = () => {
        const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
        const newInvoice = { id: Date.now(), customer, date, products, subtotal, tax, total };
        localStorage.setItem('invoices', JSON.stringify([...invoices, newInvoice]));
        navigate('/invoices');
    };

    return (
        <div className="container">
            <h2 className="heading">Create Invoice</h2>
            <input className="input" placeholder="Customer Name" value={customer} onChange={e => setCustomer(e.target.value)} />
            <input className="input" type="date" value={date} onChange={e => setDate(e.target.value)} />

            <table className="table">
                <thead><tr><th>Product</th><th>Quantity</th><th>Price</th><th>Action</th></tr></thead>
                <tbody>
                    {products.map((p, i) => (
                        <tr key={i}>
                            <td><input className="input" value={p.name} onChange={e => handleChange(i, 'name', e.target.value)} /></td>
                            <td><input className="input" type="number" value={p.quantity} onChange={e => handleChange(i, 'quantity', e.target.value)} /></td>
                            <td><input className="input" type="number" value={p.price} onChange={e => handleChange(i, 'price', e.target.value)} /></td>
                            <td><button onClick={() => removeProduct(i)} className="btn-danger">Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={addProduct} className="btn">Add Product</button>

            <div className="summary">
                Subtotal: ${subtotal.toFixed(2)} | Tax: ${tax.toFixed(2)} | Total: ${total.toFixed(2)}
            </div>

            <button onClick={saveInvoice} className="btn btn-save">Save Invoice</button>
        </div>
    );
};

export default CreateInvoice;
