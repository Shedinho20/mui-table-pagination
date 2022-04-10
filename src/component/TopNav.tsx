import React from 'react';
import { useRecoilValue } from 'recoil';
import { page } from '../store';

export const TopNav = () => {
  const currentPage = useRecoilValue(page);

  return (
    <div style={{ marginBottom: '1rem', display: 'flex' }}>
      <h4>current page {currentPage}</h4>
    </div>
  );
};
