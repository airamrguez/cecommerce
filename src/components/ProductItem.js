import React, { useCallback, useContext } from 'react';
import Button from './Button';
import { ProductsContext } from '../contexts';
import '../styles/product.scss';

function ProductItem(props) {
  const context = useContext(ProductsContext);
  const {
    product: { id, image, name, description },
  } = props;
  const handleRemoveClick = useCallback(e => {
    e.preventDefault();
    context.actions.removeProduct(id);
  });
  const handleEditClick = useCallback(e => {
    e.preventDefault();
    props.editProduct(props.product);
  });
  return (
    <div className="product card">
      <div
        className="image"
        style={{
          background: `url(${image}) center no-repeat`,
        }}
      />
      <div className="content">
        <div className="title">{name}</div>
        <div className="description">
          <p>{description}</p>
        </div>
        <div className="footer">
          <Button icon="create" onClick={handleEditClick}>
            Edit
          </Button>
          <Button icon="trash" onClick={handleRemoveClick}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
