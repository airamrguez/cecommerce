import React, { useState, useCallback, useRef, useLayoutEffect } from 'react';
import { ProductsContext } from '../contexts';
import Input from './Input';
import Button from './Button';
import { isNil, isFunction, isEmpty, getImage } from '../utils';
import { validateProduct } from '../validators/validateProduct';
import '../styles/addedit.scss';

function AddEditProduct(props) {
  const context = React.useContext(ProductsContext);
  const isEditing = !isNil(props.product);
  const [product, setProduct] = useState(
    isEditing ? props.product : createEmptyProduct,
  );
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = useCallback(e => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  });

  const handleClick = useCallback(e => {
    e.preventDefault();
    const action = isEditing
      ? context.actions.updateProduct
      : context.actions.addProduct;
    const error = validateProduct(product);
    if (!isNil(error)) {
      setErrorMessage(error);
      return;
    }
    action(product).then(
      () => {
        // Reset the error message if the last time
        // an error was
        setErrorMessage('');
        props.handleSubmit();
      },
      () => {
        // TODO. Here the error comming from the result
        // of the promise should be shown to give more
        // information of the error.
        setErrorMessage('An error ocurred');
      },
    );
  });

  const title = isEditing ? 'Edit product' : 'New product';
  return (
    <div className="addedit">
      <div className="header">{title}</div>
      <form>
        <div className="field">
          <Input
            name="name"
            placeholder="Enter the product name"
            value={product.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="field">
          <Input
            name="description"
            placeholder="Enter the product description"
            value={product.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="error-message">
          {!isEmpty(errorMessage) ? errorMessage : null}
        </div>
        <div className="button-container">
          <Button type="button" onClick={props.handleSubmit}>
            Cancel
          </Button>
          <Button type="submit" className="primary" onClick={handleClick}>
            Accept
          </Button>
        </div>
      </form>
    </div>
  );
}

AddEditProduct.defaultProps = {
  handleSubmit: () => {},
};

function createEmptyProduct() {
  return {
    id: Date.now(),
    name: '',
    description: '',
    image: getImage(),
  };
}

export default AddEditProduct;
