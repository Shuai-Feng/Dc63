import * as React from 'react';
import { Card,Button, Modal } from 'antd';
//引入富文本的编辑器组件 和样式表
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


//引入操作 富文本组件的api
import { EditorState } from 'draft-js';

//引入富文本转换html的api
import draftjs from 'draftjs-to-html';



interface IRichPageProps {
}

const RichPage: React.FunctionComponent<IRichPageProps> = (props) => {

  const [visible,setVisibel] = React.useState<boolean>(false);

  const [editorState,setEditState] = React.useState(EditorState.createEmpty());
  const [contentState,setCotentState] = React.useState<any>('');
  //查看富文本内容信息
  const handleRichShow = ()=>{
    if(contentState) return;
    setVisibel(true)
  }

  //清空富文本文档内容信息
  const handleRichClear = ()=>{
     setEditState(EditorState.createEmpty())
     setCotentState('')
  }


  return <div className="RichPage">
    <Card title="富文本编辑器">
        <div className="card-content">
          <Button onClick={handleRichShow}>查看内容</Button>
          <Button onClick={handleRichClear}>清空内容</Button>
        </div>
    </Card>
    <Card style={{marginTop:10}}>
        <Editor
            editorState={editorState}

            onEditorStateChange={(editorState)=>{setEditState(editorState)}}
            onContentStateChange={(contentState:any)=>{setCotentState(contentState)}}
        />
    </Card>
    <Modal
      visible={visible}
      onCancel={()=>{
        setVisibel(false)
      }}
    >
      {
        draftjs(contentState)
      }
    </Modal>
  </div> ;
};

export default RichPage;
