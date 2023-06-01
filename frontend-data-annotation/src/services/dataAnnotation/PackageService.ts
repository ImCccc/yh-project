/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  PackageServiceCommitMark = '/rpc/data-annotation/PackageService.CommitMark',
  PackageServiceCommitQuality = '/rpc/data-annotation/PackageService.CommitQuality',
  PackageServiceGetMarkSample = '/rpc/data-annotation/PackageService.GetMarkSample',
  PackageServiceGetPackageQualityResult = '/rpc/data-annotation/PackageService.GetPackageQualityResult',
  PackageServiceGetQualitySample = '/rpc/data-annotation/PackageService.GetQualitySample',
  PackageServiceLabels = '/rpc/data-annotation/PackageService.Labels',
  PackageServiceMarkSamplePage = '/rpc/data-annotation/PackageService.MarkSamplePage',
  PackageServiceMarkStatistics = '/rpc/data-annotation/PackageService.MarkStatistics',
  PackageServicePage = '/rpc/data-annotation/PackageService.Page',
  PackageServiceQualitySamplePage = '/rpc/data-annotation/PackageService.QualitySamplePage',
  PackageServiceQualityStatistics = '/rpc/data-annotation/PackageService.QualityStatistics',
  PackageServiceSaveMarkSample = '/rpc/data-annotation/PackageService.SaveMarkSample',
  PackageServiceSaveQualitySample = '/rpc/data-annotation/PackageService.SaveQualitySample'
}

/** 提交标注包 POST /rpc/data-annotation/PackageService.CommitMark */
export async function PackageServiceCommitMark(
  body: ANNOTATION.dataAnnotationCommitMarkReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationCommitMarkResp>('/rpc/data-annotation/PackageService.CommitMark', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 提交质检包 POST /rpc/data-annotation/PackageService.CommitQuality */
export async function PackageServiceCommitQuality(
  body: ANNOTATION.dataAnnotationCommitQualityReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationCommitQualityResp>('/rpc/data-annotation/PackageService.CommitQuality', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取标注任务项详情 POST /rpc/data-annotation/PackageService.GetMarkSample */
export async function PackageServiceGetMarkSample(
  body: ANNOTATION.dataAnnotationGetMarkSampleReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationGetMarkSampleResp>('/rpc/data-annotation/PackageService.GetMarkSample', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询质检结果 POST /rpc/data-annotation/PackageService.GetPackageQualityResult */
export async function PackageServiceGetPackageQualityResult(
  body: ANNOTATION.dataAnnotationGetPackageQualityResultReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationGetPackageQualityResultResp>('/rpc/data-annotation/PackageService.GetPackageQualityResult', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取质检任务项详情 POST /rpc/data-annotation/PackageService.GetQualitySample */
export async function PackageServiceGetQualitySample(
  body: ANNOTATION.dataAnnotationGetQualitySampleReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationGetQualitySampleResp>('/rpc/data-annotation/PackageService.GetQualitySample', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询标签集 POST /rpc/data-annotation/PackageService.Labels */
export async function PackageServiceLabels(
  body: ANNOTATION.dataAnnotationPackageLabelReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationPackageLabelResp>('/rpc/data-annotation/PackageService.Labels', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 标注样本分页 POST /rpc/data-annotation/PackageService.MarkSamplePage */
export async function PackageServiceMarkSamplePage(
  body: ANNOTATION.dataAnnotationMarkSamplePageReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationMarkSamplePageResp>('/rpc/data-annotation/PackageService.MarkSamplePage', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 标注任务统计 POST /rpc/data-annotation/PackageService.MarkStatistics */
export async function PackageServiceMarkStatistics(
  body: ANNOTATION.dataAnnotationMarkStatisticsReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationMarkStatisticsResp>('/rpc/data-annotation/PackageService.MarkStatistics', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 任务包列表 POST /rpc/data-annotation/PackageService.Page */
export async function PackageServicePage(
  body: ANNOTATION.dataAnnotationPackagePageReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationPackagePageResp>('/rpc/data-annotation/PackageService.Page', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 质检样本分页 POST /rpc/data-annotation/PackageService.QualitySamplePage */
export async function PackageServiceQualitySamplePage(
  body: ANNOTATION.dataAnnotationQualitySamplePageReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationQualitySamplePageResp>('/rpc/data-annotation/PackageService.QualitySamplePage', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 质检任务统计 POST /rpc/data-annotation/PackageService.QualityStatistics */
export async function PackageServiceQualityStatistics(
  body: ANNOTATION.dataAnnotationQualityStatisticsReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationQualityStatisticsResp>('/rpc/data-annotation/PackageService.QualityStatistics', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 保存标注任务项 POST /rpc/data-annotation/PackageService.SaveMarkSample */
export async function PackageServiceSaveMarkSample(
  body: ANNOTATION.dataAnnotationSaveMarkSampleReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationSaveMarkSampleResp>('/rpc/data-annotation/PackageService.SaveMarkSample', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 保存质检任务项 POST /rpc/data-annotation/PackageService.SaveQualitySample */
export async function PackageServiceSaveQualitySample(
  body: ANNOTATION.dataAnnotationSaveQualitySampleReq,
  options ?: {[key: string]: any}
) {
  return request<ANNOTATION.dataAnnotationSaveQualitySampleResp>('/rpc/data-annotation/PackageService.SaveQualitySample', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

