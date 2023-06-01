import { Pagination } from 'antd';
import classNames from 'classnames';
import styles from './index.module.less';

export const AnnotationPageSize = 60;

export type PageListProps = {
  isPass?: boolean;
  isError?: boolean;
};

type CompProps = {
  total: number;
  currentPage: number;
  currentSequence: number;
  pageList: PageListProps[];
  onChange?: (page: number) => void;
  onChangeSequence?: (currentSequence: number) => void;
};

const Comp: React.FC<CompProps> = ({
  total,
  pageList,
  onChange,
  currentPage,
  currentSequence,
  onChangeSequence,
}) => {
  return (
    <div className={styles.wrapper}>
      <div>
        {pageList.map((item, index) => {
          const sequence = AnnotationPageSize * (currentPage - 1) + index + 1;
          return (
            <span
              key={index}
              className={classNames({
                [styles.item]: true,
                [styles.pass]: item.isPass,
                [styles.error]: item.isError,
                [styles.current]: currentSequence === sequence,
              })}
              onClick={() => onChangeSequence && onChangeSequence(sequence)}
            >
              {sequence}
            </span>
          );
        })}
        {total > AnnotationPageSize && (
          <div className={styles.bottom}>
            <Pagination
              size="small"
              total={total}
              showQuickJumper
              current={currentPage}
              onChange={onChange}
              showSizeChanger={false}
              pageSize={AnnotationPageSize}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comp;
