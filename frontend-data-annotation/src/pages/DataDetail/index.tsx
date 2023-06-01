import TableList, { TableListColumns } from '@/components/TableList';
import {
  DataServiceAppendRecord,
  DataServiceFilePage,
  DataServiceGet,
  DataServiceTaskPage,
} from '@/services/dataAnnotation/DataService';
import { dataTypeMapText, markTypeMapText } from '@/utils/globalData';
import { formatDate } from '@/utils/util';
import { Divider } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TitleModal } from '../Layout/Content';
import styles from './index.module.less';

const columns: TableListColumns = [
  {
    title: '任务名称',
    dataIndex: 'task_name',
    ellipsis: false,
  },
  {
    title: '标注类型',
    dataIndex: 'mark_type',
    width: 110,
    render: (text) => markTypeMapText[text],
  },
  {
    title: '任务进度',
    dataIndex: 'task_progress',
    width: 130,
    render: (text) => (
      <>
        {text.split('|').map((val: string, index: number) => (
          <span key={index}>
            {val}
            <br />
          </span>
        ))}
      </>
    ),
  },
];

const detailColumns: TableListColumns = [
  {
    title: '文件名称',
    dataIndex: 'name',
    ellipsis: false,
  },
  {
    title: '文件大小',
    dataIndex: 'size',
    width: 110,
    render: (text) => <span>{(text / 1024).toFixed(2)}KB</span>,
  },
  {
    title: '格式',
    dataIndex: 'data_type',
    width: 110,
    render: (text) => {
      return dataTypeMapText[text];
    },
  },
  {
    title: '上传时间',
    dataIndex: 'import_time',
    type: 'dateTime',
    ellipsis: false,
  },
];

const Comp: React.FC = () => {
  const params = useParams();
  const [dataDetail, setDataDetail] = useState<ANNOTATION.dataAnnotationData>();
  const [appendRecord, setAppendRecord] =
    useState<ANNOTATION.dataAnnotationDataAppendRecord[]>();
  const [title, setTitle] = useState<string>('');

  // 表格筛选值
  const reqParams = useMemo(() => {
    return { id: params.id };
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      DataServiceGet({ id: params.id }).then((res) => {
        setDataDetail(res.item);
        setTitle(res.item.name);
      });
      DataServiceAppendRecord({ id: params.id }).then((res) => {
        setAppendRecord(res.list);
      });
    }
  }, [params.id]);

  return (
    <div className={styles.container}>
      <TitleModal>{title}</TitleModal>
      <div className={styles.leftCom}>
        <div className={styles.leftComTop}>
          <h1>数据集详情</h1>
          <div>
            创建时间：
            {formatDate(dataDetail?.create_time || '', 'YYYY/MM/DD HH:mm')}
          </div>
          <div className={styles.leftComTopMain}>
            <div>数据记录：</div>
            {appendRecord?.map((value) => (
              <div key={value.batch_id}>
                {formatDate(value.import_time, 'YYYY/MM/DD HH:mm')}
                &emsp;&emsp;&emsp;添加了{' '}
                <span className={styles.blue}>{value.sample_count}</span> 条样本
              </div>
            ))}
          </div>
        </div>
        <Divider />
        <div>
          <h1>相关标注任务</h1>
          <TableList
            columns={columns}
            service={DataServiceTaskPage}
            reqParams={reqParams}
            rowKey="task_id"
            pagination={{ hideOnSinglePage: true }}
          />
        </div>
      </div>
      <div className={styles.rightCom}>
        <h1>详情列表</h1>
        <TableList
          columns={detailColumns}
          service={DataServiceFilePage}
          reqParams={reqParams}
          pagination={{ hideOnSinglePage: true }}
        />
      </div>
    </div>
  );
};

export default Comp;
