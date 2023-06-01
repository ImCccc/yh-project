import { useCallback, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Form, Input, InputNumber, message } from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

import TableList, {
  TableListColumns,
  TableListRef,
} from '@/components/TableList';

import {
  AppServicePublish,
  AppServicePublishRecord,
} from '@/services/speechOpen/AppService';

import styles from './index.module.less';

const columns: TableListColumns<SPEECHOPEN.speechopenAppPublishRecordResp> = [
  {
    title: '版本',
    dataIndex: 'version',
    key: 'version',
  },
  {
    title: '提交时间',
    dataIndex: 'commit_time',
    key: 'commit_time',
    timeFormat: 'YYYY-MM-DD HH:mm:ss',
  },
  {
    title: '处理时间',
    dataIndex: 'deal_time',
    key: 'deal_time',
    timeFormat: 'YYYY-MM-DD HH:mm:ss',
  },
  {
    title: '处理结果',
    key: 'deal_result',
    dataIndex: 'deal_result',
    render: (text) => {
      if (text === 0) {
        return <span>未上线</span>;
      } else if (text === 1) {
        return <span>发布中（待审核）</span>;
      } else if (text === 2) {
        return <span>发布成功</span>;
      } else if (text === 3) {
        return <span>发布失败</span>;
      }
      return text;
    },
  },
];

const Comp: React.FC = () => {
  const { id } = useParams();
  const reqParams = useMemo(() => ({ id }), [id]);
  const tableRef = useRef<TableListRef>();
  const [form] = Form.useForm();
  const [version, setVersion] = useState<number>(1);

  // 格式化表格数据
  const formatData = useCallback((_data: Record<string, any>) => {
    if (_data.list) {
      for (const i in _data.list) {
        _data.list[i].id = _data.list[i].version;
      }
    }
    if (_data.next_version) {
      setVersion(_data.next_version);
    }
    return _data;
  }, []);

  // 提交成功
  const onFinish = (values: Record<string, any>) => {
    if (id) {
      AppServicePublish({ id: id, publish_explain: values.publish_explain })
        .then(() => {
          message.success('提交成功');
          // 刷新表格
          tableRef.current?.refresh();
          // 清空表单
          form.resetFields();
        })
        .catch(() => {
          message.warning('提交失败');
        });
    }
  };

  // 提交失败
  const onFinishFailed = (
    errorInfo: ValidateErrorEntity<Record<string, any>>,
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 10 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="版本">
            <InputNumber value={version} readOnly />
          </Form.Item>

          <Form.Item
            label="发布说明"
            name="publish_explain"
            rules={[{ required: true, message: '请输入发布说明' }]}
          >
            <Input.TextArea autoSize={{ minRows: 4, maxRows: 6 }} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6 }}>
            <Button type="primary" htmlType="submit">
              提交发布
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottomTitle}>
          <h2>提交发布记录</h2>
          <span>只展示最近10条记录</span>
        </div>
        <TableList
          columns={columns}
          reqParams={reqParams}
          formatData={formatData}
          service={AppServicePublishRecord}
          onRef={tableRef}
        />
      </div>
    </div>
  );
};

export default Comp;
