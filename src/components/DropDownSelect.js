import React, { useState } from "react";
import OutsideDetectField from "../hooks/useOutsideDetect";

function DropDownSelect(props) {
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const { value, setValue, options } = props;
  const handleClickOption = (value) => {
    setValue(value);
    setIsOpenOptions(!isOpenOptions);
  };
  const handleClickOpenOtions = () => {
    setIsOpenOptions(!isOpenOptions);
  };

  const handleClickOutside = () => {
    if (isOpenOptions) setIsOpenOptions(false);
  };

  const dropOptions = () => {
    // return (
    //   <div
    //     className={isOpenOptions ? "drop-down-options-layout" : "off-screen"}
    //   >
    //     {options.map((value, index) => (
    //       <div
    //         className="drop-down-option"
    //         key={index}
    //         onClick={() => handleClickOption(value)}
    //       >
    //         {value}
    //       </div>
    //     ))}
    //   </div>
    // );
    return (
      <div className="drop-down-body" onClick={handleClickOpenOtions}>
        <div className="drop-down-display"> {value}</div>

        <div
          className={isOpenOptions ? "drop-down-options-layout" : "off-screen"}
        >
          {options.map((value, index) => (
            <div
              className="drop-down-option"
              key={index}
              onClick={() => handleClickOption(value)}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // return (
  //   <div className="drop-down-body" onClick={handleClickOpenOtions}>
  //     <div className="drop-down-display"> {value}</div>
  //     <OutsideDetectField
  //       childrenField={dropOptions()}
  //       actionOfClickOutside={handleClickOpenOtions}
  //     />
  //     {/* <div
  //       className={isOpenOptions ? "drop-down-options-layout" : "off-screen"}
  //     >
  //       {options.map((value, index) => (
  //         <div
  //           className="drop-down-option"
  //           key={index}
  //           onClick={() => handleClickOption(value)}
  //         >
  //           {value}
  //         </div>
  //       ))}
  //     </div> */}
  //   </div>
  // );
  return (
    <OutsideDetectField
      childrenField={dropOptions()}
      actionOfClickOutside={handleClickOutside}
    ></OutsideDetectField>
  );
}

export default DropDownSelect;
