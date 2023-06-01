import { Tag, TagProps } from 'antd';
import { useMemo } from 'react';
import styles from './index.module.less';

const Comp: React.FC<TagProps> = ({ color, children, ...props }) => {
  const style = useMemo<React.CSSProperties>(() => {
    const _color = color?.trim() || '';
    if (_color.startsWith('rgba')) {
      const c = _color.split(',').slice(0, 3).join(',');
      return {
        background: `${c}, 0.3)`,
        border: `1px solid ${c}, 0.5)`,
        color: `#000`,
      };
    }
    return {};
  }, [color]);

  const _c = useMemo(() => {
    const _color = color?.trim() || '';
    return _color.startsWith('rgba') ? undefined : _color;
  }, [color]);

  return (
    <Tag {...props} style={style} color={_c}>
      <span
        className={styles.ellipsis}
        title={typeof children === 'string' ? children : ''}
      >
        {children}
      </span>
    </Tag>
  );
};

export default Comp;
