import { isEmpty } from '../utils';

export function validateProduct(product) {
  if (isEmpty(product.name)) {
    return 'A product name should be specified';
  }
  if (isEmpty(product.description)) {
    return 'Products should have a description';
  }
  return null;
}
