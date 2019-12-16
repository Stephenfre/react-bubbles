import React, { useState, useEffect } from "react";
// import axios from "axios";
import { axiosWithAuth } from "../axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    axiosWithAuth()
      .get("/colors")
      .then(res => {
        console.log("BubblePage.js: we got the treasure", res);
        setColorList(res.data);
      })
      .catch(err =>
        console.log("BubblePage.js: there's no treasure here ", err)
      );
  }, []);

  return (
    <>
      <ColorList
        colors={colorList}
        updateColors={setColorList}
        addColors={setColorList}
      />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
