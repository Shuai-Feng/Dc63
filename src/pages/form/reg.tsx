import * as React from 'react';
import { Card,Input,Form,Icon, Radio, Select, Switch, DatePicker,Checkbox, Upload,Button, message } from 'antd';
import { FormComponentProps,FormItemProps } from 'antd/es/form';
import moment from 'moment';


//https://3x.ant.design/components/upload-cn/#header
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

interface IRegPageProps extends FormComponentProps {

}

const RegPage: React.FunctionComponent<IRegPageProps> = (props) => {


    //上传图片之后的图片编码
    const [ imgSrc,setImg ] = React.useState<string>('');

    const { getFieldDecorator,getFieldsValue,validateFields }  = props.form;

    const formLayout:FormItemProps = {
        wrapperCol:{
            lg:12,
            sm:24
        },
        labelCol:{
            lg:6,
            sm:24
        }
    } 


    const getBase64 = (img:File,callback:Function)=>{
        const reader = new FileReader();
        reader.addEventListener('load',()=>{
            // 读取的返回结果
            callback(reader.result);
        })
        reader.readAsDataURL(img)
    }
    //图片上传调用的回调函数
    const handleChange = (info:any)=>{
        //file  表示当前上传的文件
        //filelist 表示当前上传的文件列表
      getBase64(info.file.originFileObj,(base64:any)=>{
        setImg(base64)
      })
    }
 
    // 设置表单提交的回调函数
    let handleSubmit = async ()=>{
        // resolve reject 
        try{    
            await validateFields();
            console.log({...getFieldsValue(),imgSrc})
            message.success('表单提交成功')
        }catch(e){
            message.info('表单有问题，请重试')
        }
    }
  return <div className="RegPage">
      <Card title={'注册表单'}>
        <Form>
            <FormItem {...formLayout}  label='用户名'>
                {
                    getFieldDecorator('userName',{
                        rules:[{
                            required:true
                        }]
                    })(<Input prefix={<Icon type='user' />} type='text' />)
                }
            </FormItem>
            <FormItem {...formLayout} label='密码'>
                {
                    getFieldDecorator('password',{
                        rules:[{
                            required:true
                        }]
                    })(<Input prefix={<Icon type='lock' />} type='password'/>)
                }
            </FormItem>
            <FormItem {...formLayout} label='性别'>
                {
                    getFieldDecorator('sex',{
                        rules:[{
                            required:true
                        }]
                    })(<Radio.Group>
                        <Radio value={1}>男</Radio>
                        <Radio value={2}>女</Radio>
                    </Radio.Group>)
                }
            </FormItem>
            <FormItem {...formLayout} label='年龄'>
                {
                    getFieldDecorator('age',{
                        rules:[{
                            required:true
                        }],
                        initialValue:18
                    })(<Input style={{width:200}} min={16} max={100} type='number'/>)
                }
            </FormItem>
            <FormItem {...formLayout} label={'等级'}>
                {
                    getFieldDecorator('auth_level',{
                        initialValue:'1'
                    })(
                        <Select>
                            <Option value={'1'} >LV1</Option>
                            <Option value={'2'} >LV2</Option>
                            <Option value={'3'} >LV3</Option>
                            <Option value={'4'} >LV4</Option>
                        </Select>
                    )
                }
            </FormItem>
            <FormItem {...formLayout}  label='爱好'>
                {
                    getFieldDecorator('hobby',{
                        initialValue:['1','2']
                        //多选select 初始值是一个数组
                    })(
                        <Select mode='multiple'>
                            <Option value={'1'} >打篮球</Option>
                            <Option value={'2'} >踢足球</Option>
                            <Option value={'3'} >卡拉OK</Option>
                            <Option value={'4'} >动感单车</Option>
                        </Select>
                    )
                }
            </FormItem>
            <FormItem {...formLayout} label='婚否'>
                {
                    getFieldDecorator('isMarry',{
                        valuePropName:'checked',
                        initialValue:false
                    })(
                        <Switch/>
                    )
                }
            </FormItem>
            <FormItem {...formLayout} label='生日' >
                {
                    getFieldDecorator('birthday',{
                        initialValue:moment(+ new Date())
                    })(
                        <DatePicker 
                            showTime={true}
                            format="YYYY-MM-DD"
                        />
                    )
                }
            </FormItem>
            <FormItem {...formLayout} label={'地址'}>
                {
                    getFieldDecorator('address',{
                        initialValue:'',
                        rules:[{
                            required:true,message:'地址不能为空'
                        }]
                    })(
                        <TextArea rows={3} />
                    )
                }
            </FormItem>
            <FormItem {...formLayout} label={' '} colon={false} >
                {
                    getFieldDecorator('agree',{
                        initialValue:true,
                        valuePropName:'checked'
                    })(
                        <Checkbox/> 
                    )
                }
                <span style={{marginLeft:10}}>我已阅读协议</span>
            </FormItem>
            <FormItem {...formLayout} colon={false} label={' '} > 
                <Upload
                    listType='picture-card'
                    showUploadList={false}
                    onChange={handleChange}
                >
                    {/* 如果图片上传成功 就显示图片 不然的话 就显示 icon */}
                    {
                        imgSrc?<img style={{width:'100%'}} src={imgSrc} alt='上传的图片'/>:<Icon type='plus' />
                    }
                </Upload>
            </FormItem>
            <FormItem {...formLayout}  label={' '} colon={false}>
                <Button onClick={()=>{handleSubmit()}}>登录 </Button>
            </FormItem>
        </Form>
      </Card>
  </div> ;
};

export default Form.create()(RegPage);
