# Hook
Hook phụ trách tương tác server để lấy dữ liệu, xào nấu dữ liệu tùy vào từng trường hợp, tất cả những tác vụ liên quan đến product

# Component
Phụ trách lấy dữ liệu từ Hook, style và hiển thị lên giao diện

# Ví dụ
Để hiểu hơn về hook là gì và cách mà component và hook giao tiếp với nhau ta lấy 1 ví dụ
Nhiệm vụ của chúng ta là tạo ra 1 danh sách hiển thị sản phẩm, phân loại sản phẩm theo danh mục và tìm kiếm sản phẩm

Component sẽ gồm
    ProductList
    ProductCard
Hook sẽ gồm
    fetchProducts
    searchProduct
    filterByCategory

```
// hooks/useProducts.js
import { useState, useEffect } from 'react';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('api/products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch(`api/products/search?q=${searchTerm}`);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  };

  // Filter products by category
  const filterByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(`api/products/category/${category}`);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Filter failed');
    } finally {
      setLoading(false);
    }
  };

  // Load products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    searchProducts,
    filterByCategory,
    refreshProducts: fetchProducts
  };
};
```
```
// components/ProductList/ProductCard.jsx
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <p className="text-sm text-gray-500 mt-2">{product.description}</p>
      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Add to Cart
      </button>
    </div>
  );
};

```
```
// components/ProductList/ProductList.jsx
import { useProducts } from '../../hooks/useProducts';

const ProductList = () => {
  const { 
    products, 
    loading, 
    error, 
    searchProducts, 
    filterByCategory 
  } = useProducts();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => searchProducts(e.target.value)}
          className="p-2 border rounded-md flex-grow"
        />
        <select
          onChange={(e) => filterByCategory(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
```


