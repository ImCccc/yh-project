/* eslint-disable */
import * as TaskDispatchService from './TaskDispatchService'
import * as AgvDeviceService from './AgvDeviceService'
import * as AppUpgradeService from './AppUpgradeService'
import * as BroadcastService from './BroadcastService'
import * as DataService from './DataService'
import * as DevicePropertyService from './DevicePropertyService'
import * as ErrorLogService from './ErrorLogService'
import * as IcescreenDeviceService from './IcescreenDeviceService'
import * as IcescreenVideoService from './IcescreenVideoService'
import * as SensorDeviceService from './SensorDeviceService'
import * as StreamService from './StreamService'
import * as TaskRecordService from './TaskRecordService'
import * as TaskService from './TaskService'
import * as UploadLogService from './UploadLogService'
export default {
  ...TaskDispatchService,
  ...AgvDeviceService,
  ...AppUpgradeService,
  ...BroadcastService,
  ...DataService,
  ...DevicePropertyService,
  ...ErrorLogService,
  ...IcescreenDeviceService,
  ...IcescreenVideoService,
  ...SensorDeviceService,
  ...StreamService,
  ...TaskRecordService,
  ...TaskService,
  ...UploadLogService,
  }
