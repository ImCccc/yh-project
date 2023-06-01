/* eslint-disable */
import * as AgvDeviceService from './AgvDeviceService'
import * as AppUpgradeService from './AppUpgradeService'
import * as BroadcastService from './BroadcastService'
import * as ChargeService from './ChargeService'
import * as DevicePropertyService from './DevicePropertyService'
import * as ErrorLogService from './ErrorLogService'
import * as MeetingService from './MeetingService'
import * as SensorDeviceService from './SensorDeviceService'
import * as StreamService from './StreamService'
import * as TaskRecordService from './TaskRecordService'
import * as VideoService from './VideoService'
import * as TaskDispatchService from './TaskDispatchService'
export default {
  ...AgvDeviceService,
  ...AppUpgradeService,
  ...BroadcastService,
  ...ChargeService,
  ...DevicePropertyService,
  ...ErrorLogService,
  ...MeetingService,
  ...SensorDeviceService,
  ...StreamService,
  ...TaskRecordService,
  ...VideoService,
  ...TaskDispatchService,
  }
