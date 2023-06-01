import { join } from 'path';

export default [
  {
    requestLibPath: "import request from '@/utils/request'",
    schemaPath: join(__dirname, './api/flow_log.swagger.json'),
    mock: false,
    projectName: 'flowlog',
  },

  // {
  //   requestLibPath: "import request from '@/utils/request'",
  //   schemaPath: join(__dirname, './api/matrix.swagger.json'),
  //   mock: false,
  //   projectName: 'matrix',
  // },

  // {
  //   requestLibPath: "import request from '@/utils/request'",
  //   schemaPath: join(__dirname, './api/task.swagger.json'),
  //   mock: false,
  //   projectName: 'task',
  // },

  // {
  //   requestLibPath: "import request from '@/utils/request'",
  //   schemaPath: join(__dirname, './api/node_type.swagger.json'),
  //   mock: false,
  //   projectName: 'node-type',
  // },

  // {
  //   requestLibPath: "import request from '@/utils/request'",
  //   schemaPath: join(__dirname, './api/task_group.swagger.json'),
  //   mock: false,
  //   projectName: 'task-group',
  // },

  // {
  //   requestLibPath: "import request from '@/utils/request'",
  //   // schemaPath: join(__dirname, './api/robot_demo.swagger.json'),
  //   schemaPath: 'proto/robot-demo/robot_demo.proto',
  //   mock: false,
  //   projectName: 'robot',
  //   proto: true,
  //   gitlab: {
  //     branch: 'develop',
  //     projectId: '176',
  //   },
  // },

  // {
  //   requestLibPath: "import request from '@/utils/request'",
  //   // schemaPath: join(__dirname, './api/quarantine.swagger.json'),
  //   schemaPath: 'proto/quarantine/quarantine.proto',
  //   mock: false,
  //   projectName: 'quarantine',
  //   proto: true,
  //   gitlab: {
  //     branch: 'develop',
  //     projectId: '115',
  //   },
  // },
  // {
  //   requestLibPath: "import request from '@/utils/request'",
  //   schemaPath: 'proto/platform-iam/platform_iam.proto',
  //   mock: false,
  //   projectName: 'platform',
  //   proto: true,
  //   gitlab: {
  //     branch: 'develop',
  //     projectId: '27',
  //   },
  // },
  // {
  //   requestLibPath: "import request from '@/utils/request'",
  //   gitlab: {
  //     projectId: '345',
  //     branch: 'develop',
  //   },
  //   schemaPath: 'proto/meeting/meeting.proto',
  //   proto: true,
  //   mock: false,
  //   projectName: 'meeting-room',
  // },
  // {
  //   requestLibPath: "import request from '@/utils/request'",
  //   gitlab: {
  //     projectId: '45',
  //     branch: 'develop',
  //   },
  //   schemaPath: 'proto/lift/lift.proto',
  //   proto: true,
  //   mock: false,
  //   projectName: 'lift',
  // },
];
