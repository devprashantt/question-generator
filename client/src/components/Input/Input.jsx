import styles from "./Input.module.scss";
import PropTypes from "prop-types";

const Input = ({ type, name, value, onChange }) => {
  return (
    <div className={styles.input}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder="Enter here..."
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
