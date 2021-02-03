import React from 'react';
import { graphql } from 'gatsby';
import {
  ImageGallery,
  Layout,
  ProductQuantityAdder,
  Button,
} from 'components';
import CartContext from 'context/CartContext';
import { navigate, useLocation } from '@reach/router';
import queryString from 'query-string';

import { Grid, SelectWrapper, Price } from './styles';

// Tagged template literal.
// This is a page query, because it's being exported as query.
// The results of page queries get dumped into the props.
export const query = graphql`
  query ProductQuery($shopifyId: String) {
    shopifyProduct(shopifyId: {eq: $shopifyId}) {
      ...ShopifyProductFields
    }
  }
`;

export default function ProductTemplate(props) {
  const { getProductById } = React.useContext(CartContext);
  const [product, setProduct] = React.useState(null);
  const [selectedVariant, setSelectedVariant] = React.useState(null);
  const { search, origin, pathname} = useLocation();
  const variantId = queryString.parse(search).variant;

  React.useEffect(() => {
    getProductById(props.data.shopifyProduct.shopifyId).then(result => {
      setProduct(result);
      setSelectedVariant(result.variants.find((v) => v.id === variantId) || result.variants[0]);
    });
  }, [getProductById, props.data.shopifyProduct.shopifyId, setProduct, variantId])

  const handleVariantChange = (e) => {
    const newSelectedVariant = product?.variants.find(v => v.id === e.target.value);
    setSelectedVariant(newSelectedVariant);
    navigate(`${origin}${pathname}?variant=${encodeURIComponent(newSelectedVariant.id)}`, {
      replace: true, // Change the URL without adding it to the browser history stack.
    });
  };

  return (
    <Layout>
      <Button onClick={() => navigate(-1)}>Back to products</Button>
      <Grid>
        <div>
          <h1>{props.data.shopifyProduct.title}</h1>
          <p>{props.data.shopifyProduct.description}</p>
          <p>{product?.availableForSale && !!selectedVariant && (
            <>
              {product?.variants.length > 1 && (
                <SelectWrapper>
                  <strong>Variant</strong>
                  { /* eslint-disable-next-line jsx-a11y/no-onchange */}
                  <select onChange={handleVariantChange} value={selectedVariant.id}>
                    {product?.variants.map((v) => (
                      <option key={v.id} value={v.id}>{v.title}</option>
                    ))}
                  </select>
                </SelectWrapper>
                )
              }
              {!!selectedVariant &&
                <>
                  <Price>CA${selectedVariant.price}</Price>
                  <ProductQuantityAdder
                    variantId={selectedVariant.id}
                    available={selectedVariant.available}
                  />
                </>
              }
            </>
          )}</p>
        </div>
        <div>
          <ImageGallery
            selectedVariantImageId={selectedVariant?.image.id}
            images={props.data.shopifyProduct.images}
          />
        </div>
      </Grid>
    </Layout>
  );
}
