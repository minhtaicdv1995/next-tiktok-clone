import axios from "axios";
import imageUrlBuilder from "@sanity/image-url";
import userx from "./client";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response: any, addUser: any) => {
  var base64Url = response.credential.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  const { name, picture, sub } = JSON.parse(jsonPayload);

  const user = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  };

  const doc = {
    _type: "photo",
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: picture,
      },
    },
  };
  //   userx.create(doc).then(() => {});
  //   userx.assets
  //     .upload("image", picture)
  //     .then(() => {
  //       console.log("Done!");
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //       return { statusCode: 400 };
  //     });
  //   userx.create(user).then((response) => {
  //     console.log(response);

  //     return userx
  //       .patch(response._id)
  //       .set({
  //         image: {
  //           _type: "image",
  //           asset: {
  //             _type: "reference",
  //             _ref: response._id,
  //           },
  //         },
  //       })
  //       .commit();
  //   });

  addUser(user);
  await axios.post(`${BASE_URL}/api/auth`, user);
};
