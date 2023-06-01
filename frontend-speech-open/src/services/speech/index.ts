/* eslint-disable */
import * as DeviceService from './DeviceService'
import * as FlowLogService from './FlowLogService'
import * as SignUrlService from './SignUrlService'
export default {
  ...DeviceService,
  ...FlowLogService,
  ...SignUrlService,
  }
