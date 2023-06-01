import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
type CompProps = {
  width?: number;
  height?: number;
  isConcurrent?: boolean;
  topheight?: string;
  [k: string]: any;
};
const Comp: React.FC<CompProps> = ({
  isConcurrent,
  width = 8,
  height = 3,
  topheight = '2rem',
  children,
  ...props
}) => {
  return (
    <div {...props}>
      <div className={styles.concurrentTop} style={{height: topheight}}></div>
      <div
        style={{
          minWidth: `${width}rem`,
          minHeight: `${height}rem`,
        }}
        className={classNames(styles.concurrent)}>
        {isConcurrent ? (
          children
        ) : (
          <span className={styles.concurrentText}>{children}</span>
        )}
      </div>
    </div>
  );
};
export default Comp;
