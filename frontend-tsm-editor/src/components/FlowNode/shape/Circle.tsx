import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
type CompProps = {
  width?: number | string;
};
const Comp: React.FC<CompProps> = ({width = 5.4, children}) => {
  return (
    <div
      style={{
        width: `${width}rem`,
        height: `${width}rem`,
      }}
      className={classNames(styles.circle, styles.base)}>
      {children}
    </div>
  );
};

export default Comp;
