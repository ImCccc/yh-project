import React, {useCallback} from 'react';
import {Select, SelectProps, Tag} from 'antd';

type DrySelectProps = SelectProps & {
  options: any[];
};

const DrySelect: React.FC<DrySelectProps> = ({options, ...props}) => {
  const filterOption = useCallback((inputValue, option) => {
    const label = option?.children;
    if (typeof label === 'string') {
      return (label as string).toLowerCase().includes(inputValue.toLowerCase());
    }
    return false;
  }, []);

  const tagRender = useCallback(
    (props) => (
      <Tag closable={props.closable} onClose={props.onClose}>
        {props.label[1]}
      </Tag>
    ),
    []
  );

  return (
    <Select
      allowClear
      mode="multiple"
      placeholder="请选择"
      style={{width: '100%'}}
      dropdownClassName="dry-dropdown"
      tagRender={tagRender}
      filterOption={filterOption}
      {...props}>
      {options.map((v, index) => (
        <Select.Option key={index} value={v.value}>
          {props.mode && <span className="ant-checkbox-inner"></span>}
          <span className="ant-select-item-option-label">{v.label}</span>
        </Select.Option>
      ))}
    </Select>
  );
};

export default DrySelect;
