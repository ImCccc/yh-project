import React, {createContext, useEffect, useState} from 'react';
import {message} from 'antd';
import Setting from './Setting';
import {useMobx} from '@/stores';
import EditNodes from './EditNodes';
import {stringify} from '@/utils/util';
import {observer} from 'mobx-react-lite';
import Header from '@/pages/Layout/Header';
import ModifyText from '@/components/ModifyText';
import {getSubmitList} from '@/components/FlowNode';
import ContentLayout from '@/pages/Layout/ContentLayout';
import useNodeList from '@/pages/Flow/hooks/useNodeList';
import {TaskServiceUpdateTask} from '@/service/task/TaskService';
import useWorkTaskList from '@/pages/Flow/hooks/useWorkTaskList';
import useCurrentWorkTask, {
  defaultValue,
} from '@/pages/Flow/hooks/useCurrentWorkTask';

export const FlowContext = createContext(defaultValue);

const Comp: React.FC = () => {
  const TaskClassifyList = useMobx('TaskClassifyList');

  /**
   * NodeList: 节点组件
   * currentSelectNode: 当前选中的节点
   */
  const {currentSelectNode, NodeList} = useNodeList();

  /**
   * currentWorkTask: 当前选中的任务
   * OpenIcon: 操作图标组件
   * updateWorkTaskList: 更新列表
   * WorkTaskList: 工作任务列表组件
   */
  const {
    OpenIcon,
    WorkTaskList,
    currentWorkTask,
    linkCurrentNode,
    updateWorkTaskList,
  } = useWorkTaskList(TaskClassifyList.selectOptions);

  // 当前拖动的组件的数据格式
  const context = useCurrentWorkTask(currentWorkTask?.id, linkCurrentNode);
  const {thisNodeList} = context;

  // 保存数据
  const save = async () => {
    // console.log(stringify(getSubmitList(thisNodeList), true));
    if (!currentWorkTask) return;
    const task = {
      ...currentWorkTask,
      name: taskName || currentWorkTask.name,
      list: stringify(getSubmitList(thisNodeList)),
    };
    await TaskServiceUpdateTask({task});
    message.success('保存成功!');
    linkCurrentNode.current.isUpdata = false;
    updateWorkTaskList();
  };

  // 当前选中工作任务的名称
  const [taskName, setTaskName] = useState<string>('');
  useEffect(() => setTaskName(currentWorkTask?.name || ''), [currentWorkTask]);

  return (
    <FlowContext.Provider value={{...context, addNodeData: currentSelectNode}}>
      <ContentLayout
        topHeaderRender={<Header title="工作节点" icon="icon-jiedian"></Header>}
        bottomHeaderRender={
          <Header title="工作任务" icon="icon-renwu">
            <OpenIcon />
          </Header>
        }
        topRender={<NodeList />}
        bottomRender={<WorkTaskList />}
        contentHeaderRender={
          <>
            <ModifyText text={taskName} onInput={setTaskName} />
            <i onClick={save} className="font_family icon-save icon-skewing" />
          </>
        }>
        <EditNodes />
      </ContentLayout>
      <Setting />
    </FlowContext.Provider>
  );
};

export default observer(Comp);
