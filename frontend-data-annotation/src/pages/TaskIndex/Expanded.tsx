import Loading from '@/components/Loading';
import { ListProps } from '@/utils/globalData';
import { Empty } from 'antd';
import styles from './Expanded.module.less';

type CompProps = {
  list?: ListProps[] | null;
};

const Comp: React.FC<CompProps> = ({ list }) =>
  list === null ? (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  ) : (
    <div className={styles.expandable}>
      {(list || []).map((item) => (
        <div className={styles.col} key={item.label}>
          <span className="sk0">{item.label}</span>
          <span className={styles.value}>{item.value}</span>
        </div>
      ))}
      {!(list && list[0].value) && <Loading />}
    </div>
  );

export default Comp;
