import DryTag from '@/components/DryTag';
import { CaretUpOutlined, SearchOutlined } from '@ant-design/icons';
import { Empty, Input } from 'antd';
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Dropdown.module.less';

type CompProps = {
  show: boolean;
  value?: string;
  labels: ANNOTATION.dataAnnotationLabelSetDetail[];
  style?: React.CSSProperties;
  onChange?: (value: ANNOTATION.dataAnnotationLabel) => void;
};

const Comp: React.FC<CompProps> = ({
  value,
  show,
  style,
  labels,
  onChange,
}) => {
  const [search, setSearch] = useState('');

  const showList = useMemo(() => {
    if (!labels || !labels.length) return [];
    return labels[0].lables.filter((item) => item.name.includes(search));
  }, [labels, search]);

  const _click = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation(),
    [],
  );

  useEffect(() => {
    if (!show) setSearch('');
  }, [show]);

  return (
    <div
      style={style}
      onClick={_click}
      onMouseDown={_click}
      className={classNames(styles.dropdown, { hide: !show })}
    >
      <div className="sk0 base-border">
        <Input
          value={search}
          bordered={false}
          placeholder="请输入标签名称搜索"
          suffix={<SearchOutlined />}
          onChange={(e) => setSearch(e.target.value)}
        ></Input>
      </div>
      <CaretUpOutlined className={styles.arrow} />
      <div className={styles.scroll}>
        {showList.map((item, index) => (
          <div
            key={index}
            onClick={() => onChange && onChange(item)}
            className={classNames({
              'pointer base-head base-border': true,
              [styles.select]: value === item.name,
            })}
          >
            <DryTag color={item.color}>{item.name}</DryTag>
          </div>
        ))}
        {!showList.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      </div>
    </div>
  );
};

export default Comp;
