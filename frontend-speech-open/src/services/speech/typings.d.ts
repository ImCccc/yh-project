/* eslint-disable */
declare namespace SPEECH {
  
  type speechAsrSignUrlReq = Record<string, any>;
  
  type speechAsrSignUrlResp =  {
    'code': number;
    'msg': string;
    /** 签名url */
    'sign_url': string;
  }
  
  type speechDeviceRegisterReq =  {
    'app_id': string;
    'device_sn': string;
    'mac': string;
    'sdk_version': string;
    'system': string;
  }
  
  type speechDeviceRegisterResp =  {
    'code': number;
    'msg': string;
  }
  
  type speechExportPageFlowLogReq =  {
    /** 设备标识 */
    'device_sn': string;
    /** 结束时间戳 */
    'end_time': number;
    /** 开始时间戳 */
    'start_time': number;
  }
  
  type speechExportPageFlowLogResp =  {
    'code': number;
    'file_url': string;
    'msg': string;
  }
  
  type speechFlowLog =  {
    /** asr结果 */
    'asr_info': string;
    /** asr文本 */
    'asr_text': string;
    /** 交互时间 */
    'create_time': number;
    /** 设备sn */
    'device_sn': string;
    /** 失败原因 */
    'fail_reason': string;
    /** 状态 */
    'flow_status': string;
    'id': string;
    /** 意图id */
    'intent_id': string;
    /** 交互id */
    'interact_id': string;
    /** 会话id */
    'session_id': string;
    /** 技能id */
    'skill_id': string;
    'time_stat': speechFlowLogTimeStat;
    /** tts文本 */
    'tts_text': string;
    /** 交互类型 */
    'type': string;
    /** 语音文件 */
    'voice_file_path': string;
  }
  
  type speechFlowLogTimeStat =  {
    /** aiui_nlp 消耗时间 */
    'aiui_nlp_cost_time': number;
    /** aiui_nlp 结束时间 */
    'aiui_nlp_end_time': number;
    /** aiui_nlp 开始时间 */
    'aiui_nlp_start_time': number;
    /** asr 消耗时间 */
    'asr_cost_time': number;
    /** asr 结束时间 */
    'asr_end_time': number;
    /** asr 开始时间 */
    'asr_start_time': number;
    /** nlp 消耗时间 */
    'nlp_cost_time': number;
    /** nlp 结束时间 */
    'nlp_end_time': number;
    /** nlp 开始时间 */
    'nlp_start_time': number;
    /** vad 结束时间 */
    'vad_end_time': number;
    /** vad 开始时间 */
    'vad_start_time': number;
  }
  
  type speechNlpSignUrlReq =  {
    /** 应用id */
    'app_id': string;
    /** 环境 main main_box */
    'env': string;
  }
  
  type speechNlpSignUrlResp =  {
    'code': number;
    'msg': string;
    /** 签名url */
    'sign_url': string;
  }
  
  type speechPageFlowLogReq =  {
    /** 设备标识 */
    'device_sn': string;
    /** 结束时间戳 */
    'end_time': number;
    /** 第几页，从1开始 */
    'page': number;
    /** 每页多少条 */
    'size': number;
    /** 开始时间戳 */
    'start_time': number;
  }
  
  type speechPageFlowLogResp =  {
    'code': number;
    /** 数据列表 */
    'list': speechFlowLog[];
    'msg': string;
    /** 记录总数 */
    'total': number;
  }
  
}
