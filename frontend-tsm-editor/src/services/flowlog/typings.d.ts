// @ts-ignore
/* eslint-disable */

declare namespace API {
  
  type flowLogExportPageFlowLogReq =  {
    /** 设备标识 */
    'device_sn'
    : string;
    /** 开始时间戳 */
    'start_time'
    : number;
    /** 结束时间戳 */
    'end_time'
    : number;
  }

  type flowLogExportPageFlowLogResp =  {
    'code'
    : number;
    'msg'
    : string;
    'file_url'
    : string;
  }

  type flowLogFlowLog =  {
    'id'
    : string;
    /** 设备sn */
    'device_sn'
    : string;
    /** 会话id */
    'session_id'
    : string;
    /** 交互id */
    'interact_id'
    : string;
    /** asr文本 */
    'asr_text'
    : string;
    /** tts文本 */
    'tts_text'
    : string;
    /** 技能id */
    'skill_id'
    : string;
    /** 意图id */
    'intent_id'
    : string;
    /** 状态 */
    'flow_status'
    : string;
    /** 语音文件 */
    'voice_file_path'
    : string;
    /** 交互时间 */
    'create_time'
    : number;
    'time_stat'
    : flowLogFlowLogTimeStat;
  }

  type flowLogFlowLogTimeStat =  {
    /** vad 开始时间 */
    'vad_start_time'
    : number;
    /** vad 结束时间 */
    'vad_end_time'
    : number;
    /** nlp 消耗时间 */
    'nlp_cost_time'
    : number;
    /** nlp 开始时间 */
    'nlp_start_time'
    : number;
    /** nlp 结束时间 */
    'nlp_end_time'
    : number;
    /** asr 消耗时间 */
    'asr_cost_time'
    : number;
    /** asr 开始时间 */
    'asr_start_time'
    : number;
    /** asr 结束时间 */
    'asr_end_time'
    : number;
  }

  type flowLogPageFlowLogReq =  {
    /** 第几页，从1开始 */
    'page'
    : number;
    /** 每页多少条 */
    'size'
    : number;
    /** 设备标识 */
    'device_sn'
    : string;
    /** 开始时间戳 */
    'start_time'
    : number;
    /** 结束时间戳 */
    'end_time'
    : number;
  }

  type flowLogPageFlowLogResp =  {
    'code'
    : number;
    'msg'
    : string;
    /** 记录总数 */
    'total'
    : number;
    /** 数据列表 */
    'list'
    : flowLogFlowLog[];
  }

}
