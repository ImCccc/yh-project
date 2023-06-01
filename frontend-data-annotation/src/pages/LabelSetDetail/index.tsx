import ModalForm, {
  FormItemListProps,
  ImperativeHandleProps,
} from '@/components/ModalForm';
import { TableListColumns, TableListRef } from '@/components/TableList';
import { importModeList } from '@/utils/globalData';
import { splitButtons } from '@/utils/util';
import { Button, message, Modal, Radio, Tag, Upload } from 'antd';

import { observer } from 'mobx-react-lite';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import styles from './index.module.less';
import Table from './Table';
import { useSearchParams } from 'react-router-dom';
import {
  LabelServiceAdd,
  LabelServiceBatchAdd,
  LabelServiceBatchDel,
  LabelServiceDel,
  LabelServicePage,
  LabelServiceUpdate,
} from '@/services/dataAnnotation/LabelService';
import {
  fileUploadRule,
  importModeRule,
  labelNameRule,
} from '@/utils/verification';
import { UploadOutlined } from '@ant-design/icons';
import { TitleModal } from '../Layout/Content';
import { FileServiceTemplate } from '@/services/dataAnnotation/FileService';
import { downloadFile } from '../DataSource';

const Comp: React.FC = () => {
  const modalFormRef = useRef<ImperativeHandleProps>(null);
  const [modalState, setModalState] = useState<
    '添加标签' | '批量添加' | '修改标签'
  >('添加标签');
  const [initialValues, setInitialValues] = useState<Record<string, unknown>>(
    {},
  );
  // 删除
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<any>();

  const tableRef = useRef<TableListRef>();
  const [searchParams] = useSearchParams();

  const [tipsModalOpen, setTipsModalOpen] = useState<boolean>(false);
  const [tipsData, setTipsData] = useState<string[]>();

  // 标题和id
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const title = useMemo(() => searchParams.get('name'), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const labelSetId = useMemo(() => searchParams.get('id'), []);

  // 批量删除
  const [batchDeleteModalOpen, setBatchDeleteModalOpen] =
    useState<boolean>(false);
  const [batchDeleteData, setBatchDeleteData] = useState<any[]>([]);

  const onSubmit = useCallback(
    async (data: any) => {
      if (modalState == '添加标签') {
        data['label_set_id'] = labelSetId;
        await LabelServiceAdd({
          item: data,
        });
        message.success('添加成功');
        tableRef.current?.refresh();
      } else if (modalState === '批量添加') {
        const formData: any = new FormData();
        formData.append('label_set_id', labelSetId);
        formData.append('import_mode', data.import_mode);
        formData.append('file', data.file.file);
        const res = await LabelServiceBatchAdd(formData);
        if (res.code == 0) {
          message.success('添加成功');
          tableRef.current?.refresh();
        }
        if (res.fail_list && res.fail_list.length !== 0) {
          setTipsModalOpen(true);
          setTipsData(res.fail_list);
        }
      } else if (modalState === '修改标签') {
        await LabelServiceUpdate(data);
        message.success('修改成功');
        tableRef.current?.refresh();
      }
      setInitialValues({});
    },
    [modalState, labelSetId],
  );

  const formItemListAdd: FormItemListProps = useMemo(
    () => [
      {
        name: 'name',
        label: '标签名称',
        rules: labelNameRule,
        props: {
          placeholder: '请输入标签名称',
          onPressEnter: () => {
            if (modalFormRef.current) modalFormRef.current.handleOk();
          },
        },
      },
    ],
    [],
  );

  const formItemListChange: FormItemListProps = useMemo(
    () => [
      {
        name: 'name',
        label: '标签名称',
        rules: labelNameRule,
        props: { placeholder: '请输入标签名称' },
      },
    ],
    [],
  );

  const formItemListBatchAdd: FormItemListProps = useMemo(
    () => [
      {
        name: 'import_mode',
        label: '导入方式',
        rules: importModeRule,
        type: 'RadioGroup',
        props: {
          children: importModeList.map((item, index) => (
            <Radio value={item.value} key={index}>
              {item.label}
            </Radio>
          )),
        },
      },
      {
        name: 'file',
        label: '上传数据',
        type: 'Upload',
        rules: fileUploadRule,
        props: {
          children: <Button icon={<UploadOutlined />}>点击上传</Button>,
          accept: 'text/plain',
          beforeUpload: (file: File) => {
            const isTXT = file.type === 'text/plain';
            const isLt500M = file.size / 1024 / 1024 < 500;

            if (!isTXT) {
              message.error(`请上传txt文件`);
              return Upload.LIST_IGNORE;
            }

            if (!isLt500M) {
              message.error('文件大小需小于500M');
              return Upload.LIST_IGNORE;
            }

            return false;
          },
          maxCount: 1,
        },
      },
      {
        name: 'download',
        wrapperCol: { offset: 5 },
        children: (
          <span
            style={{
              color: '#1890FF',
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onClick={async () => {
              const res = await FileServiceTemplate({ type: 11 });
              downloadFile(res.file_url);
            }}
          >
            示例模板下载
          </span>
        ),
      },
    ],
    [],
  );

  const columns: TableListColumns<ANNOTATION.dataAnnotationLabel> = useMemo(
    () => [
      {
        title: '标签名称',
        dataIndex: 'name',
        render: (text, data) => (
          <Tag
            color={`rgb(${data.color.split('|')[0]}, 
            ${data.color.split('|')[1]}, ${data.color.split('|')[2]})`}
            style={{
              width: 'fit-content',
              borderRadius: '0.4rem',
              whiteSpace: 'normal',
              wordBreak: 'break-all',
            }}
          >
            {text}
          </Tag>
        ),
      },
      {
        align: 'center',
        title: '操作',
        render: (data) =>
          splitButtons(
            <Button
              type="link"
              onClick={() => {
                setInitialValues(data);
                setModalState('修改标签');
                modalFormRef.current?.showModal();
              }}
            >
              修改
            </Button>,
            <Button
              type="link"
              onClick={() => {
                setDeleteData(data);
                setDeleteModalOpen(true);
              }}
            >
              删除
            </Button>,
          ),
      },
    ],
    [],
  );

  // 删除
  const deleteSubmit = useCallback(async () => {
    if (deleteData) {
      await LabelServiceDel({ id: deleteData.id });
      message.success('删除成功');
      setDeleteModalOpen(false);
      tableRef.current?.refresh();
    }
    setDeleteData(null);
  }, [deleteData]);

  const deleteCancel = useCallback(() => {
    setDeleteModalOpen(false);
  }, []);

  // 批量删除
  const batchDeleteSubmit = useCallback(async () => {
    if (batchDeleteData) {
      const _data = [];
      for (const item of batchDeleteData) {
        _data.push(item.id);
      }
      await LabelServiceBatchDel({ ids: _data });
      message.success('删除成功');
      setDeleteModalOpen(false);
      tableRef.current?.refresh();
    }
    setBatchDeleteData([]);
    setBatchDeleteModalOpen(false);
  }, [batchDeleteData]);

  const batchDeleteCancel = useCallback(() => {
    setBatchDeleteModalOpen(false);
  }, []);

  // 关闭提示框（标签上传失败提示）
  const tipsCancel = useCallback(() => {
    setTipsModalOpen(false);
    setTipsData([]);
  }, []);

  const tableParams = useMemo(
    () => ({ label_set_id: labelSetId }),
    [labelSetId],
  );

  return (
    <>
      <TitleModal>{title}</TitleModal>
      <Table
        onRef={tableRef}
        columns={columns}
        service={LabelServicePage}
        tableParams={tableParams}
        rowSelection={{
          type: 'checkbox',
          onChange: (_, data: any[]) => {
            setBatchDeleteData(data);
          },
        }}
        renderButtons={
          <>
            <Button
              onClick={() => {
                if (batchDeleteData.length !== 0) {
                  setBatchDeleteModalOpen(true);
                } else {
                  message.info('请选择要删除的标签');
                }
              }}
            >
              批量删除
            </Button>
            <Button
              onClick={() => {
                setModalState('批量添加');
                modalFormRef.current?.showModal();
              }}
            >
              批量添加
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setModalState('添加标签');
                modalFormRef.current?.showModal();
              }}
            >
              添加标签
            </Button>
          </>
        }
      />
      <ModalForm
        title={modalState}
        ref={modalFormRef}
        onSubmit={onSubmit}
        formProps={{ labelCol: { span: 5 } }}
        initialValues={initialValues}
        formItemList={
          modalState === '添加标签'
            ? formItemListAdd
            : modalState === '修改标签'
            ? formItemListChange
            : formItemListBatchAdd
        }
        onCancel={() => {
          setInitialValues({});
        }}
      />
      <Modal
        title="删除标签"
        open={deleteModalOpen}
        onOk={deleteSubmit}
        onCancel={deleteCancel}
      >
        <div className={styles.deleteModalTop}>
          <p>
            是否确定删除{' '}
            <span className={styles.red}>{deleteData && deleteData.name}</span>{' '}
            这个标签？
          </p>
        </div>
      </Modal>
      <Modal
        title="批量删除标签"
        open={batchDeleteModalOpen}
        onOk={batchDeleteSubmit}
        onCancel={batchDeleteCancel}
      >
        <div className={styles.deleteModalTop}>
          <p>
            是否确定删除{' '}
            {batchDeleteData?.map((item) => (
              <React.Fragment key={item.id}>
                <span className={styles.red}>{item.name}</span>{' '}
              </React.Fragment>
            ))}
            这些标签？
          </p>
        </div>
      </Modal>
      <Modal
        title="部分标签上传失败"
        open={tipsModalOpen}
        onOk={tipsCancel}
        onCancel={tipsCancel}
        footer={[
          <Button key="ok" type="primary" onClick={tipsCancel}>
            确认
          </Button>,
        ]}
      >
        <div className={styles.deleteModalTop}>
          {tipsData?.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default observer(Comp);
