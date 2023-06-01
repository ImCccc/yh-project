import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

type CpmpProps = {
  type?: string;
  className?: string;
  topRender: JSX.Element;
  bottomRender: JSX.Element;
  topHeaderRender?: JSX.Element;
  bottomHeaderRender?: JSX.Element;
  contentHeaderRender?: JSX.Element;
  [key: string]: any;
};

const Comp: React.FC<CpmpProps> = ({
  children,
  topRender,
  bottomRender,
  topHeaderRender,
  bottomHeaderRender,
  contentHeaderRender,
  className,
}) => {
  return (
    <div className={classNames(styles.wrap, className)}>
      <div className={styles.left}>
        <div className={styles.lefttop}>
          {topHeaderRender}
          <div className={styles.scroll}>{topRender}</div>
        </div>
        <div className={styles.leftbottom}>
          {bottomHeaderRender}
          <div className={styles.scroll}>{bottomRender}</div>
        </div>
      </div>
      <div className={styles.content}>
        <div className="header">{contentHeaderRender}</div>
        {children}
      </div>
    </div>
  );
};

export default Comp;
