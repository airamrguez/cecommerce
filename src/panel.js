import React, { Fragment, useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import ProductsProvider from './components/ProductsProvider';
import Header from './components/Header';
import BackButton from './components/BackButton';
import Button from './components/Button';
import AddEditProduct from './components/AddEditProduct';
import ProductList from './components/ProductList';
import Modal from './components/Modal';
import FullMessage from './components/FullMessage';
import { ProductsContext } from './contexts';
import { urlQuery } from './utils';
import './styles/common.scss';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(undefined);

  const toggleModal = useCallback(() => {
    setShowModal(!showModal);
  });

  const handleSubmit = useCallback(() => {
    setEditingProduct(undefined);
    toggleModal();
  });

  const editProduct = useCallback(product => {
    setEditingProduct(product);
    toggleModal();
  });

  const renderUser = () => {
    const { username } = urlQuery();
    return <span>Hi {username}!</span>;
  };

  return (
    <div className="app">
      <Header text="Admin panel" left={<BackButton />} right={renderUser()} />
      <div className="container">
        <ProductsProvider>
          <ProductsContext.Consumer>
            {({ products, isLoading, error }) => {
              if (error) {
                return <FullMessage>Oops! An error ocurred.</FullMessage>;
              }
              if (isLoading) {
                return <FullMessage>Loading ...</FullMessage>;
              }
              return (
                <Fragment>
                  <Button onClick={toggleModal} icon="add">
                    Add product
                  </Button>
                  <ProductList products={products} editProduct={editProduct} />
                </Fragment>
              );
            }}
          </ProductsContext.Consumer>
          <Modal isOpen={showModal}>
            <AddEditProduct
              product={editingProduct}
              handleSubmit={handleSubmit}
            />
          </Modal>
        </ProductsProvider>
      </div>
    </div>
  );
}

document.addEventListener('DOMContentLoaded', onDOMReady, false);
function onDOMReady() {
  document.removeEventListener('DOMContentLoaded', onDOMReady);
  ReactDOM.render(<App />, document.getElementById('root'));
}
