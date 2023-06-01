import {clone, confirm} from '@/utils/util';
import {useEffect, useRef, useState} from 'react';
import {TaskServiceGetTask} from '@/service/task/TaskService';
import {LinkCurrentNodeProps} from './useWorkTaskList';
import {
  getCompId,
  Node_Props,
  getNodeList,
  getDefaultNode,
  ReturnDataProps,
  CONCURRENT_KEY,
  START_NODE_CODE,
  FINISH_NODE_CODE,
  CHILDREN_KEYS,
} from '@/components/FlowNode';

export type DataKey = 'data' | 'requiredMetrics';

type CanSelectFnProps = () => void;
type ThisNodeListProps = Node_Props[];
type SelectNodeDataProps = Node_Props | undefined;
type SelectNodeFnProps = (node: Node_Props) => void;
type UpdataNodeDataProps = (
  data: Record<string, any>[] | Record<string, any>,
  key?: DataKey
) => void;
type ShowSettingProps = {} | false;
type AddNodeByPathProps = (
  node: Node_Props,
  pindex: number,
  sunIndex?: number,
  childrenKey?: string
) => void;

export type SplicePrramsProps = [number, number] | [number, number, Node_Props];

type UseFlowReturnProps = {
  thisNodeList: Node_Props[];
  canSelect: CanSelectFnProps;
  showSetting: ShowSettingProps;
  selectNode: SelectNodeFnProps;
  addNodeByPath: AddNodeByPathProps;
  updataNodeData: UpdataNodeDataProps;
  selectNodeData: SelectNodeDataProps;
  originalData?: React.MutableRefObject<string>;
  [k: string]: any;
};

const _fn = (...arg: any): any => {};
export const defaultValue: UseFlowReturnProps = {
  showSetting: {},
  thisNodeList: [],
  canSelect: _fn,
  selectNode: _fn,
  addNodeByPath: _fn,
  updataNodeData: _fn,
  nodeListSplice: _fn,
  selectNodeData: undefined,
};

const _getPath = (
  pIndex: number,
  childrenKey: string = CONCURRENT_KEY
): string[] => {
  return [pIndex + '', 'submitData', 'children', childrenKey];
};

type GetDataByPath = (node: Record<string, any>, path: string[]) => any;
const getDataByPath: GetDataByPath = (data, path) => {
  let rs = data;
  while (path.length) rs = rs[path.shift()!];
  return rs;
};

const _deleteNodeById = (
  list: Node_Props[],
  id: string
): Node_Props[] | false => {
  const index = list.findIndex((n) => n.submitData.id === id);
  if (index === -1) return false;
  list.splice(index, 1);
  return list;
};

export default function useFlow(
  workTaskId = '',
  linkCurrentNode: React.MutableRefObject<LinkCurrentNodeProps>
) {
  // 当前编辑区域的节点, 默认有开始结束节点
  const [thisNodeList, setThisNodeList] = useState<ThisNodeListProps>([]);

  //当前选中的节点信息
  const currentNodeData = useRef<SelectNodeDataProps>();

  // 显示当前节点的编辑信息
  const [showSetting, setShowSetting] = useState<ShowSettingProps>([]);

  // 取消选中
  const canSelect = () => {
    setShowSetting([]);
    if (!currentNodeData.current) return;
    currentNodeData.current.isSelect = false;
    currentNodeData.current = undefined;
    setThisNodeList([...thisNodeList]);
  };

  linkCurrentNode.current.canSelect = canSelect;

  /**
   * 添加节点
   * node: 需要添加的节点信息
   * pindex: 如果subIndex没有传递,说明在最外层添加节点, 那么该参数就是splice的第一个参数
   * sunIndex: 对于分支和并行节点才有的参数, splice的第一个参数
   * childrenKey: 分支或者并行节点的key
   */
  const addNodeByPath = (
    node: Node_Props,
    pindex: number,
    sunIndex?: number,
    childrenKey?: string
  ) => {
    //说明页面有更新
    linkCurrentNode.current.isUpdata = true;

    // 重新设置id
    node.submitData.id = getCompId();

    if (node.isSelect) {
      canSelect();
      currentNodeData.current = node;
    }

    if (sunIndex === undefined) {
      thisNodeList.splice(pindex, 0, node);
      return setThisNodeList([...thisNodeList]);
    }

    const path = _getPath(pindex, childrenKey);
    const data = getDataByPath(thisNodeList, path) as Node_Props[];

    data.splice(sunIndex, 0, node);
    setThisNodeList([...thisNodeList]);
  };

  // 并行节点双击选中
  const selectNode: SelectNodeFnProps = (node) => {
    canSelect();
    node.isSelect = true;
    currentNodeData.current = node;
    setShowSetting({});
    setThisNodeList([...thisNodeList]);
  };

  // 双击节点,弹出编辑页面, 在文本域输入文本, 会触发该函数
  const updataNodeData: UpdataNodeDataProps = (data, key = 'data') => {
    if (currentNodeData.current) {
      currentNodeData.current.submitData[key] = data;
      setThisNodeList([...thisNodeList]);
      linkCurrentNode.current.isUpdata = true;
    }
  };

  // 当前工作任务id变化,重新请求接口获取节点信息
  useEffect(() => {
    if (!workTaskId) return setThisNodeList(getDefaultNode());
    TaskServiceGetTask({id: workTaskId}).then((data) => {
      try {
        let list: ReturnDataProps[] = JSON.parse(data.task.list);
        const nodeList = list[0] ? getNodeList(list) : getDefaultNode();
        setThisNodeList(clone(nodeList));
        linkCurrentNode.current.isUpdata = false;
      } catch (error) {
        console.error('返回数据格式错误:', data);
        setThisNodeList(getDefaultNode());
      }
    });
  }, [linkCurrentNode, workTaskId]);

  // 删除节点
  useEffect(() => {
    const keyUpHander = async (e: KeyboardEvent) => {
      const curNode = currentNodeData.current;
      if (!curNode || e.key.toLocaleLowerCase() !== 'delete') return;

      // 开始，结束节点不能删除
      const {code, id} = curNode.submitData;
      if (code === START_NODE_CODE || code === FINISH_NODE_CODE) return;

      await confirm();
      setShowSetting([]);
      linkCurrentNode.current.isUpdata = true;

      // 选中的是最外层节点
      const rs = _deleteNodeById(thisNodeList, id);
      if (rs) return setThisNodeList([...rs]);
      for (let i = 0; i < thisNodeList.length; i++) {
        const {submitData} = thisNodeList[i];
        const children = submitData.children;
        if (!children) continue;
        for (let j = 0; j < CHILDREN_KEYS.length; j++) {
          const key = CHILDREN_KEYS[j];
          const list = children[key] || [];
          const rs = _deleteNodeById(list, id);
          if (rs) return setThisNodeList([...thisNodeList]);
        }
      }
    };
    window.addEventListener('keyup', keyUpHander);
    return () => window.removeEventListener('keyup', keyUpHander);
  }, [linkCurrentNode, thisNodeList]);

  return {
    canSelect,
    selectNode,
    showSetting,
    thisNodeList,
    addNodeByPath,
    updataNodeData,
    selectNodeData: currentNodeData.current,
  };
}
