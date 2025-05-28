// src/pages/InvoiceList.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const InvoiceList = () => {
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];

    return (
        <div className="container">
            <h2 className="heading">Invoice List</h2>
            <table className="table">
                <thead><tr><th>ID</th><th>Customer</th><th>Date</th><th>Total</th><th>Action</th></tr></thead>
                <tbody>
                    {invoices.map(inv => (
                        <tr key={inv.id}>
                            <td>{inv.id}</td>
                            <td>{inv.customer}</td>
                            <td>{inv.date}</td>
                            <td>${inv.total.toFixed(2)}</td>
                            <td><Link to={`/invoice/${inv.id}`} className="btn-link">View</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceList;