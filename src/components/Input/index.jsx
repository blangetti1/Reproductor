import { useId } from "react";
import styles from "./Input.module.css";

const Input = ({
  label,
  id,
  name,
  errorMessage,
  isValid = true, // Por defecto, el input se considera válido
  touched = false, // Por defecto, no ha sido tocado
  leftIcon,
  rightIcon,
  wrapperClassName,
  labelClassName,
  inputClassName,
  className, // className se refiere a la clase del input base por InputHTMLAttributes
  ...rest // Captura el resto de las props estándar de un input HTML (type, value, onChange, placeholder, etc.)
}) => {
  // Genera un ID único si no se proporciona uno, útil para la accesibilidad del label
  const uniqueId = useId();
  const inputId = id || uniqueId;

  // Determina el estado de error visual
  const hasError = !isValid && touched && errorMessage;

  return (
    <div className={`${styles.inputWrapper} ${wrapperClassName || ""}`}>
      {label && (
        <label
          htmlFor={inputId}
          className={`${styles.label} ${labelClassName || ""} ${
            hasError ? styles.labelError : ""
          }`}
        >
          {label}
        </label>
      )}
      <div
        className={`${styles.inputContainer} ${
          hasError ? styles.inputContainerError : ""
        }`}
      >
        {leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
        <input
          id={inputId}
          name={name}
          className={`${styles.input} ${inputClassName || ""} ${
            className || ""
          } ${hasError ? styles.inputError : ""}`}
          aria-invalid={!isValid} // Atributo ARIA para indicar si el valor es inválido
          aria-describedby={hasError ? `${inputId}-error` : undefined} // Enlaza con el mensaje de error
          {...rest} // Pasa todas las props restantes al elemento input
        />
        {rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
      </div>
      {hasError && (
        <p
          id={`${inputId}-error`}
          className={styles.errorMessage}
          role="alert"
          aria-live="polite"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Input;
