import { atom, selector } from 'recoil';
import { dataProps } from './App';

export const page = atom({
  key: 'page',
  default: 1
});

export const users = atom({
  key: 'users',
  default: <dataProps>{}
});

export const countState = selector({
  key: 'count',
  get: ({ get }) => {
    const data = get(users);
    return data.count / data.results.length;
  }
});
