import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditProductForm() {
  const { id } = useParams();
  const [form, setForm] = useState({ product_name: '', sku: '', stock_level: 0, price: '', currency: 'SGD' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/warehouse/${id}`)
      .then(res => setForm(res.data))
      .catch(() => setError('Failed to fetch product'));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.product_name || !form.sku || !form.price) {
      setError('Please fill all required fields');
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/warehouse/${id}`, form);
      setSuccess('Product updated!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setError('Failed to update product');
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <input name="product_name" placeholder="Name" className="form-control mb-2" value={form.product_name} onChange={handleChange} />
        <input name="sku" placeholder="SKU" className="form-control mb-2" value={form.sku} onChange={handleChange} />
        <input name="stock_level" type="number" placeholder="Stock" className="form-control mb-2" value={form.stock_level} onChange={handleChange} />
        <input name="price" type="number" step="0.01" placeholder="Price" className="form-control mb-2" value={form.price} onChange={handleChange} />
        <input name="currency" placeholder="Currency" className="form-control mb-2" value={form.currency} onChange={handleChange} />
        <button className="btn btn-primary" type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditProductForm;