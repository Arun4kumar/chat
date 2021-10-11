import React from "react";
import ReactDom from "react-dom";
import classes from "./Modal.module.css";
const Backdrop = (props) => {
  return <div onClick={() => props.show()} className={classes.backdrop}></div>;
};
const ModelOverlay = (props) => {
  return (
    <div className="alignCard">
      <div className={`${classes.modal} `}>
        <div className={`${classes.content} update-card`}>{props.children}</div>
      </div>
    </div>
  );
};
const Model = (props) => {
  const overlays = document.getElementById("overlays");

  return (
    <>
      {ReactDom.createPortal(<Backdrop show={props.show} />, overlays)}
      {ReactDom.createPortal(
        <ModelOverlay>{props.children}</ModelOverlay>,
        overlays
      )}
    </>
  );
};

export default Model;
