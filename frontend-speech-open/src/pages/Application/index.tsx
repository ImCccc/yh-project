import { Ref, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  FormItemProps,
  Input,
  InputRef,
  message,
  Modal,
  Table,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { observer } from 'mobx-react-lite';

import Loading from '@/components/Loading';
import DrySelect from '@/components/Select';
import useAppTypeList from '@/hooks/useAppTypeList';
import { useMobx } from '@/stores';
import { statusMapText } from '@/utils/globalData';
import { formatDate } from '@/utils/util';

import {
  AppServiceDelete,
  AppServiceUpdate,
} from '@/services/speechOpen/AppService';
import {
  SdkServiceDownload,
  SdkServiceList,
} from '@/services/speechOpen/SdkService';

import styles from './index.module.less';

type AppInfoProps = Partial<SPEECHOPEN.speechopenAppDetailInfo>;

type CopyInputProps = FormItemProps & { readOnly?: boolean; title: string };
const CopyInput: React.FC<CopyInputProps> = ({ title, readOnly, ...props }) => {
  const inputRef: Ref<InputRef> = useRef(null);
  const copy = useCallback(() => {
    inputRef.current?.select();
    document.execCommand('Copy');
    message.success('复制成功!');
  }, []);
  const After = (
    <span
      title={title}
      onClick={copy}
      className="iconfont icon_fuzhi link"
    ></span>
  );
  return (
    <Form.Item {...props}>
      <Input readOnly={readOnly !== false} ref={inputRef} addonAfter={After} />
    </Form.Item>
  );
};

const App: React.FC = () => {
  const { appInfo: globalInfo, updateAppInfo } = useMobx('appInfo');
  const { id } = useParams();
  const navigate = useNavigate();
  const { typeList } = useAppTypeList();
  const [appInfo, setAppInfo] = useState<AppInfoProps>({});
  const [sdkInfos, setSdkInfos] = useState<SPEECHOPEN.speechopenSdk[]>([]);

  const [isDownload, setIsDownload] = useState<boolean>(false);

  const columns: ColumnsType<SPEECHOPEN.speechopenSdk> = useMemo(() => {
    if (!appInfo.id) return [];

    return [
      {
        title: '操作系统',
        dataIndex: 'system',
      },
      {
        title: '版本',
        dataIndex: 'version',
        align: 'center',
      },
      {
        title: '更新日期',
        dataIndex: 'date',
        align: 'center',
        render: (date) => formatDate(date),
      },
      {
        title: '更新说明',
        align: 'center',
        dataIndex: 'update_note',
      },
      {
        title: 'SDK下载',
        align: 'center',
        dataIndex: 'sdk_url',
        render: (_, row) => {
          const download = async () => {
            if (isDownload) return;

            setIsDownload(true);
            try {
              const { file_url } = await SdkServiceDownload({
                app_id: appInfo.id || '',
                system: row.system,
              });
              setIsDownload(false);
              window.open(file_url);
            } catch (error) {
              setIsDownload(false);
            }
          };

          return <a onClick={download}>{isDownload ? '下载中...' : '下载'} </a>;
        },
      },
    ];
  }, [appInfo.id, isDownload]);

  const statusList = useMemo(() => {
    if (!appInfo.id) return [];

    let label = statusMapText[appInfo.status || 0] || '';

    if (appInfo.status) {
      // 需要显示 '发布中' 或者 '发布失败' 的版本号
      if (+appInfo.status === 1 || +appInfo.status === 3) {
        label += `(${appInfo.version})`;
      }
    }

    return [{ label, value: appInfo.status }];
  }, [appInfo]);

  useEffect(() => {
    SdkServiceList({}).then(({ list }) => setSdkInfos(list));
  }, []);

  // 初始化 app 信息
  useEffect(() => {
    setAppInfo({ ...globalInfo } || {});
  }, [globalInfo]);

  const onFinish = useCallback(
    async (values: SPEECHOPEN.speechopenAppUpdateReq) => {
      if (!id) return;
      values.id = id;
      await AppServiceUpdate(values);
      message.success('保存成功!');
      updateAppInfo(values); // 更新全局应用信息
    },
    [id, updateAppInfo],
  );

  const deleteApp = useMemo(
    () => () => {
      Modal.confirm({
        content: null,
        okText: '确定',
        cancelText: '取消',
        title: '确定要删除?',
        icon: <ExclamationCircleOutlined />,
        onOk: async () => {
          if (!id) return;
          await AppServiceDelete({ ids: [id] });
          message.success('应用删除成功!', 1, () => navigate('/'));
        },
      });
    },
    [id, navigate],
  );

  return (
    <div className="common-page">
      <div className={styles.sdk}>
        <span className={styles.tableLabel}>SDK 信息</span>
        <Table
          rowKey="system"
          className={styles.table}
          columns={columns}
          pagination={false}
          dataSource={sdkInfos}
        />
      </div>
      {appInfo.id && (
        <Form
          name="wrap"
          labelAlign="right"
          colon={false}
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          className={styles.form}
          initialValues={appInfo}
        >
          <Form.Item label="应用状态" name="status">
            <DrySelect
              disabled
              className={styles.select}
              options={statusList}
            />
          </Form.Item>
          <Form.Item label="上线版本" name="online_version">
            <Input readOnly />
          </Form.Item>
          <CopyInput label="App Key" name="appkey" title="复制 App Key" />
          <CopyInput label="App Id" name="appid" title="复制 App Id" />
          <Form.Item
            label="应用名称"
            name="name"
            rules={[{ required: true, message: '请输入应用名称' }]}
          >
            <Input placeholder="请输入应用名称" />
          </Form.Item>
          <Form.Item
            label="应用分类"
            name="type"
            rules={[{ required: true, message: '请输入应用分类' }]}
          >
            <DrySelect placeholder="请选择应用分类" options={typeList} />
          </Form.Item>
          <CopyInput
            readOnly={false}
            label="Aiui Appkey"
            name="aiui_appkey"
            title="复制 Aiui Appkey"
          />
          <Form.Item label="Aiui appId" name="aiui_appid">
            <Input placeholder="请输入AIUI appId" />
          </Form.Item>
          <Form.Item label="Aiui Scene" name="aiui_scene">
            <Input placeholder="请输入Aiui Scene" />
          </Form.Item>
          <Form.Item label="TTS AppId" name="tts_appid">
            <Input placeholder="请输入TTS AppId" />
          </Form.Item>
          <Form.Item label="应用描述" name="describe">
            <Input.TextArea rows={2} placeholder="请输入应用描述" />
          </Form.Item>
          <div className={styles.bottom}>
            <Button type="primary" danger onClick={deleteApp}>
              删除应用
            </Button>
            <Button type="primary" htmlType="submit">
              保存修改
            </Button>
          </div>
        </Form>
      )}
      {!appInfo.id && <Loading />}
    </div>
  );
};

export default observer(App);
