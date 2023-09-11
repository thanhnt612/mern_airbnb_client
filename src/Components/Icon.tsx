import * as React from "react";
export const LoadingIcon = ({
  className,
  ...rest
}: {
  className: string;
}): JSX.Element => {
  return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
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
};

export const LoadingPage = ({
  className,
  ...rest
}: {
  className: string;
}): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={50}
      height={50}
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
};

export const LoadingPageMobile = ({
  className,
  ...rest
}: {
  className: string;
}): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
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
};
