import React, {useEffect, useState} from 'react';
import {message} from 'antd';
import {useMobx} from '@/stores';
import classNames from 'classnames';
import {stringify} from '@/utils/util';
import {observer} from 'mobx-react-lite';
import Header from '@/pages/Layout/Header';
import ModifyText from '@/components/ModifyText';
import useTable from '@/pages/Matrix/hooks/useTable';
import useMatrix from '@/pages/Matrix/hooks/useMatrix';
import ContentLayout from '@/pages/Layout/ContentLayout';
import useTaskClassify from '@/pages/Matrix/hooks/useTaskClassify';
import {MatrixServiceUpdateMatrix} from '@/service/matrix/MatrixService';

const style = {
  backgroundSize: 'contain',
  backgroundImage: `url(${process.env.PUBLIC_URL}/BG.jpg)`,
};

const Comp: React.FC = () => {
  const TaskClassifyList = useMobx('TaskClassifyList');

  /**
   *  任务分类相关
   *  TaskClassifyComp: 组件
   *  addTaskClassify: 添加分类
   **/
  const {TaskClassifyComp, addTaskClassify} = useTaskClassify(TaskClassifyList);

  /**
   *  矩阵相关
   *  updateMatrixList: 更新矩阵列表
   *  currentMatrix: 当前选中的矩阵
   *  MatrixListComp: 矩阵列表组件
   *  OperIconComp: icon操作按钮组件
   **/
  const {
    OperIconComp,
    currentMatrix,
    MatrixListComp,
    updateMatrixList,
    linkCurrentMatrix,
  } = useMatrix(TaskClassifyList.selectOptions);

  const {getData, TableList} = useTable(
    TaskClassifyList.list,
    currentMatrix,
    linkCurrentMatrix
  );

  // 保存矩阵名称
  const [matrixName, setMatrixName] = useState<string>('');
  useEffect(() => setMatrixName(currentMatrix?.name || ''), [currentMatrix]);

  // 保存数据
  const save = async () => {
    if (!currentMatrix) return;
    const rows = getData();
    const matrix = {
      ...currentMatrix,
      name: matrixName || currentMatrix.name,
      rows: stringify(rows),
    };
    await MatrixServiceUpdateMatrix({matrix});
    message.success('保存成功!');
    updateMatrixList(currentMatrix.id);
  };

  return (
    <ContentLayout
      topHeaderRender={
        <Header title="任务分类" icon="icon-fenlei">
          <i
            onClick={addTaskClassify}
            className="font_family icon-add icon-skewing"
          />
        </Header>
      }
      bottomHeaderRender={
        <Header title="矩阵列表" icon="icon-juzhen">
          <OperIconComp />
        </Header>
      }
      topRender={<TaskClassifyComp />}
      bottomRender={<MatrixListComp />}
      contentHeaderRender={
        <>
          <ModifyText text={matrixName} onInput={setMatrixName} />
          <i onClick={save} className="font_family icon-save icon-skewing" />
        </>
      }>
      <div style={style} className={classNames('flex-center flex-grow1')}>
        <TableList />
      </div>
    </ContentLayout>
  );
};

export default observer(Comp);
