import React from 'react';
import { Layout, SEO, HomePageCollectionsGrid, FeaturedProducts } from 'components';
import ProductContext from 'context/ProductContext';

const IndexPage = () => {
  const { collections } = React.useContext(ProductContext);
  console.log(collections);

  return (
    <Layout>
      <HomePageCollectionsGrid collections={collections.filter(collection => collection.title != 'Featured Hats')}/>
      {!!collections.find(c => c.title === 'Featured Hats') && <FeaturedProducts />}
    </Layout>
  );
};

export default IndexPage;
