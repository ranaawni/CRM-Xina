import React from "react";

import "../../App.css";

const modal = (props) => (
  <div className="modal">
    <header className="modal__header">
      <h1>{props.service}</h1>
    </header>
    <section className="modal__content">{props.children}</section>
    <section className="modal__actions">
      {props.canCancle && (
        <button className="btn" onClick={props.onCancle}>
          Cancle
        </button>
      )}
      {props.canConfirm && (
        <button className="btn" onClick={props.onConfirm}>
          Confirm
        </button>
      )}
    </section>
  </div>
);

export default modal;
