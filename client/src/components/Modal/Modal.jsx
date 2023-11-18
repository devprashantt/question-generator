import styles from "./Modal.module.scss";
import PropTypes from "prop-types";
import { useRef } from "react";

const Modal = ({ isModalActive, setIsModalActive }) => {
  const modalRef = useRef();

  const handleOutsideClick = () => {
    // IF USER CLICK OUTSIDE CLOSE THE MODAL/SET MODAL STATE INACTIVE
  };

  return (
    isModalActive && (
      <div
        className={styles.body}
        ref={modalRef}
        onClick={() => {
          handleOutsideClick;
        }}
      >
        <div className={styles.modal}>
          <h2>Are you sure you want to delete this question?</h2>
          <div
            onClick={() => {
              setIsModalActive(false);
            }}
          >
            Close
          </div>
        </div>
      </div>
    )
  );
};

Modal.propTypes = {
  isModalActive: PropTypes.bool,
  setIsModalActive: PropTypes.func,
};

export default Modal;
