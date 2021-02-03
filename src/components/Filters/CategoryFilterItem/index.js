import React from 'react';
import { CategoryFilterItemWrapper } from './styles';
import { Checkbox } from 'components';
import { navigate, useLocation } from '@reach/router';
import queryString from 'query-string';

export function CategoryFilterItem({ title, id }) {
  const { search } = useLocation();
  const qs = queryString.parse(search);
  const collectionIds = qs.c?.split(',').filter(c => !!c) || [];
  const checked = collectionIds?.includes(id);
  const searchTerm = qs.s;

  const handleClick = () => {
    let navigateTo = '/all-products';


    let newIds = collectionIds;

    if (checked) {
      newIds = collectionIds.filter(cId => cId !== id);
    } else {
      newIds.push(id);
    }

    newIds = newIds.map(cId => encodeURIComponent(cId));

    if (newIds.length && !searchTerm) {
      navigate(`${navigateTo}?c=${newIds.join(',')}`);
    } else if (newIds.length && !!searchTerm) {
      navigate(`${navigateTo}?c=${newIds.join(',')}&s=${encodeURIComponent(searchTerm)}`);
    } else if (!newIds.length && !!searchTerm) {
      navigate(`${navigateTo}?s=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate(navigateTo);
    }
  };

  return (
    <CategoryFilterItemWrapper onClick={handleClick}>
      <Checkbox checked={checked}/>
      <div>{title}</div>
    </CategoryFilterItemWrapper>
  );
}
