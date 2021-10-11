import React, { useState } from "react";
import axios from "axios";
const imgbbUploader = require("imgbb-uploader");
const Image = (props) => {
  const [img, setImg] = useState();

  const imgUrl = "https://api.imgbb.com/1/upload";
  const handleSubmit = (e) => {
    e.preventDefault();
    let body = new FormData();
    body.set("key", "4aaacc4e0a5212ef5c3f9d2facd40d64");
    body.append("image", img);
    axios({
      method: "post",
      url: imgUrl,
      data: body,
    })
      .then((response) => {
        props.getPhotoData(response.data.data.thumb.url);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="image-upload">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          id="input_img"
          onChange={(e) => {
            setImg(e.target.files[0]);
          }}
          accept="image/*"
        />
        <button type="submit">upload</button>
      </form>
    </div>
  );
};

export default Image;
