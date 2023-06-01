import React, {useEffect, useState} from 'react';
import {Checkbox} from 'antd';

interface OptionProps {
  label: string;
  value: string;
  disabled?: boolean;
}

type CheckboxGroupProps = {
  options: OptionProps[];
  defaultValue?: string | string[];
  onChange?: (values: string[], options?: any[]) => void;
  [key: string]: any;
};

const Comp: React.FC<CheckboxGroupProps> = ({
  options,
  onChange,
  defaultValue,
}) => {
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
    if (typeof defaultValue === 'string') {
      setValues([defaultValue]);
    } else if (defaultValue) {
      setValues(defaultValue);
    }
  }, [defaultValue]);

  const checkboxChange = (check: boolean, value: string) => {
    const thisValues = check
      ? [...values, value]
      : values.filter((v) => v !== value);

    const valueOptions = options.filter((v) => thisValues.includes(v.value));

    setValues(thisValues);
    onChange?.(thisValues, valueOptions);
  };

  return (
    <div className="dry-checkbox-group">
      {options.map((item, index) => (
        <Checkbox
          className="dry-checkbox"
          key={index}
          checked={values.includes(item.value)}
          onChange={(e) => {
            checkboxChange(e.target.checked, item.value);
          }}>
          <span className="ellipsis">{item.label}</span>
        </Checkbox>
      ))}
    </div>
  );
};

export default Comp;
