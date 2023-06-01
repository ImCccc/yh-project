import React, {useCallback} from 'react';
import Botton from '@/components/Botton';
import {Modal} from 'antd';
import styles from './index.module.scss';

type BottonsProps = {
  activeIndex?: number;
  setActiveIndex?: (index: number) => void;
  deleteByIndex?: (index: number) => void;
  list?: {
    name: string;
    id: string | number;
    data?: Record<string, any>;
    [key: string]: any;
  }[];
  [key: string]: any;
};

const Comp: React.FC<BottonsProps> = ({
  list,
  activeIndex,
  setActiveIndex,
  deleteByIndex,
}) => {
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
      const tagName = (e.target as HTMLDivElement).tagName.toLocaleLowerCase();
      if (tagName === 'i') {
        return Modal.confirm({
          okText: '确定',
          cancelText: '取消',
          content: '确定要删除？',
          onOk: () => deleteByIndex?.(index),
        });
      }
      setActiveIndex?.(index);
    },
    [setActiveIndex, deleteByIndex]
  );

  return (
    <div className={styles.wrap}>
      {list?.map((item, index) => (
        <Botton
          key={item.id}
          isActive={activeIndex === index}
          onClick={(e) => {
            onClick(e, index);
          }}>
          {item.name}
        </Botton>
      ))}
    </div>
  );
};

export default Comp;
