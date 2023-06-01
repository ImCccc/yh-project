import { Button, Image, message } from 'antd';
import { useState, useRef, useCallback, useMemo } from 'react';

import TableList, {
  TableListRef,
  TableListColumns,
} from '@/components/TableList';
import ModalForm, {
  FormItemListProps,
  ImperativeHandleProps,
} from '@/components/ModalForm';
import {
  IcescreenVideoServiceDel,
  IcescreenVideoServiceAdd,
  IcescreenVideoServicePage,
  IcescreenVideoServiceUpdate,
} from '@/services/smzx/IcescreenVideoService';
import styles from './index.module.less';

const uploadImagsParams = {
  bucket: 'smzx',
  object: 'video/icescreen',
};

const Comp: React.FC = () => {
  const tableRef = useRef<TableListRef>();
  const addModalFormRef = useRef<ImperativeHandleProps>(null);
  const editModalFormRef = useRef<ImperativeHandleProps>(null);
  const [initialValues, setInitialValues] = useState<SMZX.smzxIcescreenVideo>();

  // 当前是编辑还是新增
  const thisModal = useRef<'add' | 'edit' | ''>('');

  const columns = useMemo<TableListColumns<SMZX.smzxIcescreenVideo>>(() => {
    return [
      {
        title: '视频id',
        dataIndex: 'id',
      },
      {
        width: 150,
        title: '视频名称',
        dataIndex: 'name',
      },
      {
        width: 100,
        title: '视频宽',
        dataIndex: 'width',
      },
      {
        width: 100,
        title: '视频高',
        dataIndex: 'height',
      },
      {
        title: '缩略图',
        dataIndex: 'scale_url',
        render: (scale_url) => <Image height={40} src={scale_url} />,
      },
      {
        width: 260,
        operList: [
          {
            label: '播放',
            callback: (row) => {
              window.open(row.video_url);
            },
          },
          {
            label: '编辑',
            callback: async (row) => {
              setInitialValues({ ...row } as any);
              thisModal.current = 'edit';
              editModalFormRef.current?.showModal();
            },
          },
          {
            label: '删除',
            confirmKey: 'name',
            callback: (row) => IcescreenVideoServiceDel({ id: row.id }),
          },
        ],
      },
    ];
  }, []);

  const add = useCallback(async (data: SMZX.smzxIcescreenVideo) => {
    await IcescreenVideoServiceAdd({ icescreen_video: data });
    message.success('新增成功');
    tableRef.current?.refresh();
  }, []);

  const edit = useCallback(async (data: SMZX.smzxIcescreenVideo) => {
    await IcescreenVideoServiceUpdate({ icescreen_video: data });
    message.success('修改成功');
    tableRef.current?.refresh();
  }, []);

  const customVerification = useCallback((file: any) => {
    const videoElement = document.createElement('video');
    videoElement.addEventListener('loadedmetadata', () => {
      const videoWidth = videoElement.videoWidth;
      const videoHeight = videoElement.videoHeight;
      if (thisModal.current === 'add') {
        addModalFormRef.current?.setFieldValue('width', videoWidth);
        addModalFormRef.current?.setFieldValue('height', videoHeight);
      } else {
        editModalFormRef.current?.setFieldValue('width', videoWidth);
        editModalFormRef.current?.setFieldValue('height', videoHeight);
      }
    });
    videoElement.src = window.URL.createObjectURL(file);
    return true;
  }, []);

  const formItemList: FormItemListProps = useMemo(() => {
    return [
      {
        name: 'name',
        label: '视频名称',
        rules: [{ required: true, message: '请输入视频名称!' }],
        props: { placeholder: '请输入视频名称' },
      },
      {
        name: 'width',
        label: '视频宽度',
        rules: [{ required: true, message: '请输入视频宽度!' }],
        props: {
          disabled: true,
          placeholder: '请输入视频宽度',
        },
      },
      {
        name: 'height',
        label: '视频高度',
        rules: [{ required: true, message: '请输入视频高度!' }],
        props: {
          disabled: true,
          placeholder: '请输入视频高度',
        },
      },
      {
        name: 'video_url',
        label: '上传视频',
        type: 'Upload',
        rules: [{ required: true, message: '上传视频!' }],
        props: {
          placeholder: '上传视频',
          params: uploadImagsParams,
          customVerification: (file: any) => customVerification(file),
        },
      },
      {
        name: 'scale_url',
        label: '缩略图',
        type: 'Upload',
        rules: [{ required: true, message: '请上传图片!' }],
        props: {
          listType: 'picture-card',
          placeholder: '请上传图片',
          params: uploadImagsParams,
        },
      },
    ];
  }, [customVerification]);

  return (
    <div className="common-page">
      <div className={styles.top}>
        <Button
          type="primary"
          onClick={() => {
            thisModal.current = 'add';
            addModalFormRef.current?.showModal();
          }}
        >
          新增视频
        </Button>
        <ModalForm
          title="新增视频"
          onSubmit={add}
          ref={addModalFormRef}
          formItemList={formItemList}
          formProps={{ labelCol: { span: 4 } }}
        />
        <ModalForm
          title="编辑视频"
          onSubmit={edit}
          ref={editModalFormRef}
          formItemList={formItemList}
          initialValues={initialValues}
          formProps={{ labelCol: { span: 4 } }}
        />
      </div>
      <TableList
        onRef={tableRef}
        columns={columns}
        service={IcescreenVideoServicePage}
      />
    </div>
  );
};

export default Comp;
