import { useSelector, useDispatch } from 'react-redux';

import { Tabs, Tab } from '@mui/material';

import { ActionCreator } from '../redux/actions';

const FILTER_INDEX = ['all', 'active', 'completed'];

export const FilterTab = () => {
  const filterBy = useSelector(state => state.filterBy);
  const dispatch = useDispatch(); 

  const setFilter = (_evt, index) => {
    dispatch(ActionCreator.setFilter(FILTER_INDEX[index]));
  };

  return (
    <Tabs onChange={setFilter} value={FILTER_INDEX.indexOf(filterBy)}>
      <Tab label='Все' />
      <Tab label='Активные' />
      <Tab label='Завершённые' />
    </Tabs>
  );
}
