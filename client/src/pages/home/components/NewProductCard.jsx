import "react-multi-carousel/lib/styles.css";
import { NavLink } from "react-router-dom";

import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";

import { cld } from "../../../lib/cloudinaryInstance";
import { fill } from "@cloudinary/url-gen/actions/resize";

const NewProductCard = ({ productDetails }) => {
  return (
    <Card sx={{ mr: 2 }}>
      <CardActionArea component={NavLink} to={`/products/${productDetails.id}`}>
        <CardMedia
          component="img"
          sx={{ width: "300px", height: "300px" }}
          image={cld
            .image(productDetails.image)
            .resize(fill().width(300).height(300))
            .toURL()}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {productDetails.name}
          </Typography>

          <Typography>{`${productDetails.description.slice(
            0,
            100
          )}...`}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NewProductCard;
