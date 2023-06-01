import React, {useContext, useMemo} from 'react';
import Concurrent from '@/components/FlowNode/shape/ArcRect';
import Active from '@/components/FlowNode/Active';
import AddNodeBtn from '@/components/FlowNode/AddNodeBtn';
import {
  Node_Props,
  codeMapComponent,
  getConfigByCode,
  MOVE_NODE_CODE,
} from '@/components/FlowNode';
import {message} from 'antd';
import {clone} from '@/utils/util';
import {FlowContext} from '@/pages/Flow';
import styles from './index.module.scss';

type CompProps = {
  node: Node_Props;
  parentindex: number;
  [k: string]: any;
};

const Comp: React.FC<CompProps> = ({node, parentindex, ...props}) => {
  const context = useContext(FlowContext);

  const childNodes = useMemo(
    () => node.submitData.children?.concurrentPath || [],
    [node]
  );

  const addNodeHander = (
    parentindex: number,
    index: number,
    isSelect = false
  ) => {
    const addNode = context.addNodeData;
    if (!addNode) return message.error('请先选中左上角的节点');
    if (addNode.submitData.code !== MOVE_NODE_CODE)
      return message.error('并行节点容器，只能放普通节点');
    const addNodeData = getConfigByCode(addNode.submitData.code, {
      isSelect,
      canAddTop: true,
      canAddBottom: true,
      submitData: clone(addNode.submitData),
    });
    context.addNodeByPath(addNodeData, parentindex, index);
  };

  return (
    <Concurrent {...props} isConcurrent>
      <div className={styles.wrap}>
        {!childNodes[0] && (
          <AddNodeBtn onClick={() => addNodeHander(parentindex, 0, true)} />
        )}
        {childNodes.map((data, index) => {
          const Comps = codeMapComponent[data.submitData.code].dropComp;
          return (
            <React.Fragment key={data.submitData.id}>
              <Active
                isSelect={data.isSelect}
                canAddTop={data.canAddTop}
                canAddLeft={data.canAddLeft}
                canAddRight={data.canAddRight}
                canAddBottom={data.canAddBottom}
                onDoubleClick={() => context.selectNode(data)}
                addNode={(type: string) =>
                  addNodeHander(
                    parentindex,
                    type === 'left' ? index : index + 1
                  )
                }>
                <Comps childNodes={data.submitData.children}>
                  {data.submitData.name}
                </Comps>
              </Active>
            </React.Fragment>
          );
        })}
      </div>
    </Concurrent>
  );
};
export default Comp;
