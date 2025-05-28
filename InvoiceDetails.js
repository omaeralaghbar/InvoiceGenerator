// src/pages/InvoiceDetails.js
import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import '../App.css';

const InvoiceDetails = () => {
    const { id } = useParams();
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    const invoice = invoices.find(inv => inv.id === parseInt(id));
    const componentRef = useRef();

    const handlePrint = useReactToPrint({ content: () => componentRef.current });

    if (!invoice) return <div className="container">Invoice not found</div>;

    return (
        <div className="container">
            <div ref={componentRef} className="invoice-details">
                <h2 className="heading">Invoice #{invoice.id}</h2>
                <p>Customer: {invoice.customer}</p>
                <p>Date: {invoice.date}</p>

                <table className="table">
                    <thead><tr><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
                    <tbody>
                        {invoice.products.map((p, i) => (
                            <tr key={i}>
                                <td>{p.name}</td>
                                <td>{p.quantity}</td>
                                <td>${p.price}</td>
                                <td>${(p.quantity * p.price).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <p>Subtotal: ${invoice.subtotal.toFixed(2)}</p>
                <p>Tax (5%): ${invoice.tax.toFixed(2)}</p>
                <p><strong>Total: ${invoice.total.toFixed(2)}</strong></p>
            </div>
            <button onClick={handlePrint} className="btn btn-print">Print Invoice</button>
        </div>
    );
};

export default InvoiceDetails;
