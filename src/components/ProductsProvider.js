import React, { useState, useEffect } from 'react';
import { ProductsContext } from '../contexts';
import { fetchJSON } from '../utils';

const PRODUCTS_ENDPOINT = 'localhost:3000';

export default function ProductsProvider(props) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const url = `//${PRODUCTS_ENDPOINT}/products`;
    const options = {};
    const result = fetchJSON(url, options);
    result.promise.then(setProducts, setError).finally(() => {
      setIsLoading(false);
    });
    return () => {
      result.controller.abort();
    };
  }, []);

  const addProduct = product => {
    const url = `//${PRODUCTS_ENDPOINT}/products`;
    const options = { method: 'POST', body: JSON.stringify(product) };
    const set = product => void setProducts([product, ...products]);
    return fetchJSON(url, options).promise.then(set, setError);
  };

  const updateProduct = product => {
    const { id } = product;
    const url = `//${PRODUCTS_ENDPOINT}/products/${id}`;
    const options = { method: 'PUT', body: JSON.stringify(product) };
    const set = product =>
      void setProducts(products.map(p => (p.id !== id ? p : product)));
    return fetchJSON(url, options).promise.then(set, setError);
  };

  const removeProduct = productId => {
    const url = `//${PRODUCTS_ENDPOINT}/products/${productId}`;
    const options = { method: 'DELETE' };
    const set = () =>
      void setProducts(products.filter(p => p.id !== productId));
    return fetchJSON(url, options).promise.then(set, setError);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoading,
        error,
        actions: { addProduct, updateProduct, removeProduct },
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
}
