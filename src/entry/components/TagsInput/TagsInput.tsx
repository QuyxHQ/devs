import { useEffect, useState } from "react";
import { TbPlus, TbTrash } from "react-icons/tb";

const TagsInput = ({
  setter,
  getter,
  className,
  label,
  required,
  placeholder,
}: TagInputProps) => {
  const [value, setValue] = useState<string[]>(getter.split(","));

  useEffect(() => setter(value.join(",")), [value]);

  const addEntry = (entry: string) => {
    if (value[value.length - 1].length == 0) return;
    setValue([...value, entry]);
  };

  const removeEntry = (index: number) => {
    if (index == 0) return;

    const _value = [...value];
    _value.splice(index, 1);
    setValue(_value);
  };

  const updateEntry = (index: number, entry: string) => {
    const _value = [...value];
    _value[index] = entry;
    setValue(_value);
  };

  return (
    <div className={`${className} tags-input`}>
      <div className="title mb-2 pb-1 d-flex alifn-items-center justify-content-between">
        <p>{label}</p>

        <div onClick={() => addEntry("")}>
          <TbPlus />
        </div>
      </div>

      <div className="inputs-container d-flex flex-column">
        {value.map((item, index) => (
          <div
            className="inputs"
            key={`${label.split(" ").join("-").toLowerCase()}-${index}`}
          >
            <input
              type="text"
              required={index == 0 && required ? true : false}
              placeholder={placeholder ?? "type here..."}
              onChange={(e) => updateEntry(index, e.target.value)}
              value={item}
            />

            <TbTrash
              className={`icon ${index == 0 ? "disabled" : ""}`}
              onClick={() => removeEntry(index)}
              size={20}
              stroke="crimson"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsInput;
