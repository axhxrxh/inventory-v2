import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/warehouse');
      setProducts(res.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch products');
    }
    setLoading(false);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/warehouse/${id}`);
      setSuccess('Product deleted!');
      fetchProducts();
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h2>Product List</h2>
      <Link to="/add" className="btn btn-primary mb-3">Add Product</Link>
      {success && <div className="alert alert-success">{success}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th><th>SKU</th><th>Stock</th><th>Price</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.id}>
              <td>{prod.product_name}</td>
              <td>{prod.sku}</td>
              <td>{prod.stock_level}</td>
              <td>{prod.price}</td>
              <td>
                <Link to={`/edit/${prod.id}`} className="btn btn-warning btn-sm mr-2">Edit</Link>
                <button onClick={() => deleteProduct(prod.id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;