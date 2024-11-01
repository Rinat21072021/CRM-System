import {
  Image,
  Button,
  Checkbox,
  Form,
  Input,
  Flex,
  Typography,
  ConfigProvider,
  Space,
} from 'antd';
import googleIcon from '../../../assets/authImg/google.png';
import logo from '../../../assets/authImg/logo.png';
import style from './LoginForm.module.scss';
import axios from 'axios';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthData } from '../../../type/type';

const { Text, Title } = Typography;
const baseURL = 'https://easydev.club/api/v1/auth/signin';
export const LoginForm = () => {
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  const handleSubmitAuthorization = async () => {
    try {
      const res = await axios.post<AuthData>(baseURL, {
        login: title,
        password: password,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.wrapper}>
      <ConfigProvider
        theme={{
          components: {
            Checkbox: { colorPrimary: '#7F265B' },
            Button: {
              colorPrimary: '#7F265B',
              algorithm: true, // Enable algorithm
            },
            Input: {
              colorPrimary: '#eb2f96',
              algorithm: true, // Enable algorithm
            },
          },
        }}
      >
        <Flex gap={36} vertical>
          <Image width={72} src={logo} />
          <Flex gap="middle" vertical justify="space-around">
            <Title style={{ margin: 0 }}>Login to your Account</Title>
            <Text type="secondary">
              See what is going on with your business
            </Text>
            <Button size={'large'} block={true}>
              <Image src={googleIcon} />
              <Text>Continue with Google</Text>
            </Button>
            <Text
              style={{ fontSize: '12px', textAlign: 'center' }}
              type="secondary"
            >
              ------------- or Sign in with Email -------------
            </Text>
          </Flex>
          <Form
            size="large"
            name="login"
            initialValues={{ remember: true }}
            style={{ maxWidth: 420 }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your Username!' },
              ]}
            >
              <Input
                placeholder="mail@abc.com"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input
                type="password"
                placeholder="***********"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="" color="#7F265B">
                  Forgot password
                </a>
              </Flex>
            </Form.Item>
            <Form.Item>
              <Button
                onClick={handleSubmitAuthorization}
                block
                type="primary"
                htmlType="submit"
              >
                Log in
              </Button>
            </Form.Item>
            Not Registered Yet?{' '}
            <NavLink
              to="/create"
              className={({ isActive, isPending }) =>
                isPending ? 'pending' : isActive ? 'active' : ''
              }
            >
              Create an account
            </NavLink>
          </Form>
        </Flex>
      </ConfigProvider>
    </div>
  );
};
