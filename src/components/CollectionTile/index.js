
import React from 'react';
import { CollectionTileWrapper, CollectionTileContent, Title, Description } from './styles';
import BackgroundImage from 'gatsby-background-image';
import { StyledLink } from '../StyledLink';

export function CollectionTile({ description, title, backgroundImage, sale, destination }) {
  return (
    <CollectionTileWrapper>
      <BackgroundImage fluid={backgroundImage} />
      <CollectionTileContent>
        <div>
          <Title sale={sale}>{title}</Title>
          <Description sale={sale}>{description}</Description>
          <StyledLink to={destination}>Shop Now</StyledLink>
        </div>
      </CollectionTileContent>
    </CollectionTileWrapper>
  );
}
