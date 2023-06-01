import React, {useCallback} from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

type BottonProps = {
  isActive?: boolean;
  onDeleteClick?: React.MouseEventHandler<HTMLDivElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  [key: string]: any;
};

const Comp: React.FC<BottonProps> = ({
  children,
  isActive,
  onDeleteClick,
  ...otherProps
}) => {
  const onDelete: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (onDeleteClick) {
        e.stopPropagation();
        onDeleteClick(e);
      }
    },
    [onDeleteClick]
  );

  return (
    <div
      {...otherProps}
      className={classNames(styles.btn, [
        styles[isActive ? 'active' : 'default'],
      ])}>
      <span className={styles.text}>{children}</span>
      <i
        onClick={onDelete}
        className={classNames('font_family icon-guanbi', styles.close)}></i>
    </div>
  );
};

export default Comp;
