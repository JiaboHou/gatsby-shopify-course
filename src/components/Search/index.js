import React from 'react';
import { Input, Button } from 'components';
import { FaSearch } from 'react-icons/fa';
import { SearchForm } from './styles';
import { navigate, useLocation } from '@reach/router';
import queryString from 'query-string';

export function Search() {
  const { search } = useLocation();
  const c = queryString.parse(search)?.c || '';

  const [searchTerm, setSearchTerm] = React.useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!!c && !!searchTerm) {
      navigate(`/all-products?c=${encodeURIComponent(c)}&s=${encodeURIComponent(searchTerm)}`);
    } else if (!c && !!searchTerm) {
      navigate(`/all-products?s=${encodeURIComponent(searchTerm)}`);
    } else if (!!c && !searchTerm) {
      navigate(`/all-products?c=${encodeURIComponent(c)}`);
    } else {
      navigate('/all-products');
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.currentTarget.value);
  };

  return (
    <SearchForm onSubmit={handleSubmit}>
      <Input
        placeholder='Search'
        value={searchTerm}
        onChange={handleChange}
      />
      <Button>
        <FaSearch />
      </Button>
    </SearchForm>
  );
}
