import ModalForm, {
  FormItemListProps,
  ImperativeHandleProps,
} from '@/components/ModalForm';
import PageTags from '@/components/PageTags';
import { TableListColumns, TableListRef } from '@/components/TableList';
import { ContentModal } from '@/pages/Layout/Content';
import {
  isMultipleSelectList,
  isMultipleSelectMapText,
  labelList,
  labelMapText,
} from '@/utils/globalData';
import { splitButtons } from '@/utils/util';
import { Button, message, Modal, Radio } from 'antd';

import { observer } from 'mobx-react-lite';
import { useCallback, useMemo, useRef, useState } from 'react';
import styles from './index.module.less';
import Table from './Table';
import { Link } from 'react-router-dom';
import {
  LabelSetServiceAdd,
  LabelSetServiceDel,
  LabelSetServicePage,
  LabelSetServiceUpdate,
  LabelSetServiceCopy,
} from '@/services/dataAnnotation/LabelSetService';
import {
  isMultipleSelectTypeRule,
  labelSetDescribeRule,
  labelSetNameRule,
  labelSetTypeRule,
} from '@/utils/verification';

const Comp: React.FC = () => {
  // 对话框的Ref
  const modalFormRef = useRef<ImperativeHandleProps>(null);
  // 对话框的标题
  const [modalState, setModalState] = useState<
    '创建标签集' | '修改标签集' | '创建标签集（复制）'
  >('创建标签集');
  // 对话框的初始值
  const [initialValues, setInitialValues] = useState<Record<string, unknown>>(
    {},
  );
  // 删除的对话框
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<any>();
  // 表格的Ref
  const tableRef1 = useRef<TableListRef>();
  const tableRef2 = useRef<TableListRef>();

  const formItemListCreate: FormItemListProps = useMemo(
    () => [
      {
        name: 'name',
        label: '标签集名称',
        rules: labelSetNameRule,
        props: { placeholder: '请输入标签集名称' },
      },
      {
        name: 'describe',
        label: '标签集描述',
        rules: labelSetDescribeRule,
        type: 'TextArea',
        props: { placeholder: '请输入标签集描述' },
      },
      {
        name: 'type',
        label: '标签集类型',
        rules: labelSetTypeRule,
        type: 'Select',
        props: {
          placeholder: '请选择标签集类型',
          options: labelList,
          disabled: modalState === '创建标签集（复制）' ? true : false,
        },
      },
      {
        name: 'is_multiple_select',
        label: '标签是否多选',
        rules: isMultipleSelectTypeRule,
        type: 'RadioGroup',
        props: {
          placeholder: '请选择标签集类型',
          name: 'is_multiple_select',
          children: isMultipleSelectList.map((item, index) => (
            <Radio value={item.value} key={index}>
              {item.label}
            </Radio>
          )),
        },
      },
    ],
    [modalState],
  );

  const formItemListUpdate: FormItemListProps = useMemo(
    () => [
      {
        name: 'name',
        label: '标签集名称',
        rules: labelSetNameRule,
        props: { placeholder: '请输入标签集名称' },
      },
      {
        name: 'describe',
        label: '标签集描述',
        rules: labelSetDescribeRule,
        type: 'TextArea',
        props: { placeholder: '请输入标签集描述' },
      },
    ],
    [],
  );

  // 提交对话框表单
  const onSubmit = useCallback(
    async (data: any) => {
      if (modalState === '创建标签集') {
        await LabelSetServiceAdd({
          item: data,
        });

        message.success('创建成功');
        tableRef1.current?.refresh();
        tableRef2.current?.refresh();
      } else if (modalState === '修改标签集') {
        await LabelSetServiceUpdate({
          item: data,
        });

        message.success('修改成功');
        tableRef1.current?.refresh();
        tableRef2.current?.refresh();
      } else if (modalState === '创建标签集（复制）') {
        await LabelSetServiceCopy(data);
        message.success('创建成功');
        tableRef1.current?.refresh();
        tableRef2.current?.refresh();
      }
      setInitialValues({});
    },
    [modalState],
  );

  const columns: TableListColumns<ANNOTATION.dataAnnotationUser> = useMemo(
    () => [
      {
        title: '标签集名称',
        dataIndex: 'name',
        width: 130,
        render: (text, data) => (
          <Link to={`/data/labelSet/detalis?id=${data.id}&name=${data.name}`}>
            {text}
          </Link>
        )
      },
      {
        title: '类型',
        dataIndex: 'type',
        render: (text) => labelMapText[text],
        width: 80,
      },
      {
        title: '是否多选',
        dataIndex: 'is_multiple_select',
        render: (text) => isMultipleSelectMapText[text],
        width: 110,
      },
      {
        title: '描述',
        dataIndex: 'describe',
        width: 80,
      },
      {
        title: '创建人',
        dataIndex: 'create_username',
        width: 90,
      },
      {
        type: 'dateTime',
        title: '创建时间',
        dataIndex: 'create_time',
        width: 180,
      },
      {
        width: 270,
        align: 'center',
        title: '操作',
        render: (data) =>
          splitButtons(
            <Link to={`/data/labelSet/detalis?id=${data.id}&name=${data.name}`}>
              管理
            </Link>,
            <Button
              type="link"
              onClick={() => {
                setInitialValues(data);
                setModalState('修改标签集');
                modalFormRef.current?.showModal();
              }}
            >
              修改
            </Button>,
            <Button
              type="link"
              onClick={() => {
                data['source_id'] = data.id;
                setInitialValues(data);
                setModalState('创建标签集（复制）');
                modalFormRef.current?.showModal();
              }}
            >
              复制
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

  const items = useMemo(
    () => [
      {
        label: '我创建的',
        key: 'item-1',
        children: (
          <Table
            onRef={tableRef1}
            tableParams={{ is_total: 0 }}
            columns={columns}
            service={LabelSetServicePage}
          />
        ),
      },
      {
        label: '所有的',
        key: 'item-2',
        children: (
          <Table
            onRef={tableRef2}
            tableParams={{ is_total: 1 }}
            columns={columns}
            service={LabelSetServicePage}
          />
        ),
      },
    ],
    [columns],
  );

  // 删除
  const deleteSubmit = useCallback(async () => {
    if (deleteData) {
      await LabelSetServiceDel({ id: deleteData.id });
      message.success('删除成功');
      setDeleteModalOpen(false);
      tableRef1.current?.refresh();
      tableRef2.current?.refresh();
    }
    setDeleteData(null);
  }, [deleteData]);

  const deleteCancel = useCallback(() => {
    setDeleteModalOpen(false);
  }, []);

  return (
    <>
      <ContentModal>
        <Button
          type="primary"
          onClick={() => {
            setModalState('创建标签集');
            modalFormRef.current?.showModal();
          }}
        >
          创建标签集
        </Button>
      </ContentModal>
      <PageTags items={items} />
      <ModalForm
        title={modalState === '修改标签集' ? '修改标签集' : '创建标签集'}
        ref={modalFormRef}
        onSubmit={onSubmit}
        formProps={{ labelCol: { span: 6 } }}
        initialValues={initialValues}
        formItemList={
          modalState === '修改标签集' ? formItemListUpdate : formItemListCreate
        }
        onCancel={() => {
          setInitialValues({});
        }}
      />
      <Modal
        title="删除标签集"
        open={deleteModalOpen}
        onOk={deleteSubmit}
        onCancel={deleteCancel}
      >
        <div className={styles.deleteModalTop}>
          <p>
            是否确定删除{' '}
            <span className={styles.red}>{deleteData && deleteData.name}</span>{' '}
            这个标签集？
          </p>
        </div>
      </Modal>
    </>
  );
};

export default observer(Comp);
