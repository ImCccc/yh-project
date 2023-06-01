import { Button, message } from 'antd';
import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import TableList, {
  TableListColumns,
  TableListRef,
} from '@/components/TableList';
import TableSearch, { FieldsProps } from '@/components/TableSearch';
import ModalForm, {
  FormItemListProps,
  ImperativeHandleProps,
} from '@/components/ModalForm';
import {
  TaskServicePage,
  TaskServiceUpdate,
  TaskServiceCreate,
  TaskServiceDelete,
  TaskServiceHideStatus,
  TaskServiceLoadLabel,
} from '@/services/smzx/TaskService';
import { GetMapList } from '@/services/gateway';
import { ListProps } from '@/utils/globalData';

type ParamsProps = { product_id?: string };

const fields: FieldsProps = [
  {
    label: '任务名称',
    key: 'name',
    placeholder: '请输入任务名称',
  },
];

const Comp: React.FC = () => {
  const tableRef = useRef<TableListRef>();
  const modalFormRef = useRef<ImperativeHandleProps>(null);
  const [params, setParams] = useState<ParamsProps>({});
  const [initialValues, setInitialValues] = useState<SMZX.smzxTaskCreateReq>();

  const [tagList, setTagList] = useState<ListProps[]>([]);
  useEffect(() => {
    TaskServiceLoadLabel({}).then(({ tab_list }) => {
      setTagList(
        tab_list.map((item) => ({
          label: item.code,
          value: item.code,
        })),
      );
    });
  }, []);

  const [mapList, setMapList] = useState<ListProps[]>([]);
  useEffect(() => {
    GetMapList().then(({ data }) => {
      setMapList(
        data.map((item) => ({
          label: `${item.map_name} (${item.id})`,
          value: item.id,
        })),
      );
    });
  }, []);

  const mapIdToText = useMemo(() => {
    return mapList.reduce((data, cur) => {
      data[cur.value] = cur.label;
      return data;
    }, {} as { [key: string]: string });
  }, [mapList]);

  // 点击查询
  const onSearch = (data: ParamsProps) => setParams({ ...data });

  const columns = useMemo<TableListColumns<SMZX.smzxTaskDetail>>(() => {
    return [
      {
        width: 230,
        ellipsis: false,
        title: '任务名称',
        dataIndex: 'name',
      },
      {
        width: 190,
        ellipsis: false,
        title: '地图名(地图ID)',
        dataIndex: 'map_id',
        render: (id) => mapIdToText[id] || id,
      },
      {
        ellipsis: false,
        title: '分组',
        dataIndex: 'tab',
      },
      {
        width: 100,
        ellipsis: false,
        title: '当前状态',
        dataIndex: 'hide',
        render: (hide) => (hide === 1 ? '隐藏' : '显示'),
      },
      {
        ellipsis: false,
        title: '创建时间',
        dataIndex: 'date_created',
        timeFormat: 'YYYY-MM-DD HH:mm:ss',
      },
      {
        width: 280,
        ellipsis: false,
        operList: [
          {
            label: '编辑',
            callback: (row) => {
              setInitialValues({ ...row });
              modalFormRef.current?.showModal();
            },
          },
          {
            label: '切换状态',
            callback: async (row) => {
              row.hide = +!row.hide;
              await TaskServiceHideStatus({ code: row.code, hide: row.hide });
              tableRef.current?.refresh();
            },
          },
          {
            label: '删除',
            confirmKey: 'name',
            callback: (row) => TaskServiceDelete({ code: row.code }),
          },
        ],
      },
    ];
  }, [mapIdToText]);

  const onSubmit = useCallback(
    async (data: SMZX.smzxTaskUpdateReq) => {
      if (initialValues) {
        await TaskServiceUpdate(data);
        message.success('修改成功!');
      } else {
        await TaskServiceCreate(data);
        message.success('新增成功!');
      }
      tableRef.current?.refresh();
    },
    [initialValues],
  );

  const formItemList: FormItemListProps = useMemo(() => {
    return [
      {
        name: 'name',
        label: '任务名称',
        rules: [{ required: true, message: '请输入任务名称!' }],
        props: { placeholder: '请输入任务名称' },
      },
      {
        name: 'tab',
        type: 'Select',
        label: '标签',
        rules: [{ required: true, message: '请选选择标签!' }],
        props: {
          options: tagList,
          showSearch: true,
          placeholder: '请选择或输入标签',
          onBlur: (e: any) => {
            const value = e.target.value.trim();
            if (!value) return;
            modalFormRef.current?.setFieldValue('tab', value);
          },
          onInputKeyDown: (e: any) => {
            if (e.code === 'Enter') {
              const value = e.target.value.trim();
              if (!value) return;
              modalFormRef.current?.setFieldValue('tab', value);
            }
          },
        },
      },
      {
        type: 'Select',
        name: 'map_id',
        label: '地图 Id',
        rules: [{ required: true, message: '请选选择地图 Id!' }],
        props: {
          placeholder: '请选择地图 Id',
          options: mapList,
        },
      },
      {
        name: 'task_url',
        label: '任务模板',
        type: 'Upload',
        rules: [{ required: true, message: '请上传任务模板!' }],
        props: {
          accept: '.xlsx,',
          placeholder: '请上传任务模板',
          params: {
            bucket: 'smzx',
            object: 'task',
          },
        },
      },
    ];
  }, [mapList, tagList]);

  const afterClose = useCallback(() => setInitialValues(undefined), []);

  return (
    <div className="common-page">
      <TableSearch
        className="margin-space"
        fields={fields}
        onSearch={onSearch}
        renderButtons={() => (
          <>
            <Button onClick={() => modalFormRef.current?.showModal()}>
              新增任务
            </Button>
            <ModalForm
              ref={modalFormRef}
              onSubmit={onSubmit}
              afterClose={afterClose}
              formItemList={formItemList}
              initialValues={initialValues}
              formProps={{ labelCol: { span: 5 } }}
              title={initialValues ? '编辑任务' : '新增任务'}
            ></ModalForm>
          </>
        )}
      />
      <TableList
        rowKey="code"
        onRef={tableRef}
        columns={columns}
        reqParams={params}
        service={TaskServicePage}
      />
    </div>
  );
};

export default Comp;
