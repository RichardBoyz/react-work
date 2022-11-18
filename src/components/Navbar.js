import React from "react";

function Navbar(props) {
  if (props.backHandler) props.backHandler();

  const signOut = () => {
    if (props.signOut) props.signOut();
  };
  return (
    <div className="navbar">
      <div onClick={signOut}>登出</div>
      <div>不知道</div>
    </div>
  );
}

export default Navbar;
