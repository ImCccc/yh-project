import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';

type CompProps = {
  size?: number;
  isSelect?: boolean;
  canAddTop?: boolean;
  canAddBottom?: boolean;
  canAddLeft?: boolean;
  canAddRight?: boolean;
  addNode?: (type: string) => void;
  [key: string]: any;
};

const Comp: React.FC<CompProps> = ({
  children,
  isSelect,
  size = 0.4,
  canAddTop,
  canAddBottom,
  canAddLeft,
  canAddRight,
  addNode,
  ...props
}) => {
  const tagStyle: React.CSSProperties = {
    width: `${size * 2}rem`,
    height: `${size * 2}rem`,
  };

  const addClick = (type: string) => {
    addNode && addNode(type);
  };

  return (
    <div
      {...props}
      onClick={(e) => {
        e.stopPropagation();
        props.onClick && props.onClick();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        props.onDoubleClick && props.onDoubleClick();
      }}
      style={{padding: `${size}rem`}}
      className={styles.wrap}>
      {canAddTop && (
        <span
          onClick={() => addClick('left')}
          className={classNames(
            'font_family icon-add2',
            styles.add,
            styles.addtop,
            {[styles.hide]: !isSelect}
          )}
        />
      )}
      {canAddBottom && (
        <span
          onClick={() => addClick('right')}
          className={classNames(
            'font_family icon-add2',
            styles.add,
            styles.addbottom,
            {[styles.hide]: !isSelect}
          )}
        />
      )}
      {canAddLeft && (
        <span
          onClick={() => addClick('left')}
          className={classNames(
            'font_family icon-add2',
            styles.add,
            styles.addleft,
            {[styles.hide]: !isSelect}
          )}
        />
      )}
      {canAddRight && (
        <span
          onClick={() => addClick('right')}
          className={classNames(
            'font_family icon-add2',
            styles.add,
            styles.addright,
            {[styles.hide]: !isSelect}
          )}
        />
      )}
      <div
        className={classNames(styles.line, {
          [styles.border]: isSelect,
        })}>
        {children}
      </div>
      <span className={classNames(styles.left, {[styles.hide]: !isSelect})}>
        <span className={styles.tab} style={tagStyle}></span>
        <span className={styles.tab} style={tagStyle}></span>
        <span className={styles.tab} style={tagStyle}></span>
      </span>
      <span
        className={classNames(styles.tab, styles.center, styles.centerTop, {
          [styles.hide]: !isSelect,
        })}
        style={tagStyle}></span>
      <span
        className={classNames(styles.tab, styles.center, styles.centerBottom, {
          [styles.hide]: !isSelect,
        })}
        style={tagStyle}></span>
      <span
        className={classNames(styles.right, {
          [styles.hide]: !isSelect,
        })}>
        <span className={styles.tab} style={tagStyle}></span>
        <span className={styles.tab} style={tagStyle}></span>
        <span className={styles.tab} style={tagStyle}></span>
      </span>
    </div>
  );
};

export default Comp;
