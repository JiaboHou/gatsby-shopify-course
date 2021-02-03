import React from 'react';
import { Layout, Filters, ProductsGrid } from 'components';
import ProductContext from 'context/ProductContext';
import styled from 'styled-components';
import queryString from 'query-string';
import { useLocation } from '@reach/router';

const Content = styled.div`
  display: grid;
  grid-gap: 20px;
  margin-top: 20px;
  grid-template-columns: 1fr 3fr;
`;

export default function AllProducts() {
  const { products, collections } = React.useContext(ProductContext);
  const { search } = useLocation();
  const qs = queryString.parse(search);
  const selectedCollectionIds = qs.c?.split(',').filter(c => !!c) || [];
  const searchTerm = qs.s;

  const selectedCollectionIdsMap = {};

  selectedCollectionIds.forEach(cId => {
    selectedCollectionIdsMap[cId] = true;
  });

  const collectionProductMap = {};

  if (collections) {
    collections.forEach(c => {
      collectionProductMap[c.shopifyId] = {};

      c.products.forEach(p => {
        collectionProductMap[c.shopifyId][p.shopifyId] = true;
      });
    });
  }

  const filterByCategory = (p) => {
    if (Object.keys(selectedCollectionIdsMap).length) {
      for(let key in selectedCollectionIdsMap) {
        if (collectionProductMap[key]?.[p.shopifyId]) {
          return true;
        }
      }
      return false;
    }
    return true;
  };
  const filterBySearchTerm = (p) => {
    if (searchTerm) {
      return p.title.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
    }
    return true;
  };

  const filteredProducts = products
    .filter(filterByCategory)
    .filter(filterBySearchTerm);
  return (
    <Layout>
      {!!searchTerm && !!filteredProducts.length &&
        <h3>
          Search term: <strong>'{searchTerm}'</strong>
        </h3>
      }
      {!!filteredProducts.length && <h4>{filteredProducts.length} products</h4>}
      <Content>
        <Filters />
        {!filteredProducts.length &&
          <div>
            <h3>
              <span>Oh no! Nothing matches</span>
              &nbsp;
              <strong>
                '{searchTerm}'
              </strong>
            </h3>
            <div>
              To help with your search why not try:
              <br />
              <br />
              <ul>
                <li>
                  Checking your spelling
                </li>
                <li>
                  Using less words
                </li>
                <li>
                  Try using a different search term
                </li>
              </ul>
            </div>
          </div>
        }
        {!!filteredProducts.length &&
          <div>
            <ProductsGrid products={filteredProducts}/>
          </div>
        }
      </Content>
    </Layout>
  );
}
