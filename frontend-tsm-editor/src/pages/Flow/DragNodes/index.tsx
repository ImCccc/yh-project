import React, {useEffect, useMemo, useState} from 'react';
import Active from '@/components/FlowNode/Active';
import {
  Node_Props,
  codeMapComponent,
  START_NODE_CODE,
  FINISH_NODE_CODE,
} from '@/components/FlowNode';
import styles from './index.module.scss';

type DragNodesProps = {
  nodeList: Node_Props[];
  selectData: (data: Node_Props) => void;
};

const Comp: React.FC<DragNodesProps> = ({selectData, nodeList}) => {
  const [list, setList] = useState<Node_Props[]>([]);

  useEffect(() => {
    setList([...nodeList]);
  }, [nodeList]);

  // 占位符, 修正 space-between 样式导致2边分布
  const Correct = useMemo<React.ReactNode>(() => {
    const len = nodeList.length % 4;
    if (len <= 1) return false;
    const comps = [];
    for (let index = 0; index < len; index++) {
      comps.push(<div key={index} style={{width: '25%'}}></div>);
    }
    return comps;
  }, [nodeList]);

  const selectNode = (index: number) => {
    const item = list[index];
    // 开始结束节点，不能选择，自动生成
    if (
      item.submitData.code === START_NODE_CODE ||
      item.submitData.code === FINISH_NODE_CODE
    ) {
      return;
    }
    list.forEach((v) => (v.isSelect = false));
    item.isSelect = true;
    selectData(item);
    setList([...list]);
  };

  return (
    <div className={styles.nodes}>
      {list.map((data, index) => {
        const Comps = codeMapComponent[data.submitData.code].dragComp;
        return (
          <div key={data.submitData.id}>
            <Active isSelect={data.isSelect} onClick={() => selectNode(index)}>
              <Comps>{data.submitData.name}</Comps>
            </Active>
          </div>
        );
      })}
      {Correct}
    </div>
  );
};

export default Comp;
