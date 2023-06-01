import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
const Comp: React.FC<any> = (props) => (
  <span
    {...props}
    className={classNames('font_family icon-add', styles.addicon)}
  />
);

export default Comp;
