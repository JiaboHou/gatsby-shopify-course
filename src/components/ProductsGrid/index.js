import React from 'react';

import { ProductTile } from '../ProductTile';
import { ProductsGridWrapper } from './styles';

export function ProductsGrid({ products }) {
  return (
    <ProductsGridWrapper>
      {products.map(p => (
        <ProductTile
          key={p.shopifyId}
          title={p.title}
          imageFluid={p.images[0].localFile.childImageSharp.fluid}
          description={p.description}
          minPrice={p.priceRange.minVariantPrice.amount}
          handle={p.handle}
        />
      ))}

    </ProductsGridWrapper>
  )
}
