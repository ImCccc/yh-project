import DryTag from '@/components/DryTag';
import { AnnotationLabelsProps } from '@/hooks/useLabels';
import {
  ArrowUpOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons';
import { useDebounce } from 'ahooks';
import { Checkbox, Empty, Input, Radio, RadioChangeEvent } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import classNames from 'classnames';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from './index.module.less';

export type SelectLablesValuesProps = {
  [key: string]: CheckboxValueType[];
};

export type LablesValuesProps = {
  [key: string]: CheckboxValueType[] | string;
};

type CompProps = {
  value?: LablesValuesProps;
  labels?: AnnotationLabelsProps;
  onChange?: (values: SelectLablesValuesProps) => void;
};

const Comp: React.FC<CompProps> = ({ labels, onChange, value }) => {
  const [selfValue, setValues] = useState<SelectLablesValuesProps>({});
  const [expand, setExpand] = useState<{ [key: string]: boolean }>({});
  const [search, setSearch] = useState('');

  // 需要置顶, 需要内部维护状态
  const [thisLabels, setThisLabels] = useState(labels);
  useEffect(() => setThisLabels(labels), [labels]);

  // 防抖优化
  const debouncedSearch = useDebounce(search, { wait: 500 });

  const thisValue = useMemo(() => {
    if (value) {
      const _value: SelectLablesValuesProps = {};
      Object.keys(value).map((key) => {
        const v = value[key];
        _value[key] = typeof v === 'string' ? v.split('|') : v;
      });
      return _value;
    }
    return selfValue;
  }, [value, selfValue]);

  const showLabels = useMemo(() => {
    if (!thisLabels) return [];
    if (!debouncedSearch.trim()) return thisLabels;
    return thisLabels
      .map((item) => ({
        ...item,
        lables: (item.lables || []).filter((v) =>
          v.name.includes(debouncedSearch),
        ),
      }))
      .filter((item) => item.lables.length);
  }, [thisLabels, debouncedSearch]);

  const toTop = useCallback(
    (pIndex: number, cIndex?: number) => {
      if (!thisLabels) return;
      if (cIndex === 0) return;
      if (pIndex === 0 && cIndex === undefined) return;

      // 置顶父级标签
      if (cIndex === undefined) {
        const deleteItem = thisLabels.splice(pIndex, 1);
        if (deleteItem && thisLabels) {
          setThisLabels([...deleteItem, ...thisLabels]);
        }
        return;
      }

      // 置顶子标签
      const cLabels = thisLabels[pIndex].lables;
      cLabels.unshift(...cLabels.splice(cIndex, 1));
      setThisLabels([...thisLabels]);
    },
    [thisLabels],
  );

  return (
    <div className={styles.warp}>
      <div className={classNames('base-border', styles.head)}>
        <span className="base-font-title">标签集</span>
      </div>
      <div className={styles.input}>
        <Input
          allowClear
          value={search}
          placeholder="请输入标签名称搜索"
          onChange={(e) => setSearch(e.target.value)}
          suffix={<span className="iconfont icon-Shape"></span>}
        />
      </div>
      <div className={styles.scroll}>
        {showLabels.map((labelSet, index) => {
          const { name, lables, is_multiple_select } = labelSet;
          const isMultiple = is_multiple_select === 1;
          const isExpand = expand[name];

          const toggle = () => {
            expand[name] = !isExpand;
            setExpand({ ...expand });
          };

          const _onChange = (e: CheckboxValueType[] | RadioChangeEvent) => {
            const newValue = { ...thisValue };
            newValue[name] = e instanceof Array ? e : [e.target.value];
            onChange && onChange(newValue);
            setValues(newValue);
          };

          const Comp = isMultiple ? Checkbox : Radio;
          const compValue: any = isMultiple
            ? thisValue[name]
            : thisValue[name] && thisValue[name][0];

          return (
            <Fragment key={index}>
              <div key={index} className={classNames(styles.head)}>
                <ArrowUpOutlined
                  title="置顶"
                  onClick={() => toTop(index)}
                  className={styles.arrowUp}
                />
                <PlusSquareOutlined
                  onClick={toggle}
                  className={classNames(styles.icon, { hide: !isExpand })}
                />
                <MinusSquareOutlined
                  onClick={toggle}
                  className={classNames(styles.icon, { hide: isExpand })}
                />
                {name}
              </div>
              <Comp.Group
                value={compValue}
                onChange={_onChange}
                className={classNames(styles.group, { hide: isExpand })}
              >
                {lables.map(({ name, color }, cIndex) => (
                  <div className={styles.arrowWrap} key={cIndex}>
                    <ArrowUpOutlined
                      title="置顶"
                      onClick={() => toTop(index, cIndex)}
                      className={styles.arrowUp}
                    />
                    <Comp key={cIndex} value={name}>
                      <DryTag color={color}>{name}</DryTag>
                    </Comp>
                  </div>
                ))}
              </Comp.Group>
            </Fragment>
          );
        })}
        {!showLabels.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      </div>
    </div>
  );
};

export default Comp;
