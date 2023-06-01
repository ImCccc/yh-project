import { Radio, RadioChangeEvent, Slider } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { PlayInfoProps } from '../AudioAnnotation';
import styles from './index.module.less';

type CompProps = {
  playInfo: PlayInfoProps;
  right?: React.ReactNode;
  left?: React.ReactNode;
  speedChange?: (speed: number) => void;
  zoomChange?: (speed: number) => void;
};

const speedList = [
  { label: '0.75', value: 0.75 },
  { label: '1.0', value: 1.0 },
  { label: '1.25', value: 1.25 },
  { label: '1.5', value: 1.5 },
  { label: '2.0', value: 2.0 },
];

const Comp: React.FC<CompProps> = ({
  right,
  left,
  playInfo,
  zoomChange,
  speedChange,
}) => {
  const [speed, setSpeed] = useState(1);
  const thisSpeedChange = useCallback(
    (e: RadioChangeEvent) => {
      setSpeed(e.target.value);
      speedChange && speedChange(e.target.value);
    },
    [speedChange],
  );

  const [zoom, setZoom] = useState(1);
  const thisZoomChange = useCallback((e: number) => {
    setZoom(e);
  }, []);

  useEffect(() => {
    if (playInfo.speed) setSpeed(playInfo.speed);
    if (playInfo.zoom) setZoom(playInfo.zoom);
  }, [playInfo]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <span className="flex-center">
          <span className="base-font-title">样本参数</span>
          {left}
        </span>
        {right}
      </div>
      <div className={styles.info}>
        <div className={styles.col}>
          <span className={styles.label}>样本序号:</span>
          <span className={styles.value}>{playInfo.serialNo}</span>
        </div>
        <div className={styles.col}>
          <span className={styles.label}>样本名称:</span>
          <span className={styles.value}>{playInfo.name}</span>
        </div>
        <div className={styles.col}>
          <span className={styles.label}>语速调节:</span>
          <Radio.Group
            optionType="button"
            value={speed}
            options={speedList}
            onChange={thisSpeedChange}
          />
        </div>
        <div className={styles.col}>
          <span className={styles.label}>视图缩放:</span>
          <Slider
            min={1}
            max={30}
            value={zoom}
            onChange={thisZoomChange}
            onAfterChange={zoomChange}
            className={styles.slider}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Comp);
