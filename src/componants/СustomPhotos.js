import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";
import { InputGroup } from "@blueprintjs/core";
import { getImageSize } from "polotno/utils/image";

import { SectionTab } from "polotno/side-panel";
import { ImagesGrid } from "polotno/side-panel/images-grid";
// import our own icon
import MdPhotoLibrary from "@meronex/icons/md/MdPhotoLibrary";

export const PhotosPanel = observer(({ store }) => {
  const [images, setImages] = React.useState([]);

  async function loadImages() {
    // here we should implement your own API requests
    setImages([]);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // for demo images are hard coded
    // in real app here will be something like JSON structure
    setImages([
      { url: "./images/carlos-lindner-zvZ-HASOA74-unsplash.jpg" },
      { url: "./images/guillaume-de-germain-TQWJ4rQnUHQ-unsplash.jpg" },
    ]);
  }

  React.useEffect(() => {
    loadImages();
  }, []);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <InputGroup
        leftIcon="search"
        placeholder="Search..."
        onChange={(e) => {
          loadImages();
        }}
        style={{
          marginBottom: "20px",
        }}
      />
      <p>Demo images: </p>
      {/* you can create yur own custom component here */}
      {/* but we will use built-in grid component */}
      <ImagesGrid
        images={images}
        getPreview={(image) => image.url}
        onSelect={async (image) => {
          const { width, height } = await getImageSize(image.url);
          store.activePage.addElement({
            type: "image",
            src: image.url,
            width,
            height,
          });
        }}
        rowsNumber={2}
        isLoading={!images.length}
        loadMore={false}
      />
    </div>
  );
});

// define the new custom section
export const СustomPhotos = {
  name: "custome photos",
  Tab: (props) => (
    <SectionTab name="custome Photos" {...props}>
      <MdPhotoLibrary />
    </SectionTab>
  ),
  // we need observer to update component automatically on any store changes
  Panel: PhotosPanel,
};
