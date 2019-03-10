import React from 'react';
import ProductItem from './ProductItem';
import '../styles/grid.scss';

function ProductList(props) {
  const { products, ...rest } = props;
  return (
    <ul className="grid">
      {products.map(product => (
        <li key={product.id} className="col">
          <ProductItem {...rest} product={product} />
        </li>
      ))}
    </ul>
  );
}

ProductList.defaultProps = {
  products: [],
};

export default ProductList;
