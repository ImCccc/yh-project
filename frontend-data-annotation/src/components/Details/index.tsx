import { ListProps } from '@/utils/globalData';
import React from 'react';
import styles from './index.module.less';

export type FieldListProps = Partial<ListProps>[];

const Field: React.FC<{
  label?: string;
  value?: string | number;
}> = ({ label, value }) => (
  <div className={styles.field}>
    <span className={styles.label}>{label}</span>
    <span className={styles.value}>{value}</span>
  </div>
);

const Comp: React.FC<{ fieldList: FieldListProps }> = ({ fieldList }) => {
  return (
    <div className={styles.top}>
      {fieldList.map((item) => (
        <Field key={item.label} label={item.label} value={item.value} />
      ))}
    </div>
  );
};

export default React.memo(Comp);
