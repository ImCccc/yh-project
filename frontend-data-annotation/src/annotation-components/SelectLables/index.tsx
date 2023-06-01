import DryTag from '@/components/DryTag';
import { AnnotationLabelsProps } from '@/hooks/useLabels';
import { remToNumber } from '@/utils/util';
import {
  ArrowUpOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons';
import { useDebounce } from 'ahooks';
import { Checkbox, Empty, Input, Radio } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import classNames from 'classnames';
import VirtualList from 'rc-virtual-list';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './index.module.less';

export type SelectLablesValuesProps = {
  [key: string]: CheckboxValueType[];
};

export type LablesValuesProps = {
  [key: string]: CheckboxValueType[] | string;
};

type FlattenListProps = Partial<ANNOTATION.dataAnnotationLabelSetDetail> &
  Partial<ANNOTATION.dataAnnotationLabel> & {
    showTop?: boolean; // 是否显示置顶
    name: string; // 名称
    pName: string; // 标签集名称
    pIndex: number; // thisLabels中, 标签集的 index
    cIndex?: number; // thisLabels中, 标签集的lables的index
  };

type CompProps = {
  value?: LablesValuesProps;
  labels?: AnnotationLabelsProps;
  onChange?: (values: SelectLablesValuesProps) => void;
};

const itemHeight = remToNumber(5.6);

const Comp: React.FC<CompProps> = ({ labels, onChange, value }) => {
  const [search, setSearch] = useState('');
  const [selfValue, setValues] = useState<SelectLablesValuesProps>({});
  const [expand, setExpand] = useState<{ [key: string]: boolean }>({});

  // 需要置顶, 需要内部维护状态
  const [thisLabels, setThisLabels] = useState(labels);
  useEffect(() => setThisLabels(labels), [labels]);

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

  // 防抖优化
  const debouncedSearch = useDebounce(search, { wait: 500 });

  const virtualData = useMemo(() => {
    if (!thisLabels) return [];

    const search = debouncedSearch.trim();

    // 首个父标签,不显示置顶图标
    let parentHideTop = false;

    const formatData = thisLabels.reduce((data, cur, pIndex) => {
      const _v = {
        pIndex,
        showTop: true,
        pName: cur.name,
        is_multiple_select: cur.is_multiple_select,
      };
      const hide = expand[_v.pName]; // 是否折叠, true 代表不显示子标签
      const children: FlattenListProps[] = [];

      let childrenIndex = 0; // 保存当前显示的子标签的index
      if (cur.lables) {
        cur.lables.forEach((v, cIndex) => {
          if (v.name.includes(search)) {
            children.push({
              ...v,
              ..._v,
              cIndex,
              showTop: childrenIndex !== 0,
            });
            childrenIndex++;
          }
        });
      }

      if (children.length) {
        // 有子标签, 才显示父标签
        if (parentHideTop === false) {
          parentHideTop = true;
          _v.showTop = false;
        }
        const parentItem = { ...cur, ..._v };
        const childrenItem = hide ? [] : children;
        data = [...data, parentItem, ...childrenItem];
      }

      return data;
    }, [] as FlattenListProps[]);

    return formatData;
  }, [thisLabels, debouncedSearch, expand]);

  const tableHeight = useMemo(() => {
    const h = (virtualData.length + 1) * itemHeight;
    if (h > 500) return 500;
    return Math.max(200, h);
  }, [virtualData.length]);

  const toTop = useCallback(
    (pIndex: number, cIndex?: number) => {
      if (!thisLabels) return;
      if (cIndex === 0) return;
      if (pIndex === 0 && cIndex === undefined) return;

      // 置顶父级标签
      if (cIndex === undefined) {
        return setThisLabels([...thisLabels.splice(pIndex, 1), ...thisLabels]);
      }

      // 置顶子标签
      const cLabels = thisLabels[pIndex].lables;
      cLabels.unshift(...cLabels.splice(cIndex, 1));
      setThisLabels([...thisLabels]);
    },
    [thisLabels],
  );

  const toggle = useCallback(
    (isExpand: boolean, pName: string) => {
      expand[pName] = !isExpand;
      setExpand({ ...expand });
    },
    [expand],
  );

  const onChangeSelect = useCallback(
    (e: CheckboxValueType[] | string, pName: string) => {
      const newValue = { ...thisValue };
      newValue[pName] = e instanceof Array ? e : [e];
      onChange && onChange(newValue);
      setValues(newValue);
    },
    [onChange, thisValue],
  );

  const getListJSX = (item: FlattenListProps) => {
    const {
      id,
      name,
      color,
      pName,
      pIndex,
      cIndex,
      showTop,
      is_multiple_select,
    } = item;
    const isMultiple = is_multiple_select === 1;
    const isExpand = expand[pName];

    if (cIndex === undefined) {
      return (
        <div key={id} className={classNames(styles.head)}>
          {showTop && (
            <ArrowUpOutlined
              title="置顶"
              onClick={() => toTop(pIndex)}
              className={styles.arrowUp}
            />
          )}
          <PlusSquareOutlined
            onClick={() => toggle(isExpand, pName)}
            className={classNames(styles.icon, { hide: !isExpand })}
          />
          <MinusSquareOutlined
            onClick={() => toggle(isExpand, pName)}
            className={classNames(styles.icon, { hide: isExpand })}
          />
          {pName}
        </div>
      );
    }

    const getComp = () => {
      const compValue: any = isMultiple
        ? thisValue[pName]
        : thisValue[pName] && thisValue[pName][0];
      if (isMultiple) {
        return (
          <Checkbox
            onChange={(e) => {
              const values = thisValue[pName] || [];
              if (!e.target.checked) {
                return onChangeSelect(
                  values.filter((v) => v !== name),
                  pName,
                );
              }
              if (values.includes(name)) return;
              values.push(name);
              onChangeSelect(values, pName);
            }}
            checked={compValue?.includes(name)}
          >
            <DryTag color={color}>{name}</DryTag>
          </Checkbox>
        );
      }
      return (
        <Radio
          onClick={() => onChangeSelect(name, pName)}
          checked={compValue === name}
        >
          <DryTag color={color}>{name}</DryTag>
        </Radio>
      );
    };

    return (
      <div className={styles.arrowWrap} key={cIndex}>
        {showTop && (
          <ArrowUpOutlined
            title="置顶"
            onClick={() => toTop(pIndex, cIndex)}
            className={styles.arrowUp}
          />
        )}
        {getComp()}
      </div>
    );
  };

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
      {!virtualData.length && (
        <div className="bg-white">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}
      {!!virtualData.length && (
        <VirtualList
          itemKey="id"
          height={tableHeight}
          data={virtualData}
          itemHeight={itemHeight}
        >
          {getListJSX}
        </VirtualList>
      )}
    </div>
  );
};

export default Comp;
