const url = 'https://apihub.dev.inrobot.cloud/swaggerui/';

module.exports = [
  {
    mock: false,
    namespace: 'ANNOTATION',
    requestLibPath: "import request from '@/utils/request';",
    projectName: 'dataAnnotation',
    schemaPath: `${url}config/data_annotation.swagger.json?id=${Math.random()}`,
  },
];
