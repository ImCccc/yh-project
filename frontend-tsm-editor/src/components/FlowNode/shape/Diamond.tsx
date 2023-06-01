import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
type CompProps = {
  width?: number;
  height?: number;
};
const Comp: React.FC<CompProps> = ({height = 4.6, width = 8, children}) => {
  return (
    <div
      style={{
        minWidth: `${width}rem`,
        minHeight: `${height}rem`,
      }}
      className={styles.diamondWrap}>
      <div
        style={{
          width: `${height}rem`,
          height: `${height}rem`,
        }}
        className={classNames(styles.diamond)}></div>
      <span className={styles.diamondTest}>{children}</span>
    </div>
  );
};

export default Comp;
