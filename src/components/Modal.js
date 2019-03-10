import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import '../styles/modal.scss';

export default function Modal(props) {
  const { isOpen, ...rest } = props;
  return props.isOpen ? <Portal {...rest} /> : null;
}

const modalRoot = document.getElementById('modal-root');

function Portal(props) {
  const el = useRef(document.createElement('div'));
  useEffect(() => {
    el.current.className = 'modal-container';
    modalRoot.appendChild(el.current);
    return () => {
      modalRoot.removeChild(el.current);
    };
  }, []);

  return createPortal(
    <div className="modal">{props.children}</div>,
    el.current,
  );
}
