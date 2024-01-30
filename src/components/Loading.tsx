import React from "react";
import { RiLoaderFill } from "react-icons/ri";

const Loading: React.FC = () => (
  <div className="loading my-3">
    <RiLoaderFill className="loadingIcon" />
    <p>loading...</p>
  </div>
);

export default Loading;
