import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers';
import { loginSchema } from 'pages/Auth/validation';
import { useSharedForm, removeForm } from 'utils/hooks/form';
import { faEnvelope, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, Container, Image } from '@themesberg/react-bootstrap';
import { FORMS } from 'config/enums';
import InputField from 'components/Common/InputField';

const Auth = ({ loginAction }) => {
  const { register, errors, handleSubmit } = useSharedForm(FORMS.LOGIN, {
    mode: 'all',
    resolver: yupResolver(loginSchema)
  });

  // Handler
  const onSubmit = data => {
    loginAction(data.email, data.password);
  };

  useEffect(() => {
    return () => removeForm(FORMS.LOGIN);
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      <section className='d-flex align-items-center my-5 mt-lg-6 mb-lg-5'>
        <Container>
          <p className='text-center'></p>
          <Row className='justify-content-center form-bg-image'>
            <Col xs={12} className='d-flex align-items-center justify-content-center'>
              <div className='bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500'>
                <div className='text-center text-md-center mb-4 mt-md-0'>
                  <Image src='' className='navbar-brand-light' style={{ maxWidth: '40%' }} />
                  <h3 className='mb-0'>Login To Bet-Hub Dashboard</h3>
                </div>
                <Form onSubmit={handleSubmit(onSubmit)} className='mt-4 h-350' style={{ height: '350px' }}>
                  <Row>
                    <Col md={12} className='mb-3'>
                      <InputField
                        autoFocus
                        label='Your Email'
                        placeholder='example@company.com'
                        name='email'
                        icon={faEnvelope}
                        error={errors.email}
                        ref={register()}
                      />
                    </Col>
                    <Col md={12} className='mb-3'>
                      <InputField
                        label='Your Password'
                        name='password'
                        type='password'
                        icon={faUnlockAlt}
                        error={errors.password}
                        ref={register()}
                      />
                    </Col>
                  </Row>
                  <Button variant='primary' type='submit' className='w-100'>
                    Sign in
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Auth;
