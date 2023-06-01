import ModalForm, {
  FormItemListProps,
  ImperativeHandleProps,
} from '@/components/ModalForm';
import PageTags from '@/components/PageTags';
import { TableListColumns, TableListRef } from '@/components/TableList';
import { AUTHORITY_ADMIN } from '@/config/constant';
import { ContentModal } from '@/pages/Layout/Content';
import {
  DataServiceAdd,
  DataServiceAppend,
  DataServiceDel,
  DataServiceGet,
  DataServicePage,
  DataServiceUpdate,
} from '@/services/dataAnnotation/DataService';
import { FileServiceTemplate } from '@/services/dataAnnotation/FileService';
import {
  AUDIO_CLASS,
  dataTypeList,
  dataTypeMapText,
  DATATYPE_AUDIO,
  DATATYPE_GENERICS,
  DATATYPE_TEXT,
  TEXT_CLASS,
  TEXT_GENERALIZATION,
} from '@/utils/globalData';
import { splitButtons } from '@/utils/util';
import {
  dataDescribeRule,
  dataNameRule,
  dataTypeRule,
  dataUploadRule,
} from '@/utils/verification';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Modal, Upload } from 'antd';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import Table from './Table';
import useExpandable from './useExpandable';

// 下载文件
export const downloadFile = async (_url: string) => {
  // 判断是否为json文件
  if (_url.indexOf('.json') != -1 || _url.indexOf('.txt') != -1) {
    // 获取文件名
    const index = _url.lastIndexOf('/');
    const fileName = _url.substring(index + 1, _url.length);

    // 获取文件的blob对象
    const _res = await axios.get(_url, {
      responseType: 'blob',
    });

    // 下载文件
    const url = window.URL || window.webkitURL || window;
    const saveLink: any = document.createElement('a');
    saveLink.href = url.createObjectURL(_res.data);
    // 设置 download 属性
    saveLink.download = fileName;
    saveLink.click();
  } else {
    // 下载文件
    const domA = document.createElement('a');
    domA.setAttribute('href', _url);
    domA.setAttribute('download', '');
    domA.click();
  }
};

// 文件mime类型
const jsonType = 'application/json';
const zipType = [
  'application/zip',
  'application/octet-stream',
  'application/x-zip-compressed',
  'multipart/x-zip',
];

// 上传文件限制
const uploadLimit = (file: File, _dataType: number) => {
  const isJSON = file.type === jsonType;
  const isZIP = zipType.indexOf(file.type) != -1;
  const isLt500M = file.size / 1024 / 1024 < 500;

  if (_dataType === DATATYPE_GENERICS) {
    if (!isJSON) {
      message.error(`请上传json文件`);
      return Upload.LIST_IGNORE;
    }
  } else {
    if (!isZIP) {
      message.error(`请上传zip文件`);
      return Upload.LIST_IGNORE;
    }
  }

  if (!isLt500M) {
    message.error('文件大小需小于500M');
    return Upload.LIST_IGNORE;
  }

  return false;
};

const is_total0 = { is_total: 0 };
const is_total1 = { is_total: 1 };

const Comp: React.FC = () => {
  // 对话框的Ref
  const modalFormRef = useRef<ImperativeHandleProps>(null);
  // 对话框的标题
  const [modalState, setModalState] = useState<
    '创建数据集' | '追加数据集' | '修改数据集'
  >('创建数据集');
  // 对话框表单的初始值
  const [initialValues, setInitialValues] = useState<Record<string, unknown>>({
    type: DATATYPE_AUDIO,
  });
  // 删除对话框是否弹出
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  // 删除对话框的数据
  const [deleteData, setDeleteData] = useState<any>();
  // 表格的Ref
  const tableRef1 = useRef<TableListRef>();
  const tableRef2 = useRef<TableListRef>();
  // 路由跳转
  const navigate = useNavigate();
  // 数据集类型
  const [dataType, setDataType] = useState<number>(DATATYPE_AUDIO);
  // 上传失败弹出框
  const [tipsModalOpen, setTipsModalOpen] = useState<boolean>(false);
  // 提示语
  const [tipsData, setTipsData] = useState<string>('');
  // 上传失败弹出框标题
  const [tipsModalTitle, setTipsModalTitle] = useState<string>('');

  // 展开配置
  const { expandable, update } = useExpandable(DataServiceGet);

  // 获取上传文件和下载模板的formItem
  const getFormItemListPart: any = useCallback(
    (_dataType: number, _defaultFileList: any = []) => {
      return [
        {
          label: '上传数据',
          name: 'file',
          type: 'Upload',
          rules: dataUploadRule,
          props: {
            children: <Button icon={<UploadOutlined />}>点击上传</Button>,
            accept:
              _dataType === DATATYPE_GENERICS ? jsonType : zipType.toString(),
            beforeUpload: (file: File) => {
              return uploadLimit(file, _dataType);
            },
            disabled: _defaultFileList.length === 0 ? false : true,
            maxCount: 1,
            defaultFileList: _defaultFileList,
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
                const res = await FileServiceTemplate({ type: _dataType });
                downloadFile(res.file_url);
              }}
            >
              示例模板下载
            </span>
          ),
        },
      ];
    },
    [],
  );

  // 删除原有formItem，获取上传文件和下载模板的formItem
  const getFormItemListCreatePart: any = useCallback(
    (_dataType: number = DATATYPE_AUDIO, _defaultFileList: any = []) => {
      setFormItemListCreate((data) => {
        return data.filter(
          (_val) => _val.name !== 'file' && _val.name !== 'download',
        );
      });
      setFormItemListCreate((data) => [
        ...data,
        ...getFormItemListPart(_dataType, _defaultFileList),
      ]);
    },
    [getFormItemListPart],
  );

  const getFormItemListAppendPart: any = useCallback(
    (_dataType: number = DATATYPE_AUDIO, _defaultFileList: any = []) => {
      setFormItemListAppend((data) => {
        return data.filter(
          (_val) => _val.name !== 'file' && _val.name !== 'download',
        );
      });
      setFormItemListAppend((data) => [
        ...data,
        ...getFormItemListPart(_dataType, _defaultFileList),
      ]);
    },
    [getFormItemListPart],
  );

  const [formItemListCreate, setFormItemListCreate] =
    useState<FormItemListProps>([
      {
        name: 'name',
        label: '数据集名称',
        rules: dataNameRule,
        props: { placeholder: '请输入数据集名称' },
      },
      {
        name: 'describe',
        label: '数据集描述',
        rules: dataDescribeRule,
        type: 'TextArea',
        props: { placeholder: '请输入数据集描述' },
      },
      {
        name: 'type',
        label: '数据集类型',
        rules: dataTypeRule,
        type: 'Select',
        props: {
          allowClear: false,
          placeholder: '请选择数据集类型',
          options: dataTypeList,
          onChange: (val: any) => {
            setDataType(val);
            getFormItemListCreatePart(val);
          },
        },
      },
      ...getFormItemListPart(dataType),
    ]);

  const [formItemListAppend, setFormItemListAppend] =
    useState<FormItemListProps>(getFormItemListPart());

  const formItemListChange: FormItemListProps = useMemo(
    () => [
      {
        name: 'name',
        label: '数据集名称',
        rules: dataNameRule,
        props: { placeholder: '请输入数据集名称' },
      },
      {
        name: 'describe',
        label: '数据集描述',
        rules: dataDescribeRule,
        type: 'TextArea',
        props: { placeholder: '请输入数据集描述' },
      },
    ],
    [],
  );

  // 提交对话框表单
  const onSubmit = useCallback(
    async (data: any) => {
      if (modalState === '创建数据集') {
        const formData: any = new FormData();
        formData.append('name', data.name);
        if (data.describe) {
          formData.append('describe', data.describe);
        }
        formData.append('type', data.type);
        formData.append('file', data.file.file);
        // 上传按钮设置为禁用
        getFormItemListCreatePart(dataType, [{ name: data.file.file.name }]);
        try {
          await DataServiceAdd(formData, { showMessage: false });
          message.success('创建成功');
          tableRef1.current?.refresh();
          tableRef2.current?.refresh();
          getFormItemListCreatePart();
        } catch (error: any) {
          setTipsModalTitle('创建失败');
          setTipsModalOpen(true);
          setTipsData(error.msg);
          getFormItemListCreatePart(dataType);
          return Promise.reject();
        }
      } else if (modalState === '追加数据集') {
        const formData: any = new FormData();
        formData.append('id', data.id);
        formData.append('file', data.file.file);
        // 上传按钮设置为禁用
        getFormItemListAppendPart(dataType, [{ name: data.file.file.name }]);
        try {
          await DataServiceAppend(formData, { showMessage: false });
          message.success('追加成功');
          tableRef1.current?.refresh();
          tableRef2.current?.refresh();
          getFormItemListAppendPart();
        } catch (error: any) {
          setTipsModalTitle('追加失败');
          setTipsModalOpen(true);
          setTipsData(error.msg);
          getFormItemListAppendPart(dataType);
          return Promise.reject();
        }
      } else if (modalState === '修改数据集') {
        await DataServiceUpdate(data);
        message.success('修改成功');
        tableRef1.current?.refresh();
        tableRef2.current?.refresh();
        // 获取展开详情的数据
        const _res = await DataServiceGet({ id: data.id });
        update(data.id, _res.item);
      }
      // 重置
      setInitialValues({ type: DATATYPE_AUDIO });
      return Promise.resolve();
    },
    [
      dataType,
      getFormItemListAppendPart,
      getFormItemListCreatePart,
      modalState,
      update,
    ],
  );

  const columns: TableListColumns<ANNOTATION.dataAnnotationUser> = useMemo(
    () => [
      {
        title: '数据集名称',
        dataIndex: 'name',
        render: (name, row) => (
          <Link to={`/data/source/detalis/${AUTHORITY_ADMIN}/${row.id}`}>
            {name}
          </Link>
        ),
        width: 130,
      },
      {
        title: '数据集类型',
        dataIndex: 'type',
        render: (text) => dataTypeMapText[text],
        width: 130,
      },
      {
        title: '样本数量',
        dataIndex: 'sample_count',
        width: 110,
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
        width: 330,
        align: 'center',
        title: '操作',
        render: (data) =>
          splitButtons(
            <Button
              type="link"
              onClick={() => {
                setDataType(data.type);
                setFormItemListAppend(() => [
                  ...getFormItemListPart(data.type),
                ]);
                setInitialValues(data);
                setModalState('追加数据集');
                modalFormRef.current?.showModal();
              }}
            >
              追加
            </Button>,
            <Button
              type="link"
              onClick={() => {
                setInitialValues(data);
                setModalState('修改数据集');
                modalFormRef.current?.showModal();
              }}
            >
              修改
            </Button>,
            <Button
              type="link"
              onClick={() => {
                let markType;
                if (data.type === DATATYPE_AUDIO) {
                  markType = AUDIO_CLASS;
                } else if (data.type === DATATYPE_TEXT) {
                  markType = TEXT_CLASS;
                } else if (data.type === DATATYPE_GENERICS) {
                  markType = TEXT_GENERALIZATION;
                }
                navigate(
                  `/task/index/create?dataId=${data.id}&markType=${markType}`,
                );
              }}
            >
              创建标注
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
    [getFormItemListPart, navigate],
  );

  const items = useMemo(
    () => [
      {
        label: '我创建的',
        key: 'item-1',
        children: (
          <Table
            onRef={tableRef1}
            tableParams={is_total0}
            columns={columns}
            service={DataServicePage}
            expandable={expandable}
          />
        ),
      },
      {
        label: '所有的',
        key: 'item-2',
        children: (
          <Table
            onRef={tableRef2}
            tableParams={is_total1}
            columns={columns}
            service={DataServicePage}
            expandable={expandable}
          />
        ),
      },
    ],
    [columns, expandable],
  );

  // 删除
  const deleteSubmit = useCallback(async () => {
    if (deleteData) {
      await DataServiceDel({ id: deleteData.id });
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

  // 关闭提示框（上传失败提示）
  const tipsCancel = useCallback(() => {
    setTipsModalOpen(false);
    setTipsData('');
  }, []);

  return (
    <>
      <ContentModal>
        <Button
          type="primary"
          onClick={() => {
            setModalState('创建数据集');
            modalFormRef.current?.showModal();
          }}
        >
          创建数据集
        </Button>
      </ContentModal>
      <PageTags items={items} />
      <ModalForm
        title={modalState}
        ref={modalFormRef}
        onSubmit={onSubmit}
        zIndex={10}
        formProps={{ labelCol: { span: 5 } }}
        initialValues={initialValues}
        formItemList={
          modalState === '创建数据集'
            ? formItemListCreate
            : modalState === '追加数据集'
            ? formItemListAppend
            : formItemListChange
        }
        onCancel={() => {
          setInitialValues({ type: DATATYPE_AUDIO });
        }}
      />
      <Modal
        title="删除数据集"
        open={deleteModalOpen}
        onOk={deleteSubmit}
        onCancel={deleteCancel}
      >
        <div className={styles.deleteModalTop}>
          <p>
            是否确定删除{' '}
            <span className={styles.red}>{deleteData && deleteData.name}</span>{' '}
            这个数据集？
          </p>
        </div>
      </Modal>
      <Modal
        title={tipsModalTitle}
        open={tipsModalOpen}
        onOk={tipsCancel}
        onCancel={tipsCancel}
        zIndex={100}
        footer={[
          <Button key="ok" type="primary" onClick={tipsCancel}>
            确认
          </Button>,
        ]}
      >
        <div className={styles.deleteModalTop}>{tipsData}</div>
      </Modal>
    </>
  );
};

export default observer(Comp);
