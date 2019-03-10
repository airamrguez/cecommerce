import React, { useCallback } from 'react';
import Button from './Button';

export default function BackButton() {
  const goBack = useCallback(() => {
    history.back();
  });
  return <Button icon="arrow-back" onClick={goBack} />;
}
