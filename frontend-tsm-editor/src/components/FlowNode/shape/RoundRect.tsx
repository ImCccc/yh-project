import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
type CompProps = {
  width?: number;
  height?: number;
};
const Comp: React.FC<CompProps> = ({width = 8, height = 4.6, children}) => {
  return (
    <div
      style={{
        minWidth: `${width}rem`,
        minHeight: `${height}rem`,
      }}
      className={classNames(styles.base, styles.roundRect)}>
      {children}
    </div>
  );
};

export default Comp;
