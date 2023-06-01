/* eslint-disable */
import * as AuthService from './AuthService'
import * as DataService from './DataService'
import * as FileService from './FileService'
import * as JobService from './JobService'
import * as LabelService from './LabelService'
import * as LabelSetService from './LabelSetService'
import * as LogService from './LogService'
import * as MemberService from './MemberService'
import * as PackageService from './PackageService'
import * as TaskService from './TaskService'
import * as TeamService from './TeamService'
import * as UserService from './UserService'
export default {
  ...AuthService,
  ...DataService,
  ...FileService,
  ...JobService,
  ...LabelService,
  ...LabelSetService,
  ...LogService,
  ...MemberService,
  ...PackageService,
  ...TaskService,
  ...TeamService,
  ...UserService,
  }
