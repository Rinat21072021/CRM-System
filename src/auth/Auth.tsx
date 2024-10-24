import { Col, Row, Image } from 'antd';

import img from '../assets/authImg/illustration.png';

import { LoginForm } from './loginForm/LoginForm';

export const AuthPage = () => {
  return (
    <Row>
      <Col span={16}>
        <Image preview={false} width={1109} height={'100vh'} src={img} />
      </Col>
      <Col span={8}>
        <LoginForm />
      </Col>
    </Row>
  );
};
