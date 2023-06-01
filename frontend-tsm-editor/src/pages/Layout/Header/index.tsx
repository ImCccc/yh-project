import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

type CpmpProps = {
  icon?: string;
  title: string;
  className?: string;
  [key: string]: any;
};

const Comp: React.FC<CpmpProps> = ({icon, title, children, className}) => {
  return (
    <div className={classNames('header', className)}>
      <span className={styles.title}>
        {icon && (
          <i className={classNames('font_family', icon, styles.icon)}></i>
        )}
        <span className="bold">{title}</span>
      </span>
      {children}
    </div>
  );
};

export default Comp;
