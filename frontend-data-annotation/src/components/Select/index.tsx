import { Select, SelectProps } from 'antd';
import React, { useMemo } from 'react';

type DrySelectProps = SelectProps & {
  options?: {
    value: string | number | undefined;
    label: string;
  }[];
};

const defaultProps = {
  allowClear: true,
  placeholder: '请选择',
  style: { width: '100%' },
};

const DrySelect: React.FC<DrySelectProps> = ({ options, ...props }) => {
  const suffixIcon = useMemo(
    () => <span className="iconfont icon-xiala"></span>,
    [],
  );
  return (
    <Select
      showSearch
      suffixIcon={suffixIcon}
      optionFilterProp="children"
      {...defaultProps}
      {...props}
    >
      {(options || []).map(({ value, label, ...props }) => (
        <Select.Option key={value} value={value} {...props}>
          {label}
        </Select.Option>
      ))}
    </Select>
  );
};

export default DrySelect;
