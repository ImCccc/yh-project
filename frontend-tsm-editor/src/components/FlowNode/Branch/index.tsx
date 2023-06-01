import React, {useContext, useMemo} from 'react';
import AddNodeBtn from '@/components/FlowNode/AddNodeBtn';
import Arrow from '@/components/FlowNode/Arrow';
import Active from '@/components/FlowNode/Active';
import Branch from '@/components/FlowNode/shape/Diamond';
import ArcRect from '@/components/FlowNode/shape/ArcRect';
import {
  Node_Props,
  BranchKeyProps,
  TRUEPATH_KEY,
  MOVE_NODE_CODE,
  FALSEPATH_KEY,
  getConfigByCode,
  codeMapComponent,
} from '@/components/FlowNode';
import {message} from 'antd';
import {clone} from '@/utils/util';
import {FlowContext} from '@/pages/Flow';
import styles from './index.module.scss';
import classNames from 'classnames';

const Comp: React.FC<{parentindex: number; node: Node_Props}> = ({
  node,
  parentindex,
}) => {
  const context = useContext(FlowContext);

  // 分支true的节点列表
  const truePathNodeList = useMemo(() => {
    const children = node.submitData.children;
    if (children instanceof Array) return [];
    return children?.truePath || [];
  }, [node]);

  // 分支false的节点列表
  const falsePathNodeList = useMemo(() => {
    const children = node.submitData.children;
    if (children instanceof Array) return [];
    return children?.falsePath || [];
  }, [node]);

  // 添加分支
  const addNodeHander = (
    parentindex: number,
    index: number,
    branchKey: BranchKeyProps,
    isSelect = false
  ) => {
    const addNode = context.addNodeData;
    if (!addNode) return message.error('请先选中左上角的节点');
    if (addNode.submitData.code !== MOVE_NODE_CODE)
      return message.error('容器只能放普通节点');
    const addNodeData = getConfigByCode(addNode.submitData.code, {
      isSelect,
      canAddLeft: true,
      canAddRight: true,
      submitData: clone(addNode.submitData),
    });
    context.addNodeByPath(addNodeData, parentindex, index, branchKey);
  };

  const getNodeList = (list: Node_Props[], branchKey: BranchKeyProps) => {
    const selectNode = context.selectNode;
    return (
      <div>
        {list.map((data, index) => {
          const Comps = codeMapComponent[data.submitData.code].dropComp;
          return (
            <React.Fragment key={data.submitData.id}>
              {!!index && <Arrow scale={0.8} />}
              <Active
                isSelect={data.isSelect}
                canAddTop={data.canAddTop}
                canAddLeft={data.canAddLeft}
                canAddRight={data.canAddRight}
                canAddBottom={data.canAddBottom}
                onDoubleClick={() => selectNode(data)}
                addNode={(type: string) =>
                  addNodeHander(
                    parentindex,
                    type === 'left' ? index : index + 1,
                    branchKey
                  )
                }>
                <Comps childNodes={data.submitData.children}>
                  {data.submitData.name}
                </Comps>
              </Active>
            </React.Fragment>
          );
        })}
        {!list.length && (
          <AddNodeBtn
            onClick={() => addNodeHander(parentindex, 0, branchKey, true)}
          />
        )}
      </div>
    );
  };

  return (
    <ArcRect>
      <div className={styles.wrap}>
        <Branch>{node.submitData.name}</Branch>
        <div className={styles.line}></div>
        <div className={styles.line2}>
          <div className={styles.jiantou}></div>
          <div className={classNames(styles.jiantou, styles.jiantoutop)}></div>
        </div>
        <div className={styles.branch}>
          {getNodeList(truePathNodeList, TRUEPATH_KEY)}
          {getNodeList(falsePathNodeList, FALSEPATH_KEY)}
        </div>
      </div>
    </ArcRect>
  );
};

export default Comp;
