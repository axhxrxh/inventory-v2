import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddProductForm() {
  const [form, setForm] = useState({ product_name: '', sku: '', stock_level: 0, price: '', currency: 'SGD' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // Simple validation
    if (!form.product_name || !form.sku || !form.price) {
      setError('Please fill all required fields');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/warehouse', form);
      setSuccess('Product added!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setError('Failed to add product');
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <input name="product_name" placeholder="Name" className="form-control mb-2" value={form.product_name} onChange={handleChange} />
        <input name="sku" placeholder="SKU" className="form-control mb-2" value={form.sku} onChange={handleChange} />
        <input name="stock_level" type="number" placeholder="Stock" className="form-control mb-2" value={form.stock_level} onChange={handleChange} />
        <input name="price" type="number" step="0.01" placeholder="Price" className="form-control mb-2" value={form.price} onChange={handleChange} />
        <input name="currency" placeholder="Currency" className="form-control mb-2" value={form.currency} onChange={handleChange} />
        <button className="btn btn-primary" type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddProductForm;