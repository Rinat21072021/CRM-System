import React from 'react';
import { Button,  Flex, Form, Input, message, Select } from 'antd';
import { useRegistrationMutation } from '../../api/authApi';
import style from './CreateAccauntForm.module.scss';

const { Option } = Select;

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

export const CreateAccauntForm: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [registration] = useRegistrationMutation();

  const successMessage = (text: string) => {
    messageApi.open({
      type: 'success',
      content: text,
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
  };

  const errorMessage = (text: string) => {
    messageApi.open({
      type: 'error',
      content: text,
    });
  };

  const handleSubmit = async (values: any) => {
    await registration(values);
  };
  const onFinish = async (values: any) => {
    try {
      handleSubmit({ 
        email: values.email,
        login: values.nickname,
        password: values.confirm,
        phoneNumber: values.phone,
        username: values.nickname,});
        
      successMessage('Регистрация прошла успешно.');
    } catch (error) {
      console.log(error);
      errorMessage('Что-то пошло не так');
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="+7">+7</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className={style.wrapper}>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        {contextHolder}
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'Введен неверный адрес электронной почты!',
            },
            {
              required: true,
              message: 'Пожалуйста, введите свой адрес электронной почты!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите свой пароль!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Пожалуйста, подтвердите свой пароль!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="Nickname"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите свой никнейм!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="phone" label="Phone Number" rules={[{ message: 'Please input your phone number!' }]}>
          <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Flex style={{ justifyContent: 'space-around' }}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            <Button type="primary" href="login">
              Come back
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
};
