// @ts-ignore
/* eslint-disable */

declare namespace API {
  type nodeTypeListNodeTypeRequest = Record<string, any>;

  type nodeTypeListNodeTypeResponse = {
    code: number;
    msg: string;
    node_types: nodeTypeNodeType[];
    total: number;
  };

  type nodeTypeNodeType = {
    /** 节点分类 */
    code: string;
    /** 节点id */
    id: string;
    /** 节点名称 */
    name: string;
  };
}
