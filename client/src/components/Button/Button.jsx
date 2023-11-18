import styles from "./Button.module.scss";
import PropTypes from "prop-types";

const Button = ({
  text,
  onClick,
  type,
  disabled,
  className,
  style,
  icon,
  iconPosition,
}) => {
  return (
    <div className={styles.btn}>
      <button
        className={className}
        style={style}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {icon && iconPosition === "left" && icon}
        {text}
        {icon && iconPosition === "right" && icon}
      </button>
    </div>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  icon: PropTypes.element,
  iconPosition: PropTypes.string,
};

export default Button;
