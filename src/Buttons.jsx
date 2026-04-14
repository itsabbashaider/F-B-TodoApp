import Props from "prop-types";

function Buttons({ children, className = "", ...props }) {
  return (
    <button className={`btn ${className}`} {...props}>
      {children}
    </button>
  );
}
export default Buttons;