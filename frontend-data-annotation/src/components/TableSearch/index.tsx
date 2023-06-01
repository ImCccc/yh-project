import { CloseCircleFilled } from '@ant-design/icons';
import { Button, DatePicker, Input } from 'antd';
import classNames from 'classnames';
import moment from 'moment';
import { useCallback, useEffect, useRef, useState } from 'react';
import Select from '../Select';
import styles from './index.module.less';

export type OptionsProps = {
  value: string | number;
  label: string;
}[];

export type CompTypes = 'Input' | 'Select' | 'DatePicker' | 'RangePicker';

type RangeValue = [moment.Moment | null, moment.Moment | RangeValue] | null;

export type FieldsItemProps = {
  label: string;
  key: string | string[];
  type?: CompTypes;
  defaultValue?: any;
  placeholder?: string | string[];
  options?: OptionsProps;
  compProps?: Record<string, any>;
};

export type FieldsProps = FieldsItemProps[];
export type OnChangeProps = (key: string, value: any, values?: any) => void;
export type OnSearchProps = (data: Record<string, any>) => void;

export type CompProps = {
  fields: FieldsProps; // 字段配置
  onChange?: OnChangeProps; // 字段值发生变化调用该方法
  onSearch?: OnSearchProps; // 点击查询调用该方法
  onReset?: OnSearchProps; // 点击重置调用该方法
  renderButtons?: JSX.Element; // 除了重置, 查询之外的其他按钮
  className?: string;
};

const Search: React.FC<CompProps> = ({
  className,
  fields,
  onChange,
  onSearch,
  onReset,
  renderButtons,
}) => {
  const [values, setValues] = useState<Record<string, any>>({});

  const defaultValues = useRef<any>({});

  // 初始化重置的参数
  useEffect(() => {
    defaultValues.current = fields.reduce((data: any, cur) => {
      const { type, key, compProps } = cur;
      if (type === 'DatePicker' || type === 'RangePicker') {
        data[key.toString()] = null;
      } else if (compProps && compProps.mode === 'multiple') {
        data[key.toString()] = [];
      } else {
        data[key.toString()] = '';
      }
      return data;
    }, {});
  }, [fields]);

  // 根据 fields 的, 初始化组件的value
  useEffect(() => {
    const initData = fields.reduce((data: any, cur) => {
      const { defaultValue, type, key } = cur;

      if (type === 'DatePicker') {
        data[key.toString()] = defaultValue
          ? moment(new Date(defaultValue), 'YYYY-MM-DD')
          : null;
        return data;
      }

      if (type === 'RangePicker') {
        if (defaultValue && defaultValue.length === 2) {
          if (key instanceof Array) {
            data[key[0]] = moment(new Date(defaultValue[0]), 'YYYY-MM-DD');
            data[key[1]] = moment(new Date(defaultValue[0]), 'YYYY-MM-DD');
          } else {
            data[key.toString()] = [
              moment(new Date(defaultValue[0]), 'YYYY-MM-DD'),
              moment(new Date(defaultValue[1]), 'YYYY-MM-DD'),
            ];
          }
        } else {
          if (key instanceof Array) {
            data[key[0]] = '';
            data[key[1]] = '';
          } else {
            data[key.toString()] = [];
          }
        }
        return data;
      }
      data[key.toString()] = defaultValue === 0 ? 0 : defaultValue || '';
      return data;
    }, {});

    setValues(initData);
  }, [fields]);

  // 输入框输入, 下拉框选中后触发
  const _onChange = (value: string | number, key: string, search?: boolean) => {
    const data = { ...values, [key]: value };
    setValues(data);
    if (onChange) onChange(key, value);
    if (search) {
      const searchData = getParams(data);
      onSearch && onSearch(searchData);
    }
  };

  // 日期选择器, 选中后触发
  const _onDateChange = (date: moment.Moment | null, key: string) => {
    const data = { ...values, [key]: date };
    setValues(data);
    if (!onChange) return;
    onChange(key, date && date.valueOf());
  };

  // 日期范围选择器, 选中后触发
  const _onRangeChange = (date: RangeValue, key: string | string[]) => {
    if (key instanceof Array && date !== null) {
      const data = { ...values, [key[0]]: date[0], [key[1]]: date[1] };
      setValues(data);
    } else {
      const data = { ...values, [key.toString()]: date };
      setValues(data);
    }
    if (!onChange) return;

    const value: any[] = [];
    if (date) {
      value[0] = date[0] ? date[0].valueOf() : null;
      value[1] = date[1] ? date[1].valueOf() : null;
    }

    onChange(key.toString(), value);
  };

  const getParams = useCallback((values: Record<string, any>) => {
    return Object.keys(values).reduce((data, key) => {
      const value = values[key];
      if (value instanceof moment) {
        // 日期
        data[key] = (value as moment.Moment).valueOf();
      } else if (value instanceof Array && value[0] instanceof moment) {
        // 日期范围
        data[key] = [
          (value[0] as moment.Moment).valueOf(),
          (value[1] as moment.Moment).valueOf(),
        ];
      } else if (value instanceof Array) {
        // 多选
        if (value[0] !== undefined) data[key] = [...value];
      } else if (value || value === 0) {
        // 其他
        data[key] = value;
      }
      return data;
    }, {});
  }, []);

  // 点击查询
  const _onSearch = () => {
    const searchData = getParams(values);
    onSearch && onSearch(searchData);
  };

  const _getComp = (field: FieldsItemProps) => {
    const { type, key, placeholder, options, compProps } = field;

    const props: Record<string, any> = {
      ...compProps,
      placeholder,
      allowClear: true,
      value: values[key.toString()],
      className: styles.comp,
    };

    if (type === 'RangePicker') {
      return (
        <DatePicker.RangePicker
          {...props}
          className={styles.range}
          onChange={(date) => _onRangeChange(date, key)}
        />
      );
    }

    if (type === 'DatePicker') {
      if (props.placeholder === undefined) {
        props.placeholder = `请选择${field.label}`;
      }

      return (
        <DatePicker
          {...props}
          onChange={(date) => _onDateChange(date, key.toString())}
        />
      );
    }

    if (type === 'Select') {
      if (props.value === '' || props.value === undefined) {
        props.value = null;
      }

      if (props.placeholder === undefined) {
        props.placeholder = `请选择${field.label}`;
      }

      return (
        <Select
          {...props}
          options={options}
          onChange={(value) => _onChange(value, key.toString(), true)}
        ></Select>
      );
    }

    if (props.placeholder === undefined) {
      props.placeholder = `请输入${field.label}`;
    }

    const allowClear = {
      clearIcon: (
        <CloseCircleFilled
          onClick={() => {
            const searchData = getParams({ ...values, [key.toString()]: '' });
            onSearch && onSearch(searchData);
          }}
        />
      ),
    };

    const suffixIcon = !props.value && (
      <span className="iconfont icon-Shape"></span>
    );

    return (
      <Input
        suffix={suffixIcon}
        {...props}
        allowClear={allowClear}
        onPressEnter={_onSearch}
        onChange={(e) => _onChange(e.target.value, key.toString())}
      />
    );
  };

  // 点击重置
  const _onReset = () => {
    setValues({ ...defaultValues.current });
    if (!onReset) return;
    onReset({ ...defaultValues.current });
  };

  return (
    <div className={classNames(styles.layout, className)}>
      <div className={styles.field}>
        {fields.map((field) => {
          return (
            <div key={field.key.toString()} className={styles.item}>
              {field.label && (
                <span className={styles.label}>{field.label}:</span>
              )}
              {_getComp(field)}
            </div>
          );
        })}
      </div>
      <div className={styles.buttonwrap}>
        {onReset && <Button onClick={_onReset}>重置</Button>}
        {onSearch && (
          <Button type="primary" onClick={_onSearch}>
            查询
          </Button>
        )}
        {renderButtons}
      </div>
    </div>
  );
};

export default Search;
