// import {mock_nodelist} from '@/pages/Flow/mock';
import React from 'react';
import {clone} from '@/utils/util';
import Move from '@/components/FlowNode/shape/RoundRect';
import Finish from '@/components/FlowNode/shape/Circle';
import Start from '@/components/FlowNode/shape/Ellipse';
import BranchBase from '@/components/FlowNode/shape/Diamond';
import Branch from '@/components/FlowNode/Branch';
import Concurrent from '@/components/FlowNode/Concurrent';
import ConcurrentBase from '@/components/FlowNode/shape/ArcRect';

// 节点的code
export const START_NODE_CODE = 'INFORE.ROBOTICS.NODE.START';
export const FINISH_NODE_CODE = 'INFORE.ROBOTICS.NODE.FINISH';
export const BRANCH_NODE_CODE = 'INFORE.ROBOTICS.NODE.BRANCH';
export const MOVE_NODE_CODE = 'INFORE.ROBOTICS.NODE.SIMPLE.MOVE';
export const CONCURRENT_NODE_CODE = 'INFORE.ROBOTICS.NODE.CONCURRENT';

// 分支的key
export const FALSEPATH_KEY = 'falsePath';
export const TRUEPATH_KEY = 'truePath';
export const CONCURRENT_KEY = 'concurrentPath';

// 分支的key类型
export type BranchKeyProps = typeof FALSEPATH_KEY | typeof TRUEPATH_KEY;

// 并行节点的key类型
export type ConcurrentKeyProps = typeof CONCURRENT_KEY;

// 所有节点Children的key类型
export type ChildrenKeyProps = ConcurrentKeyProps | BranchKeyProps;

export const CHILDREN_KEYS: ChildrenKeyProps[] = [
  FALSEPATH_KEY,
  TRUEPATH_KEY,
  CONCURRENT_KEY,
];

// 所有的节点类型的code
export type NodeKeysProps =
  | typeof START_NODE_CODE
  | typeof FINISH_NODE_CODE
  | typeof BRANCH_NODE_CODE
  | typeof MOVE_NODE_CODE
  | typeof CONCURRENT_NODE_CODE;

// 后端返回的节点列表类型
export type NodeBaseProps = {
  id: string;
  name: string;
  code: NodeKeysProps;
};

// 后端返回的数据格式
export type ReturnDataProps = NodeBaseProps & {
  data?: Record<string, any>;
  requiredMetrics?: Record<string, any>[] | Record<string, any>;
  children?: Partial<Record<ChildrenKeyProps, ReturnDataProps[]>>;
};

// 后端返回的编辑区域节点数据格式
export type SubmitDataProps = NodeBaseProps & {
  data?: Record<string, any>;
  requiredMetrics?: Record<string, any>[] | Record<string, any>;
  children?: Partial<Record<ChildrenKeyProps, Node_Props[]>>;
};

// 前端节点的数据格式
export type Node_Props = {
  isSelect?: boolean; // 是否选中
  canAddTop?: boolean; // 能否在上侧添加节点
  canAddLeft?: boolean; // 能否在左侧添加节点
  canAddRight?: boolean; // 能否在右侧添加节点
  canAddBottom?: boolean; // 能否在下侧添加节点
  submitData: SubmitDataProps; // 提交给后端的数据
};

// 初始化时,排除必填项
export type Node_Partial_Props = Omit<Node_Props, 'submitData'> & {
  submitData?: Partial<SubmitDataProps>;
};

// 节点配置信息的类型
export type NodeFCProps = {
  [k in NodeKeysProps]: {
    dragComp: React.FC<any>;
    dropComp: React.FC<any>;
  };
};

export const getCompId = (): string => 'id-' + Math.random();

// 根据code获取节点初始化的信息
export const getConfigByCode = (
  code: NodeKeysProps,
  options?: Node_Partial_Props
): Node_Props => {
  const data: SubmitDataProps = {
    code,
    name: '',
    data: {},
    children: {},
    id: getCompId(),
    requiredMetrics: [],
  };

  if (code === BRANCH_NODE_CODE) {
    data.children = {
      [FALSEPATH_KEY]: [],
      [TRUEPATH_KEY]: [],
    };
  }

  if (code === CONCURRENT_NODE_CODE) {
    data.children = {
      [CONCURRENT_KEY]: [],
    };
  }

  const initOptions: Node_Props = {
    isSelect: false,
    canAddTop: false,
    canAddLeft: false,
    canAddRight: false,
    canAddBottom: false,
    submitData: data,
  };

  if (options) {
    const {submitData, ...otherOptions} = options;
    Object.assign(data, submitData);
    Object.assign(initOptions, otherOptions);
  }

  return initOptions;
};

// 节点组件映射关系
export const codeMapComponent: NodeFCProps = {
  // 开始节点配置信息
  [START_NODE_CODE]: {
    dragComp: Start, // 节点列表对应的组件
    dropComp: Start, // 编辑区域对应的组件
  },
  // 结束节点配置信息
  [FINISH_NODE_CODE]: {
    dragComp: Finish,
    dropComp: Finish,
  },
  // 普通节点配置信息 -> 移动节点
  [MOVE_NODE_CODE]: {
    dragComp: Move,
    dropComp: Move,
  },
  // 分支配置信息
  [BRANCH_NODE_CODE]: {
    dragComp: BranchBase,
    dropComp: Branch,
  },
  // 并行节点配置信息
  [CONCURRENT_NODE_CODE]: {
    dragComp: ConcurrentBase,
    dropComp: Concurrent,
  },
};

// 选中的节点能添加哪些兄弟节点的映射
export const codeMapSiblingNode: Record<string, NodeKeysProps[]> = {
  all: [BRANCH_NODE_CODE, MOVE_NODE_CODE, CONCURRENT_NODE_CODE],
  [BRANCH_NODE_CODE]: [MOVE_NODE_CODE],
  [CONCURRENT_NODE_CODE]: [MOVE_NODE_CODE],
};

// 刚刚开始时的节点信息
export const getDefaultNode = () => [
  getConfigByCode(START_NODE_CODE, {
    canAddRight: true,
    submitData: {name: '开始'},
  }),
  getConfigByCode(FINISH_NODE_CODE, {
    canAddLeft: true,
    submitData: {name: '结束'},
  }),
];

// 转换为后端需要的数据
export const getSubmitList = (nodeList: any, isFirstloop = true) => {
  if (isFirstloop) nodeList = clone(nodeList);
  if (!nodeList || !nodeList[0]) return [];
  return nodeList.map((node: any) => {
    if (!node.submitData) return node;
    let {children = {}, ...data} = node.submitData;
    CHILDREN_KEYS.forEach((key) => {
      if (children[key] !== undefined)
        children[key] = getSubmitList(children[key], false);
    });
    return {...data, children};
  });
};

// 根据后端的数据，转换为前端页面显示的数据格式
export const getNodeList = (nodeList: any, parentNode?: any): any => {
  if (!nodeList || !nodeList[0]) return [];

  return nodeList.map((node: any) => {
    if (!node) return [];

    let submitData = {
      data: {},
      requiredMetrics: [],
      children: node.children || {},
      ...node,
    };

    const isConcurrent = parentNode?.code === CONCURRENT_NODE_CODE;
    let canAddLeft = !isConcurrent;
    let canAddRight = !isConcurrent;
    let canAddTop = isConcurrent;
    let canAddBottom = isConcurrent;
    if (node.code === START_NODE_CODE) canAddLeft = false;
    if (node.code === FINISH_NODE_CODE) canAddRight = false;

    let children = submitData.children;
    CHILDREN_KEYS.forEach((key) => {
      if (children[key]) children[key] = getNodeList(children[key], node);
    });

    return {
      submitData,
      canAddTop,
      canAddLeft,
      canAddRight,
      canAddBottom,
      isSelect: false,
    };
  });
};
