import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classNames from 'classnames';
import React from 'react';
import styles from './index.module.less';

type CompProps = {
  noPass?: boolean;
  invalid?: boolean;
  className?: string;
  children?: React.ReactNode;
  operButtons?: React.ReactNode;
  nextClick?: () => void;
  prevClick?: () => void;
  onChangeInvalid?: (invalid: boolean) => void;
  showInvalid?: boolean; // 是否显示废弃按钮
};

const Comp: React.FC<CompProps> = ({
  noPass,
  invalid,
  children,
  className,
  operButtons,
  showInvalid,
  nextClick,
  prevClick,
  onChangeInvalid,
}) => {
  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.head}>
        <span className="base-head">
          <span className="base-font-title">样本参数</span>
          {noPass && <span className="iconfont icon-butongguo"></span>}
          {invalid && <span className="iconfont icon-feiqi"></span>}
        </span>
        <span>
          {showInvalid !== false && (
            <Button
              className="btn-mr"
              onClick={() => onChangeInvalid && onChangeInvalid(!invalid)}
            >
              {invalid ? '取消废弃' : '废弃'}
            </Button>
          )}
          {operButtons}
        </span>
      </div>
      <div className={styles.content}>
        {prevClick ? (
          <LeftOutlined
            onClick={prevClick}
            className={classNames('dry-arrow', styles.prev)}
          />
        ) : (
          <span className={styles.prev}></span>
        )}
        <div className={styles.children}>{children}</div>
        {nextClick ? (
          <RightOutlined
            onClick={nextClick}
            className={classNames('dry-arrow', styles.next)}
          />
        ) : (
          <span className={styles.next}></span>
        )}
      </div>
    </div>
  );
};

export default Comp;
