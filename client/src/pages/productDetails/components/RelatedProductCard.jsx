import { NavLink } from "react-router-dom";

import {
  Card,
  CardContent,
  CardMedia,
  Button,
  CardActionArea,
  CardActions,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { cld } from "../../../lib/cloudinaryInstance";
import { fill } from "@cloudinary/url-gen/actions/resize";

import { formatValueLabel } from "../../../utils/function";

const RelatedProductCard = ({ productDetails }) => {
  return (
    <Card sx={{ mr: 2 }}>
      <CardActionArea component={NavLink} to={`/products/${productDetails.id}`}>
        <CardMedia
          component="img"
          image={cld
            .image(productDetails.image)
            .resize(fill().width(250).height(220))
            .toURL()}
          height={"220px"}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ height: "64px" }}
          >
            {productDetails.name.length > 34
              ? `${productDetails.name.slice(0, 32)}...`
              : productDetails.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Typography sx={{ fontWeight: "bold" }}>
          {formatValueLabel(productDetails.unit_price)}
        </Typography>
        <Button
          size="small"
          variant="outlined"
          endIcon={<AddShoppingCartIcon />}
        >
          Add
        </Button>
      </CardActions>
    </Card>
  );
};

export default RelatedProductCard;
