import { useState } from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

const FormGroup = ({
  getter,
  setter,
  label,
  inputType,
  className,
  isPasswordField,
  required,
  placeholder,
}: FormGroupProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={label.split(" ").join("").toLowerCase()}>{label}</label>
      <div className="position-relative">
        <input
          type={isPasswordField && open ? "text" : inputType}
          name={label.split(" ").join("").toLowerCase()}
          id={label.split(" ").join("").toLowerCase()}
          value={getter}
          placeholder={placeholder}
          onChange={(e) => setter(e.target.value)}
          required={required}
        />
        {isPasswordField ? (
          open ? (
            <RxEyeOpen
              onClick={() => setOpen(false)}
              className="position-absolute icon"
              size={15}
            />
          ) : (
            <RxEyeClosed
              onClick={() => setOpen(true)}
              className="position-absolute icon"
              size={15}
            />
          )
        ) : null}
      </div>
    </div>
  );
};

export default FormGroup;
