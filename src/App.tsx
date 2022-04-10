import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import TableCom from './component/Table';
import { styled } from '@mui/styles';
import Box from '@mui/material/Box';
import { useIsFetching, UseQueryResult } from 'react-query';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from './component/Pagination';
import { usePost } from './hook';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { page, users } from './store';
import { TopNav } from './component/TopNav';

const Container = styled(Box)({
  width: '100vw',
  display: 'flex'
});

const Right = styled(Box)(({ theme }) => ({
  height: '100vh',
  width: `calc(100% - 250px)`,
  padding: '1em 3em',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  overflow: 'scroll',
  //@ts-ignore
  [theme.breakpoints.down('md')]: {
    width: `100%`
  }
}));

const RightContainer = styled(Box)({
  maxWidth: '1300px',
  overflow: 'hidden',
  width: `100%`,
  position: 'relative'
});

const Left = styled(Box)(({ theme }) => ({
  background: '#1C1C39',
  height: '100vh',
  color: '#FFFFFF',
  minWidth: '250px',

  //@ts-ignore
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

export type user = { name: string; terrain: string; population: number };

export interface dataProps {
  results: user[];
  count: number;
}

function App() {
  const currentPage = useRecoilValue(page);
  const setuserArray = useSetRecoilState(users);
  const { data, isLoading, isSuccess }: UseQueryResult<dataProps, Error> = usePost(currentPage);
  const [startSN, setstartSN] = useState(1);

  const isFetching = useIsFetching();

  const memoedData = useMemo(() => {
    if (data) {
      return data.results;
    }
  }, [data]);

  const memoedHeader = useMemo(
    () => ['s/n', 'name', 'email', 'phone', 'planet', 'terrain', 'date', 'population', 'status'],
    []
  );
  useEffect(() => {
    const dataPerFetch = 10;
    setstartSN(currentPage * dataPerFetch - dataPerFetch + 1);
  }, [currentPage]);

  const deleteUser = useCallback((user: user) => {
    console.log(user);
  }, []);

  if (isSuccess && data) {
    setuserArray(data);
  }
  if (isLoading || !data || !memoedData)
    return (
      <Box sx={{ display: 'flex', width: '100vw', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress color="inherit" />
      </Box>
    );

  return (
    <Container>
      <Left>Sidebar</Left>
      <Right>
        <RightContainer>
          {isFetching > 0 && <CircularProgress size="30px" color="inherit" sx={{ position: 'absolute', right: '0' }} />}
          <TopNav />
          <TableCom users={memoedData} startSN={startSN} header={memoedHeader} deleteUser={deleteUser} />
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', margin: '2rem 0' }}>
            <Pagination />
          </Box>
        </RightContainer>
      </Right>
    </Container>
  );
}

export default App;
