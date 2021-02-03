import React from 'react';
import Image from 'gatsby-image';

import { ImageGalleryWrapper } from './styles';
import ImageThumbnail from './ImageThumbnail';

export function ImageGallery({ images, selectedVariantImageId }) {
  const [activeImageThumbnail, setActiveImageThumbnail] = React.useState(images.find((i) => i.id === selectedVariantImageId) || images[0]);
  const handleClick = (image) => {
    setActiveImageThumbnail(image);
  };

  React.useEffect(() => {
    setActiveImageThumbnail(images.find((i) => i.id === selectedVariantImageId) || images[0]);
  }, [selectedVariantImageId, images, setActiveImageThumbnail]);

  return (
    <ImageGalleryWrapper>
      <div>
        <Image fluid={activeImageThumbnail.localFile.childImageSharp.fluid} />
      </div>
      <div>
        {images.map(image => {
          return <ImageThumbnail
            key={image.id}
            isActive={activeImageThumbnail.id === image.id}
            image={image}
            onClick={handleClick}
          />;
        })}
      </div>
    </ImageGalleryWrapper>
  );
};
