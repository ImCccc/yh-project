import Loading from '@/components/Loading';
import { ListProps } from '@/utils/globalData';
import { useMemo } from 'react';
import styles from './Expanded.module.less';

type CompProps = {
  list?: ListProps[];
};

const Comp: React.FC<CompProps> = ({ list }) => {
  const isLoading = useMemo(() => !(list && list[0].value), [list])
  return (
    <div className={styles.expandable}>
      {(list || []).map((item) => (
        <div className={styles.col} key={item.label}>
          <span>{item.label}</span>
          <span className={styles.value}>{item.value}</span>
        </div>
      ))}
      {isLoading && <Loading />}
    </div>
  );
};

export default Comp;
