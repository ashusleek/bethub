import React, { FC, useEffect } from 'react';
import { Form, Button, Modal, Row, Col } from '@themesberg/react-bootstrap';
import InputField from 'components/Common/InputField';
import { useSharedForm, removeForm } from 'utils/hooks/form';
import { yupResolver } from '@hookform/resolvers';
import { changePasswordSchema } from 'pages/Dashboard/validation';
import { FORMS } from 'config/enums';

interface IChangePasswordProps {
  addModel: boolean;
  hideModel: () => void;
  user: any;
  changePasswordAction: (userInfo) => void;
}
const ChangePassword: FC<IChangePasswordProps> = ({ addModel, hideModel, user, changePasswordAction }) => {
  const { register, errors, handleSubmit, setValues } = useSharedForm(FORMS.CHANGE_PASSWORD, {
    mode: 'all',
    resolver: yupResolver(changePasswordSchema),
    default: { email: user.email }
  });

  useEffect(() => {
    if (user) {
      setValues(user);
    }
  }, [user, setValues]);

  useEffect(() => {
    return () => removeForm(FORMS.CHANGE_PASSWORD);
    // eslint-disable-next-line
  }, []);

  const onSubmit = data => {
    changePasswordAction(data);
  };

  const handleClose = () => {
    hideModel();
  };

  return (
    <React.Fragment>
      <Modal as={Modal.Dialog} centered show={addModel} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className='h6'>Change Password</Modal.Title>
          <Button variant='close' aria-label='Close' onClick={handleClose} />
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Row>
              <Col md={12} className='mb-3'>
                <InputField label='Email' name='email' error={errors.email} ref={register()} disabled />
              </Col>
              <Col md={12} className='mb-3'>
                <InputField
                  autoFocus
                  label='Current Password'
                  name='currentPassword'
                  type='password'
                  error={errors.firstName}
                  ref={register()}
                />
              </Col>
              <Col md={12} className='mb-3'>
                <InputField label='New Password' name='newPassword' type='password' error={errors.lastName} ref={register()} />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' variant='secondary'>
              Update
            </Button>
            <Button variant='link' className='text-gray ms-auto' onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default ChangePassword;
