// @ts-ignore
/* eslint-disable */

declare namespace API {
  type matrixAddMatrixRequest = {
    matrix: matrixMatrix;
  };

  type matrixAddMatrixResponse = {
    code: number;
    matrix: matrixMatrix;
    msg: string;
  };

  type matrixDelMatrixRequest = {
    id: string;
  };

  type matrixDelMatrixResponse = {
    code: number;
    id: string;
    msg: string;
  };

  type matrixGetMatrixRequest = {
    id: string;
  };

  type matrixGetMatrixResponse = {
    code: number;
    matrix: matrixMatrix;
    msg: string;
  };

  type matrixListMatrixRequest = Record<string, any>;

  type matrixListMatrixResponse = {
    code: number;
    /** 矩阵列表 */
    matrixs: matrixMatrix[];
    msg: string;
    /** 列表数量 */
    total: number;
  };

  type matrixMatrix = {
    /** 矩阵id */
    id: string;
    /** 矩阵名称 */
    name: string;
    /** 矩阵分类 */
    rows: string;
  };

  type matrixPushMatrixItem = {
    device_sn: string;
    device_type_id: string;
  };

  type matrixPushMatrixRequest = {
    devices: matrixPushMatrixItem[];
    id: string;
  };

  type matrixPushMatrixResponse = {
    code: number;
    devices: matrixPushMatrixItem[];
    msg: string;
  };

  type matrixUpdateMatrixRequest = {
    matrix: matrixMatrix;
  };

  type matrixUpdateMatrixResponse = {
    code: number;
    matrix: matrixMatrix;
    msg: string;
  };
}
