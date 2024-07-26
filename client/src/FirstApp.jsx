import PropTypes from "prop-types";

export const FirstApp = ({ title, subtitle }) => {
  return (
    <>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </>
  );
};

FirstApp.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.number.isRequired,
};

// FirstApp.defaultProps = {
//   title: "Default Title",
//   subtitle: 0,
// };
