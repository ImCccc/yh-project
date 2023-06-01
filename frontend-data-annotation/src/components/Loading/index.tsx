import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import styles from './index.module.less';

type LoadingProps = {
  style?: React.CSSProperties;
  wrapStyle?: React.CSSProperties;
};

const Comp: React.FC<LoadingProps> = ({ style, wrapStyle }) => (
  <div className={styles.wrap} style={wrapStyle}>
    <LoadingOutlined style={style || { fontSize: '60px', color: '#08c' }} />
  </div>
);

export default React.memo(Comp);
