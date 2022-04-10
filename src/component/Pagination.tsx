import React, { memo } from 'react';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { page, countState } from '../store';

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#9B9BAE',
  width: 'max-content',
  borderRadius: '0.5em'
});

const Button = styled('button')({
  padding: '0.5em',
  margin: '0.2em',
  display: 'flex',
  border: 'none',
  backgroundColor: 'transparent',
  color: '#fff'
});

const ButtonSelected = styled('button')({
  padding: '0.5em 0.7em',
  margin: '0.2em',
  display: 'flex',
  border: 'none',
  backgroundColor: '#1C1C39',
  color: '#fff',
  opacity: 1,
  borderRadius: '0.2em'
});

const Pagination = () => {
  const setCurrentPage = useSetRecoilState(page);
  const count = useRecoilValue(countState);

  const { items } = usePagination({
    count
  });

  return (
    <nav>
      <List>
        {items.map(({ page, type, selected, ...item }, i) => {
          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            return <div key={i}>....</div>;
          } else if (type === 'page') {
            return (
              <div key={i} onClick={() => setCurrentPage(page as number)}>
                {selected ? (
                  <ButtonSelected type="button" {...item}>
                    {page}
                  </ButtonSelected>
                ) : (
                  <Button type="button" {...item}>
                    {page}
                  </Button>
                )}
              </div>
            );
          } else {
            if (type === 'previous') {
              return (
                <div
                  key={i}
                  onClick={() => {
                    if (page === 0) {
                      return;
                    }
                    setCurrentPage(page as number);
                  }}>
                  <Button type="button" {...item}>
                    <ChevronLeftIcon />
                  </Button>
                </div>
              );
            }
            if (type === 'next') {
              return (
                <div
                  key={i}
                  onClick={() => {
                    if (page === count + 1) {
                      return;
                    }
                    setCurrentPage(page as number);
                  }}>
                  <Button type="button" {...item}>
                    <ChevronRightIcon />
                  </Button>
                </div>
              );
            }
          }
          return <div />;
        })}
      </List>
    </nav>
  );
};

export default memo(Pagination);
