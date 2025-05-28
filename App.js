// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateInvoice from './Pages/CreateInvoice';
import InvoiceList from './Pages/InvoiceList';
import InvoiceDetails from './Pages/InvoiceDetails';
import './App.css';

function App() {
    return (
        
        <Router>
        <div><h1>Start to create your Invoice</h1></div>
            <nav className="navbar">
                <Link to="/create" className="nav-link">Create Invoice</Link>
                <br/>
                <Link to="/invoices" className="nav-link">Invoice List</Link>
            </nav>
            <Routes>
                <Route path="/create" element={<CreateInvoice />} />
                <Route path="/invoices" element={<InvoiceList />} />
                <Route path="/invoice/:id" element={<InvoiceDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
