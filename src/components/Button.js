import React from 'react';
import { isNil } from '../utils';
import '../styles/Button.scss';

function Button(props) {
  const { text, children, className, icon, ...rest } = props;
  return (
    <button className={['button', className].join(' ').trim()} {...rest}>
      {!isNil(icon) && <ion-icon name={icon} />}
      {text}
      {children}
    </button>
  );
}

export default Button;
