import React, {useCallback, useMemo} from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

export type BaseProps = {
  scale: number;
  style: Omit<React.CSSProperties, 'width' | 'height'> & {
    width?: number;
    height?: number;
  };
  isSelect?: boolean;
  className?: string;
  textStyle?: React.CSSProperties;
  isVirtualNode?: boolean;
  nodeClick?: (...args: any[]) => void;
  [key: string]: any;
};

const Comp: React.FC<BaseProps> = ({
  scale,
  style,
  children,
  isSelect,
  nodeClick,
  className,
  isVirtualNode,
  textStyle = {},
  ...otherProps
}) => {
  const onClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      nodeClick?.();
    },
    [nodeClick]
  );

  const thisStyle = useMemo<{
    textStyle: React.CSSProperties;
    wrapStyle: React.CSSProperties;
  }>(() => {
    const multiple = scale || 1;
    const width = style.width || 5.4;
    const height = style.height || 5.4;

    return {
      textStyle: {
        ...textStyle,
        width: 100 / multiple + '%',
        transform: `scale(${multiple})`,
        // 字体缩放有最小值 fontSize: 1.4 * multiple + 'rem',
      },
      wrapStyle: {
        ...style,
        width: width * multiple + 'rem',
        height: height * multiple + 'rem',
        border: `${1 * multiple}px ${
          isVirtualNode ? 'dashed red' : 'solid #666'
        }`,
      },
    };
  }, [scale, style, textStyle, isVirtualNode]);

  const classname = useMemo(
    () => classNames(styles.node, className, {[styles.select]: isSelect}),
    [isSelect, className]
  );

  return (
    <div
      onClick={onClick}
      style={thisStyle.wrapStyle}
      className={classname}
      {...otherProps}>
      {children && (
        <span className={styles.text} style={thisStyle.textStyle}>
          {children}
        </span>
      )}
    </div>
  );
};

export default Comp;
