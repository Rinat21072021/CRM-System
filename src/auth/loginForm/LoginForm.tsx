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
import googleIcon from '../../assets/authImg/google.png';
import logo from '../../assets/authImg/logo.png';
import style from './LoginForm.module.scss';

const { Text, Title } = Typography;

export const LoginForm = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
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
              <Input placeholder="mail@abc.com" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input type="password" placeholder="***********" />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="" color='#7F265B'>Forgot password</a>
              </Flex>
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Log in
              </Button>
            </Form.Item>
            Not Registered Yet? <a href="">Create an account</a>
          </Form>
        </Flex>
      </ConfigProvider>
    </div>
  );
};
