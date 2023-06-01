/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  SignUrlServiceAsr = '/rpc/speech.service-robotics/SignUrlService.Asr',
  SignUrlServiceNlp = '/rpc/speech.service-robotics/SignUrlService.Nlp'
}

/** 此处后端没有提供注释 POST /rpc/speech.service-robotics/SignUrlService.Asr */
export async function SignUrlServiceAsr(
  body: SPEECH.speechAsrSignUrlReq,
  options ?: {[key: string]: any}
) {
  return request<SPEECH.speechAsrSignUrlResp>('/rpc/speech.service-robotics/SignUrlService.Asr', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** nlp签名url POST /rpc/speech.service-robotics/SignUrlService.Nlp */
export async function SignUrlServiceNlp(
  body: SPEECH.speechNlpSignUrlReq,
  options ?: {[key: string]: any}
) {
  return request<SPEECH.speechNlpSignUrlResp>('/rpc/speech.service-robotics/SignUrlService.Nlp', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

