import * as React from "react";
export const LoadingIcon = ({ className, ...rest }:any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={200}
    height={200}
    preserveAspectRatio="xMidYMid"
    style={{
      margin: "auto",
      background: "#f1f2f3",
      display: "block",
      shapeRendering: "auto",
    }}
    viewBox="0 0 100 100"
    {...rest}
    className={`${className}`}
  >
    <circle
      cx={50}
      cy={50}
      r={35}
      fill="none"
      stroke="#f3dcb2"
      strokeDasharray="164.93361431346415 56.97787143782138"
      strokeWidth={15}
    >
      <animateTransform
        attributeName="transform"
        dur="1s"
        keyTimes="0;1"
        repeatCount="indefinite"
        type="rotate"
        values="0 50 50;360 50 50"
      />
    </circle>
  </svg>
);
export const LoadingPage = ({ className, ...rest }:any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={200}
    height={200}
    preserveAspectRatio="xMidYMid"
    style={{
      margin: "auto",
      background: "#f1f2f3",
      display: "block",
      shapeRendering: "auto",
    }}
    viewBox="0 0 100 100"
    {...rest}
    className={`${className}`}
  >
    <circle
      cx={50}
      cy={50}
      r={35}
      fill="none"
      stroke="#f90013"
      strokeDasharray="164.93361431346415 56.97787143782138"
      strokeWidth={15}
    >
      <animateTransform
        attributeName="transform"
        dur="1s"
        keyTimes="0;1"
        repeatCount="indefinite"
        type="rotate"
        values="0 50 50;360 50 50"
      />
    </circle>
  </svg>
);
// export const LoadingPage = ({ className, ...rest }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={200}
//     height={200}
//     preserveAspectRatio="xMidYMid"
//     style={{
//       margin: "auto",
//       background: "#ddd",
//       display: "block",
//       shapeRendering: "auto",
//     }}
//     viewBox="0 0 100 100"
//     {...rest}
//     className={`${className}`}
//   >
//     <circle
//       cx={50}
//       cy={50}
//       r={35}
//       fill="none"
//       stroke="#fff"
//       strokeDasharray="164.93361431346415 56.97787143782138"
//       strokeWidth={15}
//     >
//       <animateTransform
//         attributeName="transform"
//         dur="1s"
//         keyTimes="0;1"
//         repeatCount="indefinite"
//         type="rotate"
//         values="0 50 50;360 50 50"
//       />
//     </circle>
//   </svg>
// );