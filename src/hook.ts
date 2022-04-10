import axios from 'axios';
import { useQuery } from 'react-query';

export const usePost = (currentPage: number) => {
  const fetchData = async (page: number) => {
    const res = await axios(`https://swapi.dev/api/planets/?page=${page}`);
    return res.data;
  };

  return useQuery<any, Error>(['data', currentPage], () => fetchData(currentPage), { keepPreviousData: true });
};
