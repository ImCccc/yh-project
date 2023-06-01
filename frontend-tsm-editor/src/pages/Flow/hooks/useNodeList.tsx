import {useCallback, useEffect, useState} from 'react';
import {
  Node_Props,
  NodeBaseProps,
  getConfigByCode,
} from '@/components/FlowNode';
import {clone} from '@/utils/util';
import DragNodes from '../DragNodes';
import {NodeTypeServiceListNodeType} from '@/service/node-type/NodeTypeService';

export default function useNodeList() {
  const [currentSelectNode, setCurrentSelectNode] = useState<
    Node_Props | undefined
  >();

  // 请求接口获取所有的节点数据
  const [allNodeList, setAllNodeList] = useState<Node_Props[]>([]);

  // 保存左侧选中的节点信息
  const setCurrentNode = (data: Node_Props) => {
    data.submitData = clone(data.submitData);
    setCurrentSelectNode(data);
  };

  const DragNodesComp = useCallback(
    () => (
      <DragNodes
        nodeList={allNodeList}
        selectData={(data) => setCurrentNode(data)}
      />
    ),
    [allNodeList]
  );

  // 初始化,获取所有节点列表
  useEffect(() => {
    NodeTypeServiceListNodeType({}).then(({node_types}) => {
      const list = (node_types as NodeBaseProps[]).map((node) =>
        getConfigByCode(node.code, {submitData: node})
      );
      setAllNodeList(list);
    });
  }, []);

  return {
    NodeList: DragNodesComp,
    currentSelectNode,
  };
}
