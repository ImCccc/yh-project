import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {Drawer, DrawerProps, Input} from 'antd';
import Header from '@/pages/Layout/Header';
import styles from './index.module.scss';
import {FlowContext} from '@/pages/Flow';
import {useDebounceEffect} from 'ahooks';
import classNames from 'classnames';
import {stringify} from '@/utils/util';
const {TextArea} = Input;

const drawerProps: DrawerProps = {
  title: null,
  mask: false,
  width: '40rem',
  closable: false,
  getContainer: false,
  style: {position: 'fixed', top: '15.6rem'},
};

const Comp: React.FC = () => {
  const context = useContext(FlowContext);
  const {selectNodeData, updataNodeData} = context;

  const [data, setData] = useState<string>();
  const [requiredMetrics, setRequiredMetrics] = useState<string>();

  const [thisVisible, setThisVisible] = useState<boolean>(false);
  useEffect(() => {
    if (context.showSetting instanceof Array) return setThisVisible(false);
    setThisVisible(true);
  }, [context.showSetting]);

  const [showDataTips, setDataTip] = useState<boolean>(false);
  const [showRequiredMetricsTips, setRequiredMetricsTip] =
    useState<boolean>(false);

  // 用于判断,当前数据是否被修改,被修改,需要同步到全局数据中
  const isInput = useRef<boolean>(false);

  useEffect(() => {
    isInput.current = false;
    if (!selectNodeData) {
      setData('{}');
      setRequiredMetrics('[]');
    } else {
      setData(stringify(selectNodeData.submitData.data, true));
      setRequiredMetrics(
        stringify(selectNodeData.submitData.requiredMetrics, true)
      );
    }
  }, [selectNodeData]);

  useDebounceEffect(
    () => {
      try {
        setDataTip(false);
        if (isInput.current) {
          updataNodeData(JSON.parse(data || ''), 'data');
        }
      } catch (error) {
        setDataTip(true);
      }

      try {
        setRequiredMetricsTip(false);
        if (isInput.current) {
          updataNodeData(JSON.parse(requiredMetrics || ''), 'requiredMetrics');
        }
      } catch (error) {
        setRequiredMetricsTip(true);
      }
    },
    [data, requiredMetrics],
    {wait: 500}
  );

  const dataInput = useMemo(() => {
    return (e: React.FormEvent<HTMLTextAreaElement>) => {
      isInput.current = true;
      setData((e.target as any).value);
    };
  }, []);

  const requiredMetricsInput = useMemo(() => {
    return (e: React.FormEvent<HTMLTextAreaElement>) => {
      isInput.current = true;
      setRequiredMetrics((e.target as any).value);
    };
  }, []);

  return (
    <Drawer visible={thisVisible} {...drawerProps}>
      <Header title="设置" className={styles.header} icon="icon-shezhi">
        <span
          onClick={() => setThisVisible(false)}
          className="font_family icon-guanbi"></span>
      </Header>
      <div className={styles.content}>
        <div className={styles.title}>
          额外参数
          <span
            className={classNames(styles.error, {
              [styles.show]: showDataTips,
            })}>
            (输入格式错误)
          </span>
        </div>
        <TextArea
          rows={9}
          maxLength={10}
          value={data}
          onInput={dataInput}
          placeholder="数据格式{key: value}"
        />
        <div className={styles.title}>
          条件数组
          <span
            className={classNames(styles.error, {
              [styles.show]: showRequiredMetricsTips,
            })}>
            (输入格式错误)
          </span>
        </div>
        <TextArea
          rows={9}
          maxLength={10}
          value={requiredMetrics}
          onInput={requiredMetricsInput}
          placeholder="数据格式[{key: value}]"
        />
      </div>
    </Drawer>
  );
};

export default Comp;
