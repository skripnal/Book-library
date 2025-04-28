import styles from "./Button.module.scss";

const Button = ({ onClick, type = "button", disabled = false, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={styles.button}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
