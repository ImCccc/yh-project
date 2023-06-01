import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
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
      className={classNames(styles.base, styles.ellipse)}>
      {children}
    </div>
  );
};

export default Comp;
