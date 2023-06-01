/* eslint-disable */
declare namespace ANNOTATION {
  
  type dataAnnotationCommitMarkReq =  {
    'id': string;
  }
  
  type dataAnnotationCommitMarkResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type dataAnnotationCommitQualityReq =  {
    'id': string;
    /** 0-未通过 1-通过 */
    'is_pass': number;
    /** 质检描述 */
    'describe': string;
  }
  
  type dataAnnotationCommitQualityResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type dataAnnotationData =  {
    /** 数据集id */
    'id': string;
    /** 数据集名称 */
    'name': string;
    /** 描述 */
    'describe': string;
    /** 创建人 */
    'create_username': string;
    /** 创建时间 */
    'create_time': number;
    /** 更新时间 */
    'update_time': number;
    /** 数据集类型 1 音频 2 普通文本 3 泛化文本 */
    'type': number;
    /** 导入状态 0-导入完成、1-导入失败 */
    'import_status': number;
    /** 样本数量 */
    'sample_count': number;
  }
  
  type dataAnnotationDataAddReq =  {
    /** 数据集名称 */
    'name': string;
    /** 数据集描述 */
    'describe': string;
    /** 数据集类型 1 音频 2 普通文本 3 泛化文本 */
    'type': number;
    /** 文件数据 文件key=file */
    'files': Record<string, any>;
    'filenames': Record<string, any>;
  }
  
  type dataAnnotationDataAddResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type dataAnnotationDataAppendRecord =  {
    /** 上传时间 */
    'import_time': number;
    /** 样本数 */
    'sample_count': number;
    /** 导入人员 */
    'create_username': string;
    /** 批次Id */
    'batch_id': number;
  }
  
  type dataAnnotationDataAppendRecordReq =  {
    'id': string;
  }
  
  type dataAnnotationDataAppendRecordResp =  {
    'code': number;
    'msg': string;
    'list': dataAnnotationDataAppendRecord[];
  }
  
  type dataAnnotationDataAppendReq =  {
    /** 数据集id */
    'id': string;
    /** 文件数据 文件key=file */
    'files': Record<string, any>;
    'filenames': Record<string, any>;
  }
  
  type dataAnnotationDataAppendResp =  {
    'code': number;
    'msg': string;
  }
  
  type dataAnnotationDataDelReq =  {
    /** 数据集id */
    'id': string;
  }
  
  type dataAnnotationDataDelResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type dataAnnotationDataFile =  {
    'id': string;
    /** 文件名称 */
    'name': string;
    /** 文件大小 */
    'size': number;
    /** 格式(数据集类型 1 音频 2 普通文本 3 泛化文本) */
    'data_type': number;
    /** 上传时间 */
    'import_time': number;
    /** 批次Id */
    'batch_id': number;
  }
  
  type dataAnnotationDataFilePageReq =  {
    /** 数据集id */
    'id': string;
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
  }
  
  type dataAnnotationDataFilePageResp =  {
    'code': number;
    'msg': string;
    'total': number;
    'list': dataAnnotationDataFile[];
  }
  
  type dataAnnotationDataGetReq =  {
    'id': string;
  }
  
  type dataAnnotationDataGetResp =  {
    'code': number;
    'msg': string;
    'item': dataAnnotationData;
  }
  
  type dataAnnotationDataPageReq =  {
    /** 是否显示所有，0-我创建的，1-所有 */
    'is_total': number;
    /** 数据集类型 1 音频 2 普通文本 3 泛化文本 */
    'type': number;
    /** 数据集名称 */
    'name': string;
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
  }
  
  type dataAnnotationDataPageResp =  {
    'code': number;
    'msg': string;
    /** 列表数量 */
    'total': number;
    /** 列表 */
    'list': dataAnnotationData[];
  }
  
  type dataAnnotationDataTask =  {
    /** 任务id */
    'task_id': string;
    /** 任务名称 */
    'task_name': string;
    /** 标注类型 11 音频分类 12 音频转写 13 音频分割 21 文本分类 22 文本泛化 23 意图槽位 */
    'mark_type': number;
    /** 任务进度 */
    'task_progress': string;
  }
  
  type dataAnnotationDataTaskPageReq =  {
    /** 数据集id */
    'id': string;
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
  }
  
  type dataAnnotationDataTaskPageResp =  {
    'code': number;
    'msg': string;
    'total': number;
    'list': dataAnnotationDataTask[];
  }
  
  type dataAnnotationDataUpdateReq =  {
    /** 数据集id */
    'id': string;
    /** 数据集名称 */
    'name': string;
    /** 数据集描述 */
    'describe': string;
  }
  
  type dataAnnotationDataUpdateResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type dataAnnotationFileSignedUrlReq =  {
    /** 桶 */
    'bucket': string;
    /** 文件名，格式：xx/xx/xx.jpg */
    'object': string;
  }
  
  type dataAnnotationFileSignedUrlResp =  {
    /** 状态码 */
    'code': number;
    /** 错误消息 */
    'msg': string;
    /** 返回预签名url */
    'pre_signed_url': string;
    /** 文件url, 一般用于回传 */
    'source_url': string;
  }
  
  type dataAnnotationFileTemplateReq =  {
    /** 模板类型 1 音频 2 普通文本 3 泛化文本 11-标签 */
    'type': number;
  }
  
  type dataAnnotationFileTemplateResp =  {
    'code': number;
    'msg': string;
    /** 文件url */
    'file_url': string;
  }
  
  type dataAnnotationForgetPasswordReq =  {
    'email': string;
    'verification_code': string;
    'password': string;
  }
  
  type dataAnnotationForgetPasswordResp =  {
    'code': number;
    'msg': string;
  }
  
  type dataAnnotationGetMarkSampleReq =  {
    /** 任务包id */
    'id': string;
    /** 标注样本序号 */
    'sequence': number;
  }
  
  type dataAnnotationGetMarkSampleResp =  {
    'code': number;
    'msg': string;
    'item': dataAnnotationMarkSample;
  }
  
  type dataAnnotationGetPackageQualityResultReq =  {
    /** 标注包id */
    'mark_package_id': string;
  }
  
  type dataAnnotationGetPackageQualityResultResp =  {
    'code': number;
    'msg': string;
    'item': dataAnnotationQualityResult;
  }
  
  type dataAnnotationGetQualitySampleReq =  {
    /** 任务包Id */
    'id': string;
    /** 质检任务项的序号 */
    'sequence': number;
  }
  
  type dataAnnotationGetQualitySampleResp =  {
    'code': number;
    'msg': string;
    /** 质检任务项Id */
    'quality_sample_id': number;
    /** 质检任务序号 */
    'quality_sequence': number;
    'item': dataAnnotationMarkSample;
  }
  
  type dataAnnotationGetTaskMarkSampleNumberReq =  {
    /** 任务id */
    'id': string;
  }
  
  type dataAnnotationGetTaskMarkSampleNumberResp =  {
    'code': number;
    'msg': string;
    /** 标注任务项数据总数 */
    'sample_count': number;
  }
  
  type dataAnnotationGetTaskMarkSampleReq =  {
    /** 任务id */
    'id': string;
    /** 样本序号 */
    'sequence': number;
  }
  
  type dataAnnotationGetTaskMarkSampleResp =  {
    'code': number;
    'msg': string;
    'item': dataAnnotationMarkSample;
  }
  
  type dataAnnotationJob =  {
    /** 作业id */
    'id': string;
    /** 任务名称 */
    'name': string;
    /** 作业类型(1 标注 2 质检) */
    'type': number;
    /** 标注类型  11 音频分类 12 音频转写 13 音频分割 21 文本分类 22 文本泛化 23 意图槽位 */
    'mark_type': number;
    /** 任务状态 1 待分配 2 进行中 3 验收通过 4 验收不通过 */
    'status': number;
    /** 任务进度 */
    'task_progress': string;
    /** 样本数 */
    'sample_count': number;
    /** 数据集信息 */
    'data_id': string;
    /** 数据集信息 */
    'data_name': string;
    'mark_team': dataAnnotationTeam;
    /** 是需要质检 1是 0否 */
    'is_quality': number;
    /** 质检抽样率 */
    'quality_rate': number;
    'quality_team': dataAnnotationTeam;
    /** 选中的标签集 */
    'label_sets': dataAnnotationLabelSet[];
    /** 创建人 */
    'create_username': string;
    /** 创建时间 */
    'create_time': number;
    /** 团队人数 */
    'team_member_count': number;
    /** 任务总数 */
    'task_count': number;
    /** 已提交任务数 */
    'commited_task_count': number;
    /** 截至时间 */
    'need_finish_time': number;
    /** 描述 */
    'describe': string;
  }
  
  type dataAnnotationJobAssignReq =  {
    'id': string;
    'user_ids': string[];
  }
  
  type dataAnnotationJobAssignResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type dataAnnotationJobDetailReq =  {
    'id': string;
  }
  
  type dataAnnotationJobDetailResp =  {
    'code': number;
    'msg': string;
    'job': dataAnnotationJob;
    'list': dataAnnotationJobPackage[];
  }
  
  type dataAnnotationJobGetReq =  {
    /** 作业id */
    'id': string;
  }
  
  type dataAnnotationJobGetResp =  {
    'code': number;
    'msg': string;
    'item': dataAnnotationJob;
  }
  
  type dataAnnotationJobPackage =  {
    /** 任务包Id */
    'package_id': string;
    /** 标注/质检人员 */
    'user_name': string;
    /** 标注/质检状态  标注中 标注已提交 质检中 质检通过 质检不通过 验收通过 验收不通过 */
    'job_status': string;
    /** 任务包进度 */
    'job_progress': string;
    /** 是否可以移交 */
    'can_transfer': boolean;
    /** 作业类型(1 标注 2 质检) */
    'job_type': number;
    /** 质检通过率 */
    'quality_pass_rate': string;
    'create_time': number;
    /** 标注/质检人员Id */
    'user_id': string;
  }
  
  type dataAnnotationJobPageReq =  {
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
    /** 是否显示所有，0-我创建的，1-所有 */
    'is_total': number;
    /** 任务名称 */
    'name': string;
    /** 标注类型 11 音频分类 12 音频转写 13 音频分割 21 文本分类 22 文本泛化 23 意图槽位 */
    'mark_type': number;
  }
  
  type dataAnnotationJobPageResp =  {
    'code': number;
    'msg': string;
    'total': number;
    'list': dataAnnotationJob[];
  }
  
  type dataAnnotationJobTransferReq =  {
    /** 任务包Id */
    'package_id': string;
    /** 成员用户Id */
    'user_id': string;
    /** 作业类型(1 标注 2 质检) */
    'job_type': number;
  }
  
  type dataAnnotationJobTransferResp =  {
    'code': number;
    'msg': string;
    'package_id': string;
  }
  
  type dataAnnotationLabel =  {
    /** id */
    'id': string;
    /** 标签集id */
    'label_set_id': string;
    /** 名称 */
    'name': string;
    /** 颜色 */
    'color': string;
  }
  
  type dataAnnotationLabelAddReq =  {
    'item': dataAnnotationLabel;
  }
  
  type dataAnnotationLabelAddResp =  {
    'code': number;
    'msg': string;
    'item': dataAnnotationLabel;
  }
  
  type dataAnnotationLabelBatchAddReq =  {
    /** 标签集Id */
    'label_set_id': string;
    /** 导入方式 0-追加 1-覆盖 */
    'import_mode': number;
    /** 文件数据 文件key=file */
    'files': Record<string, any>;
    'filenames': Record<string, any>;
  }
  
  type dataAnnotationLabelBatchAddResp =  {
    'code': number;
    'msg': string;
    'fail_list': string[];
  }
  
  type dataAnnotationLabelBatchDelReq =  {
    'ids': string[];
  }
  
  type dataAnnotationLabelBatchDelResp =  {
    'code': number;
    'msg': string;
    'ids': string[];
  }
  
  type dataAnnotationLabelDelReq =  {
    'id': string;
  }
  
  type dataAnnotationLabelDelResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type dataAnnotationLabelGetReq =  {
    'id': string;
  }
  
  type dataAnnotationLabelGetResp =  {
    'code': number;
    'msg': string;
    'item': dataAnnotationLabel;
  }
  
  type dataAnnotationLabelPageReq =  {
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
    /** 标签集id */
    'label_set_id': string;
    /** 标签名称 */
    'name': string;
  }
  
  type dataAnnotationLabelPageResp =  {
    'code': number;
    'msg': string;
    /** 列表数量 */
    'total': number;
    /** 列表 */
    'list': dataAnnotationLabel[];
  }
  
  type dataAnnotationLabelSet =  {
    /** id */
    'id': string;
    /** 名称 */
    'name': string;
    /** 类型 1 普通 2 意图 3 槽位 */
    'type': number;
    /** 描述 */
    'describe': string;
    /** 是否多选 0-单选 1-多选 */
    'is_multiple_select': number;
    /** 创建人 */
    'create_username': string;
    /** 创建时间 */
    'create_time': number;
  }
  
  type dataAnnotationLabelSetAddReq =  {
    'item': dataAnnotationLabelSet;
  }
  
  type dataAnnotationLabelSetAddResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type dataAnnotationLabelSetCopyReq =  {
    'source_id': string;
    /** 名称 */
    'name': string;
    /** 描述 */
    'describe': string;
    /** 是否多选 0-单选 1-多选 */
    'is_multiple_select': number;
  }
  
  type dataAnnotationLabelSetCopyResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type dataAnnotationLabelSetDelReq =  {
    /** 标签集Id */
    'id': string;
  }
  
  type dataAnnotationLabelSetDelResp =  {
    'code': number;
    'msg': string;
    /** 标签集Id */
    'id': string;
  }
  
  type dataAnnotationLabelSetDetail =  {
    /** 标签集Id */
    'id': string;
    /** 名称 */
    'name': string;
    /** 类型 1 普通 2 意图 3 槽位 */
    'type': number;
    /** 描述 */
    'describe': string;
    /** 是否多选 0-单选 1-多选 */
    'is_multiple_select': number;
    /** 标签 */
    'lables': dataAnnotationLabel[];
  }
  
  type dataAnnotationLabelSetGetReq =  {
    'id': string;
  }
  
  type dataAnnotationLabelSetGetResp =  {
    'code': number;
    'msg': string;
    'item': dataAnnotationLabelSet;
  }
  
  type dataAnnotationLabelSetPageReq =  {
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
    /** 是否显示所有，0-我创建的，1-所有 */
    'is_total': number;
    /** 类型 1 普通 2 意图 3 槽位 */
    'type': number;
    /** 名字 */
    'name': string;
  }
  
  type dataAnnotationLabelSetPageResp =  {
    'code': number;
    'msg': string;
    /** 列表数量 */
    'total': number;
    /** 列表 */
    'list': dataAnnotationLabelSet[];
  }
  
  type dataAnnotationLabelSetUpdateReq =  {
    'item': dataAnnotationLabelSet;
  }
  
  type dataAnnotationLabelSetUpdateResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type dataAnnotationLabelUpdateReq =  {
    'id': string;
    'name': string;
  }
  
  type dataAnnotationLabelUpdateResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type dataAnnotationLog =  {
    /** 日志id */
    'id': string;
    /** 模块id */
    'module_id': string;
    /** 模块类型 */
    'module_type': number;
    /** 操作人员 */
    'operation_username': string;
    /** 操作时间 */
    'operation_time': number;
    /** 操作内容 */
    'operation_context': string;
  }
  
  type dataAnnotationLogPageReq =  {
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
    /** 操作人员 */
    'user_id': string;
    /** 模块类型 */
    'module_type': number;
    /** 开始时间 */
    'start_time': number;
    /** 结束时间 */
    'end_time': number;
    /** 模块id */
    'module_id': string;
  }
  
  type dataAnnotationLogPageResp =  {
    'code': number;
    'msg': string;
    'total': number;
    'list': dataAnnotationLog[];
  }
  
  type dataAnnotationLoginReq =  {
    /** 用户名 邮箱 */
    'username': string;
    /** 密码 */
    'password': string;
    /** 角色代码 */
    'role_code': string;
  }
  
  type dataAnnotationLoginResp =  {
    'code': number;
    'msg': string;
    /** 用户id */
    'user_id': string;
    /** 姓名 */
    'name': string;
    /** 邮箱 */
    'email': string;
    /** 角色代码 */
    'role_codes': string[];
    /** token */
    'token': string;
  }
  
  type dataAnnotationLogoutReq = Record<string, any>;
  
  type dataAnnotationLogoutResp =  {
    'code': number;
    'msg': string;
  }
  
  type dataAnnotationMarkSample =  {
    /** 标注任务项Id */
    'mark_sample_id': number;
    /** 标注结果 */
    'result': string;
    /** 样本名称 */
    'name': string;
    /** 样本内容 */
    'context': string;
    /** 质检是否不通过 */
    'is_quality_no_pass': boolean;
    /** 序号 */
    'sequence': number;
    /** 样本序号 */
    'sample_sequence': number;
    /** 样本id */
    'sample_id': number;
    /** 是否已完成标注 0 未完成标注 1 已完成标注 */
    'is_finish': number;
    /** 质检状态  1 质检中 2 质检通过 3 质检不通过 */
    'quality_status': number;
  }
  
  type dataAnnotationMarkSamplePageReq =  {
    /** 标注包ID */
    'id': string;
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
  }
  
  type dataAnnotationMarkSamplePageResp =  {
    'code': number;
    'msg': string;
    'total': number;
    'list': dataAnnotationMarkSampleStatus[];
  }
  
  type dataAnnotationMarkSampleStatus =  {
    /** 标注任务项Id */
    'mark_sample_id': number;
    /** 序号 */
    'sequence': number;
    /** 是否已完成标注 0 未完成标注 1 已完成标注 */
    'is_finish': number;
  }
  
  type dataAnnotationMarkStatisticsReq =  {
    /** 任务包Id */
    'id': string;
  }
  
  type dataAnnotationMarkStatisticsResp =  {
    'code': number;
    'msg': string;
    /** 样本总数 */
    'sample_count': number;
    /** 已完成样本数 */
    'finish_sample_count': number;
  }
  
  type dataAnnotationMemberAddReq =  {
    /** 团队id */
    'team_id': string;
    /** 用户id */
    'user_ids': string[];
  }
  
  type dataAnnotationMemberAddResp =  {
    'code': number;
    'msg': string;
    'team_id': string;
    'user_ids': string[];
  }
  
  type dataAnnotationMemberPageReq =  {
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
    /** 团队id */
    'team_id': string;
  }
  
  type dataAnnotationMemberPageResp =  {
    'code': number;
    'msg': string;
    /** 列表数量 */
    'total': number;
    /** 成员用户列表 */
    'list': dataAnnotationUser[];
  }
  
  type dataAnnotationMemberRemoveReq =  {
    /** 团队id */
    'team_id': string;
    /** 成员的用户id */
    'user_id': string;
  }
  
  type dataAnnotationMemberRemoveResp =  {
    'code': number;
    'msg': string;
    'team_id': string;
    'user_id': string;
  }
  
  type dataAnnotationMemberTaskNumber =  {
    /** 用户Id */
    'user_id': string;
    /** 用户名 */
    'user_name': string;
    /** 邮箱 */
    'email': string;
    /** 标注任务数 */
    'mark_task_count': number;
    /** 质检任务数 */
    'quality_task_count': number;
  }
  
  type dataAnnotationMemberTaskNumberReq =  {
    /** 团队id */
    'team_id': string;
    /** 成员名称 搜索使用 */
    'name': string;
  }
  
  type dataAnnotationMemberTaskNumberResp =  {
    'code': number;
    'msg': string;
    'list': dataAnnotationMemberTaskNumber[];
  }
  
  type dataAnnotationMenu =  {
    'id': string;
    /** 父菜单id */
    'parent_id': string;
    /** 菜单图标 */
    'icon': string;
    /** 菜单路径 */
    'route': string;
    /** 菜单名称 */
    'name': string;
    /** 排序 */
    'sort': number;
  }
  
  type dataAnnotationMenuListReq = Record<string, any>;
  
  type dataAnnotationMenuListResp =  {
    'code': number;
    'msg': string;
    /** 菜单列表 */
    'list': dataAnnotationMenu[];
  }
  
  type dataAnnotationPackage =  {
    /** 包id */
    'id': string;
    /** 任务名称 */
    'name': string;
    /** 作业类型(1 标注 2 质检) */
    'job_type': number;
    /** 标注类型 11 音频分类 12 音频转写 13 音频分割 21 文本分类 22 文本泛化 23 意图槽位 */
    'mark_type': number;
    /** 样本数 */
    'sample_count': number;
    /** 任务进度 */
    'progress': string;
    /** 标注状态 1 标注中 2 标注已提交 3 验收通过 4 验收不通过 */
    'mark_status': number;
    /** 质检状态  1 质检中 2 质检通过 3 质检不通过 4 验收通过 5 验收不通过 6 未开始 */
    'quality_status': number;
    /** 创建人 */
    'create_username': string;
    /** 创建时间 */
    'create_time': number;
    /** 质检描述 */
    'quality_describe': string;
    /** 截至时间 */
    'need_finish_time': number;
    /** 任务id */
    'task_id': string;
  }
  
  type dataAnnotationPackageLabelReq =  {
    /** 任务包Id */
    'id': string;
  }
  
  type dataAnnotationPackageLabelResp =  {
    'code': number;
    'msg': string;
    'item': dataAnnotationLabelSetDetail[];
  }
  
  type dataAnnotationPackagePageReq =  {
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
    /** 任务名称 */
    'name': string;
    /** 标注类型 11 音频分类 12 音频转写 13 音频分割 21 文本分类 22 文本泛化 23 意图槽位 */
    'mark_type': number;
  }
  
  type dataAnnotationPackagePageResp =  {
    'code': number;
    'msg': string;
    'total': number;
    'list': dataAnnotationPackage[];
  }
  
  type dataAnnotationQualityResult =  {
    /** 任务名称 */
    'task_name': string;
    /** 标注类型 11 音频分类 12 音频转写 13 音频分割 21 文本分类 22 文本泛化 23 意图槽位 */
    'mark_type': number;
    /** 标注样本数量 */
    'mark_sample_count': number;
    /** 质检抽样率 */
    'quality_rate': number;
    /** 质检样本数量 */
    'quality_sample_count': number;
    /** 质检结果 */
    'status': number;
    /** 质检描述 */
    'describe': string;
  }
  
  type dataAnnotationQualitySamplePageReq =  {
    /** 质检包ID */
    'id': string;
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
  }
  
  type dataAnnotationQualitySamplePageResp =  {
    'code': number;
    'msg': string;
    'total': number;
    'list': dataAnnotationQualitySampleStatus[];
  }
  
  type dataAnnotationQualitySampleStatus =  {
    /** 标注任务项Id */
    'quality_sample_id': number;
    /** 序号 */
    'sequence': number;
    /** 质检状态 1 待质检 2 质检通过 3 质检不通过 */
    'status': number;
  }
  
  type dataAnnotationQualityStatisticsReq =  {
    /** 任务包Id */
    'id': string;
  }
  
  type dataAnnotationQualityStatisticsResp =  {
    'code': number;
    'msg': string;
    /** 样本总数 */
    'sample_count': number;
    /** 质检通过 */
    'passed_sample_count': number;
    /** 质检不通过 */
    'no_pass_sample_count': number;
  }
  
  type dataAnnotationSaveMarkSampleReq =  {
    /** 包id */
    'package_id': string;
    /** 样本id */
    'sample_id': number;
    /** 标注结果 */
    'result': string;
  }
  
  type dataAnnotationSaveMarkSampleResp =  {
    'code': number;
    'msg': string;
    'mark_sample_id': number;
  }
  
  type dataAnnotationSaveQualitySampleReq =  {
    /** 质检任务项Id */
    'quality_sample_id': number;
    /** 0-未通过 1-通过 */
    'is_pass': number;
  }
  
  type dataAnnotationSaveQualitySampleResp =  {
    'code': number;
    'msg': string;
    'quality_sample_id': number;
  }
  
  type dataAnnotationTask =  {
    /** 任务Id */
    'id': string;
    /** 任务名称 */
    'name': string;
    /** 标注类型 11 音频分类 12 音频转写 13 音频分割 21 文本分类 22 文本泛化 23 意图槽位 */
    'mark_type': number;
    /** 数据集Id */
    'data_id': string;
    /** 数据集名称 */
    'data_name': string;
    'mark_team': dataAnnotationTeam;
    /** 是需要质检 1是 0否 */
    'is_quality': number;
    /** 质检抽样率 */
    'quality_rate': number;
    'quality_team': dataAnnotationTeam;
    /** 截至时间 */
    'need_finish_time': number;
    /** 任务进度 */
    'task_progress': string;
    /** 任务状态 1 进行中 2 质检完成 3 验收通过 */
    'status': number;
    /** 选中的标签集 */
    'label_sets': dataAnnotationLabelSet[];
    /** 创建人 */
    'create_username': string;
    /** 创建时间 */
    'create_time': number;
    /** 描述 */
    'describe': string;
  }
  
  type dataAnnotationTaskAcceptReq =  {
    'id': string;
    /** 验收标识 */
    'is_accept': boolean;
    /** 验收不通过需要，需要重新选择的标注团队id */
    'mark_team_id': string;
    /** 验收不通过需要，需要重新选择的质检团队id */
    'quality_team_id': string;
    /** 验收描述 */
    'describe': string;
  }
  
  type dataAnnotationTaskAcceptResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type dataAnnotationTaskAddReq =  {
    /** 任务名称 */
    'name': string;
    /** 标注类型 11 音频分类 12 音频转写 13 音频分割 21 文本分类 22 文本泛化 23 意图槽位 */
    'mark_type': number;
    /** 描述 */
    'describe': string;
    /** 数据集 */
    'data_id': string;
    /** 标注团队id */
    'mark_team_id': string;
    /** 质检团队id */
    'quality_team_id': string;
    /** 是需要质检 1是 0否 */
    'is_quality': number;
    /** 质检抽样率[0,100] */
    'quality_rate': number;
    /** 截至时间 */
    'need_finish_time': number;
    /** 标签集列表 */
    'label_set_ids': string[];
  }
  
  type dataAnnotationTaskAddResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type dataAnnotationTaskCopyReq =  {
    /** 拷贝的任务id */
    'source_id': string;
    /** 任务名称 */
    'name': string;
    /** 任务描述 */
    'describe': string;
    /** 标注团队id */
    'mark_team_id': string;
    /** 质检团队id */
    'quality_team_id': string;
    /** 是需要质检 1是 0否 */
    'is_quality': number;
    /** 质检抽样率(0,100] */
    'quality_rate': number;
    /** 截至时间 */
    'need_finish_time': number;
    /** 标签集列表 */
    'label_set_ids': string[];
  }
  
  type dataAnnotationTaskCopyResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type dataAnnotationTaskDelReq =  {
    /** 任务id */
    'id': string;
  }
  
  type dataAnnotationTaskDelResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type dataAnnotationTaskDetail =  {
    /** id */
    'id': string;
    /** 任务名称 */
    'name': string;
    /** 数据集名称 */
    'data_name': string;
    /** 质检参与人数 */
    'quality_member_count': number;
    /** 标注参与人数 */
    'mark_member_count': number;
    /** 任务总数 */
    'task_count': number;
    /** 已提交的任务数 */
    'commit_task_count': number;
  }
  
  type dataAnnotationTaskDetailReq =  {
    'id': string;
  }
  
  type dataAnnotationTaskDetailResp =  {
    'code': number;
    'msg': string;
    'item': dataAnnotationTaskDetail;
    'list': dataAnnotationTaskPackage[];
  }
  
  type dataAnnotationTaskDownloadReq =  {
    'id': string;
  }
  
  type dataAnnotationTaskDownloadResp =  {
    'code': number;
    'msg': string;
    'file_url': string;
  }
  
  type dataAnnotationTaskGetReq =  {
    'id': string;
  }
  
  type dataAnnotationTaskGetResp =  {
    'code': number;
    'msg': string;
    'item': dataAnnotationTask;
  }
  
  type dataAnnotationTaskPackage =  {
    'id': string;
    /** 标注人员 */
    'mark_user': string;
    /** 标注状态 1 标注中 2 标注已提交 3 验收通过 4 验收不通过 */
    'mark_status_text': string;
    /** 标注进度 */
    'mark_progress': string;
    /** 质检状态 1 质检中 2 质检通过 3 质检不通过 4 验收通过 5 验收不通过 6 未开始 */
    'quality_status_text': string;
    /** 质检进度 */
    'quality_progress': string;
    /** 质检通过率 */
    'passed_quality_rate': string;
    /** 质检用户 */
    'quality_user': string;
    /** 任务包创建时间 */
    'create_time': number;
  }
  
  type dataAnnotationTaskPageReq =  {
    /** 是否显示所有，0-我创建的，1-所有 */
    'is_total': number;
    /** 任务名称 */
    'name': string;
    /** 标注类型 11 音频分类 12 音频转写 13 音频分割 21 文本分类 22 文本泛化 23 意图槽位 */
    'mark_type': number;
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
  }
  
  type dataAnnotationTaskPageResp =  {
    'code': number;
    'msg': string;
    'total': number;
    'list': dataAnnotationTask[];
  }
  
  type dataAnnotationTaskUpdateReq =  {
    'id': string;
    'name': string;
    'describe': string;
  }
  
  type dataAnnotationTaskUpdateResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type dataAnnotationTeam =  {
    /** 团队Id */
    'id': string;
    /** 团队名称 */
    'name': string;
    /** 团队描述 */
    'describe': string;
    /** 团队人数 */
    'member_count': number;
    /** 创建用户名 */
    'create_username': string;
    /** 创建时间 */
    'create_time': number;
    /** 队长id */
    'leader_user_id': string;
  }
  
  type dataAnnotationTeamAddReq =  {
    'item': dataAnnotationTeam;
  }
  
  type dataAnnotationTeamAddResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type dataAnnotationTeamDelReq =  {
    /** 团队id */
    'id': string;
  }
  
  type dataAnnotationTeamDelResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type dataAnnotationTeamGetReq =  {
    /** 团队id */
    'id': string;
  }
  
  type dataAnnotationTeamGetResp =  {
    'code': number;
    'msg': string;
    'team': dataAnnotationTeam;
  }
  
  type dataAnnotationTeamPageReq =  {
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
    /** 是否显示所有，0-我创建的，1-所有 */
    'is_total': number;
    /** 团队名称 */
    'name': string;
  }
  
  type dataAnnotationTeamPageResp =  {
    'code': number;
    'msg': string;
    'total': number;
    /** 团队列表 */
    'list': dataAnnotationTeam[];
  }
  
  type dataAnnotationTeamUpdateReq =  {
    /** 团队id */
    'id': string;
    /** 团队名称 */
    'name': string;
    /** 团队描述 */
    'describe': string;
  }
  
  type dataAnnotationTeamUpdateResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type dataAnnotationUser =  {
    /** 用户id */
    'id': string;
    /** 用户名称 */
    'name': string;
    /** 电子邮件 */
    'email': string;
    /** 手机号 */
    'phone': string;
    /** 密码 */
    'password': string;
    /** 创建时间 */
    'create_time': number;
    /** 创建用户名 */
    'create_username': string;
    /** 创建用户Id */
    'create_user': string;
    /** 角色代码 */
    'role_code': string;
  }
  
  type dataAnnotationUserAddReq =  {
    'item': dataAnnotationUser;
  }
  
  type dataAnnotationUserAddResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type dataAnnotationUserDelReq =  {
    'id': string;
  }
  
  type dataAnnotationUserDelResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type dataAnnotationUserGetReq =  {
    'id': string;
  }
  
  type dataAnnotationUserGetResp =  {
    'code': number;
    'msg': string;
    'item': dataAnnotationUser;
  }
  
  type dataAnnotationUserListSelect =  {
    /** 用户id */
    'id': string;
    /** 用户名称 */
    'name': string;
    /** 电子邮件 */
    'email': string;
  }
  
  type dataAnnotationUserListSelectReq =  {
    'team_id': string;
  }
  
  type dataAnnotationUserListSelectResp =  {
    'code': number;
    'msg': string;
    'list': dataAnnotationUserListSelect[];
  }
  
  type dataAnnotationUserPageReq =  {
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
    /** 是否显示所有，0-我创建的，1-所有 */
    'is_total': number;
    /** 名字 */
    'name': string;
  }
  
  type dataAnnotationUserPageResp =  {
    'code': number;
    'msg': string;
    'total': number;
    'list': dataAnnotationUser[];
  }
  
  type dataAnnotationUserUpdateReq =  {
    /** 用户id */
    'id': string;
    /** 用户名称 */
    'name': string;
    /** 新密码 */
    'new_password': string;
  }
  
  type dataAnnotationUserUpdateResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type dataAnnotationUserUpdateSelfReq =  {
    /** 用户id */
    'id': string;
    /** 用户名称 */
    'name': string;
    /** 当密码 */
    'cur_password': string;
    /** 新密码 */
    'new_password': string;
  }
  
  type dataAnnotationUserUpdateSelfResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type dataAnnotationVerificationCodeReq =  {
    'email': string;
  }
  
  type dataAnnotationVerificationCodeResp =  {
    'code': number;
    'msg': string;
    'verification_code': string;
  }
  
  type dataAnnotationVerifyPasswordReq =  {
    'password': string;
  }
  
  type dataAnnotationVerifyPasswordResp =  {
    'code': number;
    'msg': string;
  }
  
}
