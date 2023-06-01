import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, message, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';

import { useMobx } from '@/stores';

import { SignUrlServiceNlp } from '@/services/speech/SignUrlService';

import styles from './index.module.less';

// 聊天数据格式
type ChatData = {
  id: number;
  content: string;
  user: 'me' | 'robot';
}[];

// 聊天数据
const chatData: ChatData = [];

// web socket 对象
let ws: WebSocket;

const SandBox: React.FC = () => {
  // 获取状态管理
  const appData = useMobx('appInfo');
  // 获取 id
  const { id } = useParams();
  // 聊天数据
  const [data, setData] = useState(chatData);
  // 输入的内容
  const [content, setContent] = useState<string>('');
  // 聊天框的 ref
  const chatBoxMain = useRef<HTMLDivElement>(null);
  // 定时器
  let timer: NodeJS.Timer;

  // 把聊天窗口拉到最底
  const chatBoxMainBottom = () => {
    if (chatBoxMain.current)
      if (chatBoxMain.current.scrollHeight > chatBoxMain.current.clientHeight) {
        //设置滚动条到最底部
        chatBoxMain.current.scrollTop = chatBoxMain.current.scrollHeight;
      }
  };

  // 连接WebSocket
  const connectWS = (url: string) => {
    // 实例化 WebSocket 对象
    ws = new WebSocket(url);

    // 建立 web socket 连接成功触发事件
    ws.onopen = (e: any) => {
      // 5秒一次，心跳协议
      timer = setInterval(() => {
        ws.send(JSON.stringify({ command: 'heartBeat' }));
      }, 5000);

      console.log('已连接...', e);
    };

    // 接收服务端数据时触发事件
    ws.onmessage = function (e) {
      // 返回的数据
      const data = JSON.parse(e.data);
      console.log('数据已接收...', data);

      if (data.event === 'nlpResult') {
        // 接收服务器返回的语句
        setData((oldData) => [
          ...oldData,
          {
            id: oldData.length + 1,
            content: data.content.ttsText,
            user: 'robot',
          },
        ]);
      }
    };

    // 断开 web socket 连接成功触发事件
    ws.onclose = function (e) {
      console.log('连接已关闭...', e);
    };
  };

  useEffect(() => {
    // 聊天窗口保持在最底部
    chatBoxMainBottom();
  }, [data]);

  useEffect(() => {
    // 新建 web socket
    if (id && appData.appInfo?.appid) {
      SignUrlServiceNlp({
        app_id: appData.appInfo.appid,
        env: 'main_box',
      }).then((val) => {
        // 连接 web socket
        connectWS(val.sign_url);
      });
    }

    return () => {
      // 清除定时器
      clearInterval(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appData.appInfo?.appid, id]);

  // 输入框改变
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // 发送
  const send = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.keyCode == 13) {
      event.preventDefault();
    }

    // 判断是否为空或只有空格和回车
    if (content.trim().length === 0) {
      message.warning('输入框不能为空');
      return;
    }

    // 设置聊天数据
    setData((oldData) => [
      ...oldData,
      {
        id: oldData.length + 1,
        content: content,
        user: 'me',
      },
    ]);

    // 清空输入框
    setContent('');

    // 使用 send() 方法发送数据
    ws.send(JSON.stringify({ command: 'nlp', asrText: content }));
  };

  // 清空对话
  const clear = () => {
    setData([]);
  };

  return (
    <div className={styles.box}>
      <div className={styles.chatBox}>
        {/* 聊天窗口 */}
        <div className={styles.chatBoxMain} ref={chatBoxMain}>
          {data.map((item) => {
            if (item.user === 'me') {
              return (
                // 我发的信息
                <div
                  className={styles.chatRight}
                  key={item.id}
                >
                  <div
                    className={styles.chatMainRight}
                  >
                    <div className={styles.triangle_two}></div>
                    {item.content}
                  </div>
                  <Avatar className={styles.avatar} icon={<UserOutlined />} size="large" />
                </div>
              );
            } else {
              return (
                // 对方发的信息
                <div className={styles.chat} key={item.id}>
                  <Avatar className={styles.avatar} icon={<UserOutlined />} />
                  <span className={styles.chatMain}>
                    <div className={styles.triangle}></div>
                    {item.content}
                  </span>
                </div>
              );
            }
          })}
        </div>

        <Tooltip title="清空对话">
          <Button
            className={styles.clearIcon}
            type="primary"
            shape="circle"
            icon={<DeleteOutlined />}
            size="large"
            onClick={clear}
          />
        </Tooltip>

        {/* 输入窗口 */}
        <Input.TextArea
          className={styles.textArea}
          value={content}
          placeholder="请输入您要测试的语料，例如“今天天气怎么样”"
          onChange={onChange}
          onPressEnter={send}
        ></Input.TextArea>
      </div>
    </div>
  );
};

export default observer(SandBox);
