import { Cloudinary } from "@cloudinary/url-gen";

export const cn = "quickcartexpress";
export const uploadPreset = "qcbase";

export const cld = new Cloudinary({
  cloud: {
    cloudName: cn,
  },
});
