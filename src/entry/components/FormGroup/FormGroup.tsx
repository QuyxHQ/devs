import { useState } from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { VscCopy } from "react-icons/vsc";
import { copyToClipboard } from "../../../utils/helpers";

const FormGroup = ({
  getter,
  setter,
  label,
  inputType,
  className,
  isPasswordField,
  required,
  placeholder,
  rows,
  readOnly,
}: FormGroupProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={label.split(" ").join("").toLowerCase()}>{label}</label>
      <div className="position-relative">
        {inputType == "textarea" ? (
          <textarea
            name={label.split(" ").join("").toLowerCase()}
            id={label.split(" ").join("").toLowerCase()}
            rows={rows}
            value={getter}
            placeholder={placeholder}
            onChange={(e) => setter(e.target.value)}
            required={required}
          />
        ) : (
          <input
            type={isPasswordField && open ? "text" : inputType}
            name={label.split(" ").join("").toLowerCase()}
            id={label.split(" ").join("").toLowerCase()}
            value={getter}
            placeholder={placeholder}
            onChange={(e) => setter(e.target.value)}
            required={required}
            readOnly={readOnly}
          />
        )}

        {readOnly ? (
          <div
            onClick={() => copyToClipboard(getter)}
            className="position-absolute copy d-flex align-items-center"
          >
            <VscCopy />
          </div>
        ) : null}

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
