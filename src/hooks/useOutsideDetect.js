import { useEffect, useRef } from "react";

function useOutsideDetect(ref, actionOfClickOutside) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        console.log("asasa");
        actionOfClickOutside();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, actionOfClickOutside]);

  return;
}

export default function OutsideDetectField(props) {
  const wrapperRef = useRef(null);
  const { childrenField, actionOfClickOutside } = props;
  useOutsideDetect(wrapperRef, actionOfClickOutside);
  return <div ref={wrapperRef}>{childrenField}</div>;
}
