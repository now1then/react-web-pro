/* eslint-disable import/extensions */
import React, { useContext, useEffect, useState, createRef } from 'react';
import { Form, Input, Modal, Icon, Spin, message } from 'antd';
import { observer } from 'mobx-react';
import CodeMirror from 'react-codemirror';
import Store from './store';
import { groovyTemp } from '@/utils/constant';

import 'codemirror/mode/groovy/groovy';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/selection/active-line';
// import 'codemirror/addon/display/fullscreen';
// import 'codemirror/addon/display/fullscreen.css';

import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';

import 'codemirror/addon/edit/matchbrackets';

const options = {
  lineNumbers: true, // 显示行
  mode: 'groovy', // 语法
  theme: 'material', // 主题风格
  readOnly: false, // 是否只可读
  extraKeys: { Ctrl: 'autocomplete' },
  foldGutter: true, // 代码折叠
  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'], // 代码折叠
  matchBrackets: true, // 自动匹配括号
  styleActiveLine: true, // 当前行高亮
  // hintOptions: { completeSingle: true },
};

const myModal = props => {
  const {
    form: { getFieldDecorator },
  } = props;
  const codeRef = createRef();

  const pageStore = useContext(Store);
  const { modalData } = pageStore;
  const [code, setCode] = useState(modalData.content || groovyTemp);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    setCode(modalData.content || groovyTemp);
  }, [modalData]);

  // CodeMirror value={code}无效。 暂使用 ref setValue更新
  useEffect(() => {
    if (codeRef.current) {
      const mirror = codeRef.current.getCodeMirror();
      mirror.setValue(code);
    }
  }, [code]);

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const groovyCode = codeRef.current && codeRef.current.getCodeMirror().getValue();
        if (!groovyCode) {
          message.error('请输入groovy脚本!');
          return;
        }
        if (pageStore.modalType === 'edit') {
          pageStore.modEdit({ no: values.no, name: values.name, content: groovyCode });
        }
        if (pageStore.modalType === 'new') {
          pageStore.addEdit({ no: values.no, name: values.name, content: groovyCode });
        }
      }
    });
  };

  const onCodeChange = () => {
    // console.log(code, codeRef);
    // setCode(code);
    // const mirror = codeRef.current.getCodeMirror();
    // mirror.setValue(code);
  };

  return (
    <Modal
      className={
        fullscreen ? 'code-mirror-modal code-mirror-modal-fullScreen' : 'code-mirror-modal'
      }
      title={pageStore.ModalTitle}
      destroyOnClose
      width={700}
      visible={pageStore.newModalVisible}
      onOk={handleSubmit}
      okText="保存"
      okButtonProps={{ loading: pageStore.newLoading, disabled: pageStore.modalType === 'show' }}
      onCancel={() => pageStore.setData({ newModalVisible: false })}
    >
      <Spin spinning={pageStore.loading}>
        <Form layout="inline" className="form-area">
          <Form.Item label="脚本名称">
            {getFieldDecorator('name', {
              initialValue: modalData.name,
              rules: [{ required: true, whitespace: true, message: '请输入脚本名称' }],
            })(
              <Input
                placeholder="请输入脚本名称"
                maxLength={64}
                disabled={pageStore.modalType !== 'new'}
              />,
            )}
          </Form.Item>
          <Form.Item label="脚本标识">
            {getFieldDecorator('no', {
              initialValue: modalData.no,
              rules: [
                { required: true, whitespace: true, message: '请输入脚本标识' },
                { pattern: /^[A-Za-z0-9_]+$/, message: '请输入字母、数字、下划线组合' },
              ],
            })(
              <Input
                placeholder="请输入脚本标识"
                maxLength={64}
                disabled={pageStore.modalType !== 'new'}
              />,
            )}
          </Form.Item>
        </Form>
        {fullscreen ? (
          <Icon
            type="fullscreen-exit"
            className="full-screen-exit-icon"
            onClick={() => setFullscreen(false)}
          />
        ) : (
          <Icon
            type="fullscreen"
            className="full-screen-icon"
            onClick={() => setFullscreen(true)}
          />
        )}

        <CodeMirror
          ref={codeRef}
          defaultValue={code}
          value={code}
          options={Object.assign(options, { readOnly: pageStore.modalType === 'show' })}
          onChange={onCodeChange}
        />
      </Spin>
    </Modal>
  );
};

export default Form.create()(observer(myModal));
