import {clone} from '@/utils/util';
import Table from '@/pages/Matrix/Table';
import {useEffect, useMemo, useRef} from 'react';
import {TaskClassifyListProps} from '@/hooks/useTaskGroup';
import {MatrixDataProps, MatrixRowsProps} from './useMatrix';

export type useTableReturnProps = {
  getData: () => MatrixRowsProps | undefined;
  TableList: React.FC;
};

export default function useTable(
  taskClassifyList: TaskClassifyListProps,
  currentMatrix: MatrixDataProps | undefined,
  linkCurrentMatrix: React.MutableRefObject<{isUpdata: boolean}>
): useTableReturnProps {
  // 任务类型的映射关系
  const codeMapName = useMemo(
    () =>
      taskClassifyList.reduce((data: Record<string, string>, cur) => {
        data[cur.code] = cur.name;
        return data;
      }, {}),
    [taskClassifyList]
  );

  const updateRows = (value: string, colIndex: number, rowIndex: number) => {
    if (!thisRows.current) return;
    const thisVal = thisRows.current[rowIndex];
    thisVal[colIndex] = value;
    thisRows.current[rowIndex] = thisVal;
    linkCurrentMatrix.current.isUpdata = true;
  };

  // 任务类型的code
  const tableData = useMemo(() => {
    if (!currentMatrix)
      return {
        tableBody: [],
        tableHeader: [],
      };
    const rows = clone(currentMatrix.rows);
    const tableHeader = ['状态', ...rows.map((v) => codeMapName[v[0]] || v[0])];
    const tableBody = rows.reduce((data: string[][], cur) => {
      cur[0] = codeMapName[cur[0]] || cur[0];
      data.push(cur);
      return data;
    }, []);
    return {
      tableBody,
      tableHeader,
    };
  }, [codeMapName, currentMatrix]);

  const TableList = () => <Table updateRows={updateRows} {...tableData} />;

  const thisRows = useRef<MatrixRowsProps>();
  useEffect(() => {
    if (!currentMatrix) return (thisRows.current = undefined);
    thisRows.current = clone(currentMatrix.rows);
  }, [currentMatrix]);

  const getData = () => {
    return thisRows.current || [];
  };

  return {
    getData,
    TableList,
  };
}
