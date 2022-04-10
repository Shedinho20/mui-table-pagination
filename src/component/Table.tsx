import React, { memo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { faker } from '@faker-js/faker';
import { makeStyles, styled } from '@mui/styles';
import { Typography } from '@mui/material';
import { user } from '../App';

const status = ['Completed', 'Incomplete', 'In progress'];

const TableCellStyled = styled(TableCell)({
  whiteSpace: 'nowrap'
});

const useStyles = makeStyles(theme => ({
  status: {
    backgroundColor: '#666',
    padding: '0.2rem',
    borderRadius: '5px'
  },
  table: {
    scrollbarWidth: 'none',
    maxWidth: 'fit-content',
    position: 'relative',
    '&::-webkit-scrollbar': { display: 'none' }
  }
}));

interface tableProp {
  header: string[];
  startSN: number;
  deleteUser: (user: user) => void;
  users: user[];
}
const TableCom = ({ users, deleteUser, header, startSN }: tableProp) => {
  const styles = useStyles();
  return (
    <TableContainer component={Paper} className={styles.table}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {header.map((thead, i) => (
              <TableCellStyled key={`${i}${thead}`}>{thead}</TableCellStyled>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, i: number) => {
            const statusSelected = status[Math.floor(Math.random() * status.length)];
            return (
              <TableRow
                key={i}
                sx={{ '&:hover': { backgroundColor: '#B8B8B8' }, cursor: 'pointer' }}
                onClick={() => deleteUser(user)}>
                <TableCellStyled>{i + startSN}</TableCellStyled>
                <TableCellStyled>{faker.name.firstName()}</TableCellStyled>
                <TableCellStyled>{faker.internet.email()}</TableCellStyled>
                <TableCellStyled>{faker.phone.phoneNumber()}</TableCellStyled>
                <TableCellStyled>{user.name}</TableCellStyled>
                <TableCellStyled>{user.terrain}</TableCellStyled>
                <TableCellStyled>{faker.date.past().toLocaleDateString()}</TableCellStyled>
                <TableCellStyled>{user.population}</TableCellStyled>
                <TableCellStyled>
                  <Typography
                    className={styles.status}
                    style={{
                      backgroundColor:
                        (statusSelected === 'Completed' && 'green') ||
                        (statusSelected === 'Incomplete' && 'orange') ||
                        (statusSelected === 'In progress' && 'yellow') ||
                        ''
                    }}>
                    {statusSelected}
                  </Typography>
                </TableCellStyled>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(TableCom);
