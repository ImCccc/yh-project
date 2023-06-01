import { Tabs } from 'antd';
import { ReactNode, useCallback, useMemo, useState } from 'react';

type ItemProps = {
  key?: string;
  label: string;
  children: ReactNode;
};

type Props = {
  items: ItemProps[];
  onChange?: (key: string) => void;
};

const Comp: React.FC<Props> = ({ items, onChange }) => {
  const [activeKey, setActiveKey] = useState<string>('0');

  const thisItems = useMemo<Required<ItemProps>[]>(
    () => items.map((item, index) => ({ ...item, key: index + '' })),
    [items],
  );

  const _onChange = useCallback(
    (key: string) => {
      setActiveKey(key);
      if (onChange) {
        onChange(key);
      }
    },
    [onChange],
  );

  return (
    <Tabs
      className="page-tabs"
      onChange={_onChange}
      items={thisItems}
      activeKey={activeKey}
    />
  );
};

export default Comp;
