import {useEffect, useMemo, useCallback, useState, useRef} from 'react';
import {message} from 'antd';
import {confirm} from '@/utils/util';
import useForm from '@/hooks/useForm';
import Bottons from '@/components/Bottons';
import useSendDevice from '@/hooks/useSendDevice';
import {
  TaskServiceDelTask,
  TaskServiceAddTask,
  TaskServicePushTask,
  TaskServiceListTask,
} from '@/service/task/TaskService';

type WorkTaskDataProps = {
  name: string;
  group_code: string;
};

export type LinkCurrentNodeProps = {
  isUpdata: boolean;
  canSelect?: any;
};

export type WorkTaskListProps = WorkTaskDataProps & {
  id: string;
  list?: string;
};

export default function useTask(selectOptions: TSAPI.SelectOptionListProps) {
  // 工作任务列表
  const [workTaskList, setWorkTaskList] = useState<WorkTaskListProps[]>([]);

  // 当前选中的工作任务下标
  const [currentWorkTask, setCurrentWorkTask] = useState<WorkTaskListProps>();

  // 当前选中的工作id
  const workTaskIndex = useMemo(
    () => workTaskList.findIndex((task) => task.id === currentWorkTask?.id),
    [currentWorkTask, workTaskList]
  );

  // 设置选中的工作任务
  const workTaskSelect = useMemo(
    () => (index: number) => setCurrentWorkTask(workTaskList[index]),
    [workTaskList]
  );

  // 新增工作任务
  const {add} = useForm<{name: string; code: string[]}>({
    title: '工作任务',
    formItemList: [
      {
        name: 'name',
        label: '任务名称',
        rules: [{required: true, message: '请输入任务名称!'}],
      },
      {
        name: 'code',
        type: 'Select',
        label: '任务分类',
        props: {
          options: selectOptions,
          placeholder: '请选选择任务分类',
          mode: false,
        },
        rules: [{required: true, message: '请选选择任务分类!'}],
      },
    ],
    onSubmit: async (submitData) => {
      const task = {
        id: '',
        list: '[]',
        name: submitData.name,
        group_code: submitData.code[0],
      };
      let data = await TaskServiceAddTask({task});
      message.success('新建任务成功!');
      setWorkTaskList([...workTaskList, data.task]);
    },
  });

  // 工具下标，删除工作任务
  const deleteTaskByIndex = useCallback(
    async (index: number) => {
      await TaskServiceDelTask({id: workTaskList[index].id});
      message.success('删除成功!');
      workTaskList.splice(index, 1);
      setWorkTaskList([...workTaskList]);
    },
    [workTaskList]
  );

  // 链接useFlow的通道, 当数据有更新的时候, 会变更isUpdata的值为true
  const linkCurrentNode = useRef<LinkCurrentNodeProps>({isUpdata: false});

  // 下发工作任务
  const sendTask = useSendDevice(async (devices) => {
    if (!currentWorkTask) return;
    await TaskServicePushTask({id: currentWorkTask.id, devices});
    message.success('已经下发至设备');
  });

  // 切换工作任务时, 如果当前任务被编辑过,需要提醒用户
  const isUpdata = async (index: number) => {
    if (linkCurrentNode.current.isUpdata) {
      await confirm('您的工作区中有未保存的工作任务，是否要离开？');
    }
    workTaskSelect(index);
    linkCurrentNode.current.canSelect && linkCurrentNode.current.canSelect();
  };

  // 显示在左侧中间的操作图标按钮
  const OpenIcon = useCallback(
    () => (
      <span>
        <i onClick={add} className="font_family icon-add" />
        <i
          onClick={sendTask}
          className="font_family icon-fasong icon-skewing"
        />
      </span>
    ),
    [add, sendTask]
  );

  // 显示在左下角的工作任务列表组件
  const WorkTaskList = () => (
    <Bottons
      list={workTaskList}
      activeIndex={workTaskIndex}
      setActiveIndex={isUpdata}
      deleteByIndex={deleteTaskByIndex}
    />
  );

  const initList = useMemo(
    () => (workTaskId?: string) => {
      TaskServiceListTask({page: 1, size: 100}).then((data) => {
        const tasks = data.tasks || [];
        setWorkTaskList(tasks);
        if (!workTaskId) return setCurrentWorkTask(tasks[0]);
        setCurrentWorkTask(tasks.find((task) => task.id === workTaskId));
      });
    },
    []
  );

  // 更新工作任务列表
  const updateWorkTaskList = useMemo(
    () => () => initList(currentWorkTask?.id),
    [initList, currentWorkTask?.id]
  );

  // 获取工作任务列表
  useEffect(() => initList(), [initList]);

  return {
    OpenIcon,
    WorkTaskList,
    currentWorkTask,
    linkCurrentNode,
    updateWorkTaskList,
  };
}
