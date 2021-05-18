import React, { FC, useEffect } from 'react';
import { Form, Button, Modal, Row, Col } from '@themesberg/react-bootstrap';
import InputField from 'components/Common/InputField';
import { useSharedForm, removeForm } from 'utils/hooks/form';
import { yupResolver } from '@hookform/resolvers';
import { userSchema } from 'pages/Dashboard/validation';
import { FORMS } from 'config/enums';

interface IAddEditUserProps {
  addModel: boolean;
  hideModel: () => void;
  user: any;
  mode: string;
  createUserAction: (user) => void;
  updateUserAction: (user) => void;
}
const AddEditUser: FC<IAddEditUserProps> = ({ addModel, hideModel, user, mode, createUserAction, updateUserAction }) => {
  const { register, errors, handleSubmit, setValues } = useSharedForm(FORMS.ADD_USER, {
    mode: 'all',
    resolver: yupResolver(userSchema)
  });

  useEffect(() => {
    if (user && mode === 'Edit') {
      setValues(user);
    }
  }, [user, setValues, mode]);

  const onSubmit = data => {
    if (mode === 'Add') createUserAction(data);
    else updateUserAction({ ...user, ...data });
  };

  useEffect(() => {
    return () => removeForm(FORMS.ADD_USER);
    // eslint-disable-next-line
  }, []);

  const handleClose = () => {
    hideModel();
  };

  return (
    <React.Fragment>
      <Modal as={Modal.Dialog} centered show={addModel} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className='h6'>{mode} Profile</Modal.Title>
          <Button variant='close' aria-label='Close' onClick={handleClose} />
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Row>
              <Col md={12} className='mb-3'>
                <InputField autoFocus label='First Name' name='firstName' error={errors.firstName} ref={register()} />
              </Col>
              <Col md={12} className='mb-3'>
                <InputField label='Last Name' name='lastName' error={errors.lastName} ref={register()} />
              </Col>
              <Col md={12} className='mb-3'>
                <InputField label='Email' name='email' error={errors.email} ref={register()} />
              </Col>
              <Col md={12} className='mb-3'>
                <InputField label='Password' name='password' type='password' error={errors.password} ref={register()} />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' variant='secondary'>
              Save
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

export default AddEditUser;
