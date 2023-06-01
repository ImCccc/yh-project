import {useEffect, useCallback, useState, useMemo, useRef} from 'react';
import {message} from 'antd';
import {confirm} from '@/utils/util';
import useForm from '@/hooks/useForm';
import Bottons from '@/components/Bottons';
import useSendDevice from '@/hooks/useSendDevice';
import {
  MatrixServiceDelMatrix,
  MatrixServiceAddMatrix,
  MatrixServicePushMatrix,
  MatrixServiceListMatrix,
} from '@/service/matrix/MatrixService';

type BaseProps = {
  id: string;
  name: string;
};

export type MatrixRowsProps = string[][];

export type MatrixDataProps = BaseProps & {
  rows: MatrixRowsProps;
};

type MatrixListProps = MatrixDataProps[];

type UseFormProps = BaseProps & {
  rows: string[];
};

const _getRow = (values: string[]): string => {
  return JSON.stringify(
    values.map((code) => [code, ...new Array(values.length).fill('N')])
  );
};

export default function useMatrix(taskList: TSAPI.SelectOptionListProps) {
  //矩阵列表
  const [matrixList, setMatrixList] = useState<MatrixListProps>([]);

  // 当前选中的矩阵下标
  const [currentMatrix, setCurrentMatrix] = useState<MatrixDataProps>();

  // 当前选中的矩阵id
  const currentMatrixIndex = useMemo(
    () => matrixList.findIndex((matrix) => matrix.id === currentMatrix?.id),
    [currentMatrix, matrixList]
  );

  // 设置选中的矩阵
  const selectCurentMatrix = useMemo(
    () => (index: number) => setCurrentMatrix(matrixList[index]),
    [matrixList]
  );

  const {add: addMatrix} = useForm<UseFormProps>({
    title: '矩阵',
    formItemList: [
      {
        name: 'name',
        label: '矩阵名称',
        rules: [{required: true, message: '请输入矩阵名称!'}],
      },
      {
        name: 'rows',
        label: '任务分类',
        type: 'Select',
        props: {options: taskList},
        rules: [{required: true, message: '请选选择任务分类!'}],
      },
    ],
    onSubmit: async (submitData) => {
      const matrix = {
        id: '',
        name: submitData.name,
        rows: _getRow(submitData.rows),
      };
      let data = await MatrixServiceAddMatrix({matrix});
      message.success('新建成功!');

      const addData = {
        ...data.matrix,
        rows: JSON.parse(data.matrix.rows) as MatrixRowsProps,
      };

      setMatrixList([...matrixList, addData]);
    },
  });

  // 下发工作任务
  const sendTask = useSendDevice(async (devices) => {
    if (!currentMatrix) return;
    await MatrixServicePushMatrix({id: currentMatrix.id, devices});
    message.success('已经下发至设备');
  });

  // 工具下标，删除矩阵
  const deleteMatrixByIndex = useCallback(
    async (index: number) => {
      const params = {id: matrixList[index].id};
      await MatrixServiceDelMatrix(params);
      message.success('删除成功!');
      matrixList.splice(index, 1);
      setMatrixList([...matrixList]);
      if (params.id === currentMatrix?.id) setCurrentMatrix(undefined);
    },
    [currentMatrix, matrixList]
  );

  // 用于判断当前矩阵有没有被修改,如果修改,离开页面需要提示
  const linkCurrentMatrix = useRef<{isUpdata: boolean}>({
    isUpdata: false,
  });

  const isUpdata = async (index: number) => {
    if (!linkCurrentMatrix.current.isUpdata) return selectCurentMatrix(index);
    await confirm('您的工作区中有未保存的工作任务，是否要离开？');
    selectCurentMatrix(index);
    linkCurrentMatrix.current.isUpdata = false;
  };

  const MatrixListComp = () => (
    <Bottons
      list={matrixList}
      setActiveIndex={isUpdata}
      activeIndex={currentMatrixIndex}
      deleteByIndex={deleteMatrixByIndex}
    />
  );

  const OperIconComp = () => (
    <span>
      <i onClick={addMatrix} className="font_family icon-add" />
      <i onClick={sendTask} className="font_family icon-fasong icon-skewing" />
    </span>
  );

  const initList = useMemo(
    () => (matrixId?: string) => {
      MatrixServiceListMatrix({}).then((data) => {
        const matrix = (data.matrixs || []).map((v) => ({
          ...v,
          rows: JSON.parse(v.rows),
        })) as MatrixListProps;
        setMatrixList(matrix);
        if (!matrixId) return setCurrentMatrix(matrix[0] || undefined);
        setCurrentMatrix(matrix.find((v) => v.id === matrixId));
      });
      linkCurrentMatrix.current.isUpdata = false;
    },
    []
  );

  // 更新工作任务列表
  const updateMatrixList = useMemo(
    () => (matrixId?: string) => initList(matrixId),
    [initList]
  );

  // 获取矩阵列表
  useEffect(() => initList(), [initList]);

  return {
    currentMatrix,
    OperIconComp,
    MatrixListComp,
    updateMatrixList,
    linkCurrentMatrix,
  };
}
