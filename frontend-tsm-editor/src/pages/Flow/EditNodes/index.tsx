import React, {useContext, useRef} from 'react';
import {message} from 'antd';
import {clone} from '@/utils/util';
import useMouse from '@/hooks/useMouse';
import {FlowContext} from '@/pages/Flow';
import Arrow from '@/components/FlowNode/Arrow';
import Active from '@/components/FlowNode/Active';
import AddNodeBtn from '@/components/FlowNode/AddNodeBtn';
import {getConfigByCode, codeMapComponent} from '@/components/FlowNode';
import styles from './index.module.scss';

const background = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/BG.jpg)`,
};

const Comp: React.FC = () => {
  const {addNodeData, addNodeByPath, thisNodeList, selectNode, canSelect} =
    useContext(FlowContext);

  const scrollRef = useRef<HTMLDivElement>(null);
  // 鼠标按下移动
  useMouse(scrollRef);

  // 新增节点
  const addNode = (index: number) => {
    if (!addNodeData) return message.error('请先选中左上角的节点');
    const node = getConfigByCode(addNodeData.submitData.code, {
      canAddLeft: true,
      canAddRight: true,
      submitData: clone(addNodeData.submitData),
    });
    addNodeByPath(node, index);
  };

  return (
    <div
      ref={scrollRef}
      onClick={canSelect}
      style={background}
      className={styles.wrap}>
      <div className={styles.nodes}>
        {thisNodeList.map((data, index) => {
          const Comps = codeMapComponent[data.submitData.code].dropComp;
          return (
            <React.Fragment key={data.submitData.id}>
              {!!index && <Arrow />}
              <Active
                isSelect={data.isSelect}
                canAddTop={data.canAddTop}
                canAddLeft={data.canAddLeft}
                canAddRight={data.canAddRight}
                canAddBottom={data.canAddBottom}
                addNode={(t) => addNode(t === 'left' ? index : index + 1)}
                onDoubleClick={() => selectNode(data)}>
                <Comps parentindex={index} node={data}>
                  {data.submitData.name}
                </Comps>
              </Active>
              {!index && thisNodeList.length === 2 && (
                <>
                  <Arrow />
                  <AddNodeBtn onClick={() => addNode(1)} />
                </>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Comp;
