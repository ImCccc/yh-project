import {message} from 'antd';
import useForm from '@/hooks/useForm';
import {
  TaskGroupServiceAddTaskGroup,
  TaskGroupServiceUpdateTaskGroup,
} from '@/service/task-group/TaskGroupService';
import Bottons from '@/components/Bottons';
import {TaskClassifyListExampleProps} from '@/stores';
import {TaskClassifyProps} from '@/stores/TaskClassifyList';

type UpdataTaskProps = (taskIndex: number) => void;

const getFormitem = (disabled = false) => {
  return [
    {
      name: 'name',
      label: '任务分类名称',
      rules: [{required: true, message: '请输入任务分类名称!'}],
    },
    {
      name: 'code',
      label: '任务分类标识',
      rules: [{required: true, message: '请输入任务分类!'}],
      props: {disabled},
    },
  ];
};

function useTask(TaskClassifyList: TaskClassifyListExampleProps) {
  const taskClassifyList = TaskClassifyList.list;

  // 新增任务分类
  const {add: addTaskClassify} = useForm<TaskClassifyProps>({
    title: '任务分类',
    formItemList: getFormitem(),
    onSubmit: async (submitData) => {
      let data = await TaskGroupServiceAddTaskGroup({task_group: submitData});
      message.success('新建成功!');
      TaskClassifyList.addTaskClassify(data.task_group);
    },
  });

  // 更新任务分类
  const {updata} = useForm<TaskClassifyProps>({
    title: '任务分类',
    formItemList: getFormitem(true),
    onSubmit: async (submitData) => {
      let servive = TaskGroupServiceUpdateTaskGroup;
      let data = await servive({task_group: submitData});
      message.success('保存成功!');
      TaskClassifyList.updateTaskClassify(data.task_group);
    },
  });

  const updataTask: UpdataTaskProps = (index) => {
    updata({...taskClassifyList[index]});
  };

  // 工具下标，删除工作任务
  const deleteTaskByIndex = async (index: number) => {
    const id = taskClassifyList[index].id;
    TaskClassifyList.deleteTaskClassify(id);
  };

  const TaskClassifyComp = () => (
    <Bottons
      list={taskClassifyList}
      setActiveIndex={updataTask}
      deleteByIndex={deleteTaskByIndex}
    />
  );

  return {
    addTaskClassify,
    TaskClassifyComp,
  };
}

export default useTask;
