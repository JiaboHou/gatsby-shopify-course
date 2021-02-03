const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};

// Gatsby will inject into this function various helpers to help generate pages.
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const { data } = await graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            shopifyId
            handle
          }
        }
      }
    }
  `);

  // Create a product page for each of our Shopify products.
  data.allShopifyProduct.edges.forEach(({node}) => {
    createPage({
      path: `products/${node.handle}`,
      context: {
        shopifyId: node.shopifyId,
      },
      component: path.resolve('./src/templates/ProductTemplate/index.js'),
    });
  });
};
