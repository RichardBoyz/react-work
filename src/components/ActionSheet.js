import React from "react";

function ActionSheet({ items, closeAction }) {
  return (
    <div className="action-sheet__wrapper" onClick={closeAction}>
      <div className="action-sheet__container">{items}</div>
    </div>
  );
}

export default ActionSheet;
