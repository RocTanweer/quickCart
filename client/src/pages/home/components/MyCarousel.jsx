import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";

import { cld } from "../../../lib/cloudinaryInstance";
import { fill } from "@cloudinary/url-gen/actions/resize";

const MyCorousel = ({ newProducts }) => {
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
      {newProducts &&
        newProducts.map((np) => (
          <Card key={np.id}>
            <CardActionArea>
              <CardMedia
                component="img"
                sx={{ width: "300px", height: "300px" }}
                image={cld
                  .image(np.image)
                  .resize(fill().width(300).height(300))
                  .toURL()}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {np.name}
                </Typography>

                <Typography>{`${np.description.slice(0, 100)}...`}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
    </Carousel>
  );
};

export default MyCorousel;
