import styles from "./Dropdown.module.scss";
import PropTypes from "prop-types";

const Dropdown = ({
  data,
  placeholder,
  value,
  onChange,
  onClick,
  onBlur,
  onFocus,
  onKeyDown,
  onKeyUp,
  onKeyPress,
  onScroll,
  onWheel,
  onCopy,
}) => {
  return (
    <div className={styles.dropdown}>
      <select
        value={value}
        onChange={onChange}
        onClick={onClick}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onKeyPress={onKeyPress}
        onScroll={onScroll}
        onWheel={onWheel}
        onCopy={onCopy}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {data.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  data: PropTypes.array,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyPress: PropTypes.func,
  onScroll: PropTypes.func,
  onWheel: PropTypes.func,
  onCopy: PropTypes.func,
};

export default Dropdown;
