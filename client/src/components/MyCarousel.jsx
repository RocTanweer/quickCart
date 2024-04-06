import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { NavLink } from "react-router-dom";

import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";

import { cld } from "../lib/cloudinaryInstance";
import { fill } from "@cloudinary/url-gen/actions/resize";

const MyCorousel = ({ products, cardComponent }) => {
  const CardComponent = cardComponent;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel responsive={responsive} draggable={false} swipeable={false}>
      {products &&
        products.map((product) => (
          <CardComponent key={product.id} productDetails={product} />
        ))}
    </Carousel>
  );
};

export default MyCorousel;
