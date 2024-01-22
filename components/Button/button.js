import styles from "./styles/button.module.scss";

const Button = ({ type = "click", children, className, ...otherProps }) => {
  const combinedClassName = `${styles.btn} ${className || ""}`;

  return (
      <button className={combinedClassName} type={type} {...otherProps}>
        {children}
      </button>
  );
};

export default Button;
