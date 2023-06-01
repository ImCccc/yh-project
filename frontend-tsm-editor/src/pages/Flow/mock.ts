import {ReturnDataProps} from '@/components/FlowNode';

export const mock_nodelist: ReturnDataProps[] = [
  {
    id: '0',
    code: 'INFORE.ROBOTICS.NODE.START',
    name: '开始',
  },
  {
    id: '1',
    name: '串行节点',
    code: 'INFORE.ROBOTICS.NODE.SIMPLE.MOVE',
    requiredMetrics: [
      {
        metrics: 'power',
        operator: 'lt',
        value: '10',
      },
    ],
    data: {
      distance: 50,
    },
  },
  {
    id: '2',
    name: '并行节点',
    code: 'INFORE.ROBOTICS.NODE.CONCURRENT',
    children: {
      concurrentPath: [
        {
          code: 'INFORE.ROBOTICS.NODE.SIMPLE.MOVE',
          requiredMetrics: [
            {
              metrics: 'power',
              operator: 'lt',
              value: '10',
            },
          ],
          data: {
            mushFinish: false,
          },
          id: '3',
          name: '串行节点',
        },
        {
          code: 'INFORE.ROBOTICS.NODE.SIMPLE.MOVE',
          requiredMetrics: [
            {
              metrics: 'power',
              operator: 'lt',
              value: '10',
            },
          ],
          data: {
            mushFinish: true,
          },
          id: '4',
          name: '串行节点',
        },
      ],
    },
    data: {},
    requiredMetrics: [],
  },
  {
    id: '5',
    name: '分支',
    code: 'INFORE.ROBOTICS.NODE.BRANCH',
    children: {
      falsePath: [
        {
          code: 'INFORE.ROBOTICS.NODE.SIMPLE.MOVE',
          data: {
            distance: 50,
          },
          requiredMetrics: [],
          id: '7',
          name: '串行节点',
        },
      ],
      truePath: [
        {
          code: 'INFORE.ROBOTICS.NODE.SIMPLE.MOVE',
          data: {
            distance: 50,
          },
          requiredMetrics: [],
          id: '6',
          name: '串行节点',
        },
      ],
    },
    data: {},
    requiredMetrics: [
      {
        metrics: 'power',
        operator: 'lt',
        value: '10',
      },
    ],
  },
  {
    code: 'INFORE.ROBOTICS.NODE.FINISH',
    id: '8',
    name: '结束',
  },
];
