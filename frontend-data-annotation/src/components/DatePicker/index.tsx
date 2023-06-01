import { DatePicker, DatePickerProps } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';
import moment from 'moment';
import { useCallback, useMemo } from 'react';

type Props = Omit<DatePickerProps, 'value' | 'onChange'> & {
  value?: number;
  chooseBeforeDate?: boolean;
  onChange?: (value?: number) => void;
};

const suffixIcon = <span className="iconfont icon-riqi"></span>;

const Comp: React.FC<Props> = ({
  value,
  chooseBeforeDate,
  onChange,
  ...props
}) => {
  const dateValue = useMemo(() => {
    return value ? moment(new Date(value), 'YYYY-MM-DD') : null;
  }, [value]);

  const disabledDate: RangePickerProps['disabledDate'] = useCallback(
    (current: moment.Moment) => {
      if (chooseBeforeDate !== false) return false;
      if (current) return current.endOf('day').valueOf() < new Date().valueOf();
      return true;
    },
    [chooseBeforeDate],
  );

  const _onChange = (date: moment.Moment | null) => {
    onChange && onChange(date ? date.valueOf() : undefined);
  };

  return (
    <DatePicker
      suffixIcon={suffixIcon}
      format="YYYY/MM/DD"
      value={dateValue}
      onChange={_onChange}
      disabledDate={disabledDate}
      {...props}
    />
  );
};

export default Comp;
