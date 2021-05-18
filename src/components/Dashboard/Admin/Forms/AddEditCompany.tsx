import React, { useEffect } from 'react';
import { Form, Button, Modal, Row, Col } from '@themesberg/react-bootstrap';
import InputField from 'components/Common/InputField';
import { removeForm, useSharedForm } from 'utils/hooks/form';
import { yupResolver } from '@hookform/resolvers';
import { companySchema } from 'pages/Dashboard/validation';
import { FORMS } from 'config/enums';

const AddEditCompany = ({ addModel, hideModel, company, createCompanyAction, updateCompanyAction }) => {
  const mode = company ? 'Edit' : 'Add';
  const { register, errors, handleSubmit, setValues } = useSharedForm(FORMS.ADD_COMPANY, {
    mode: 'all',
    resolver: yupResolver(companySchema)
  });

  useEffect(() => {
    if (company) {
      setValues(company);
    }
  }, [company, setValues]);

  const onSubmit = data => {
    mode === 'Add' ? createCompanyAction(data) : updateCompanyAction({ ...company, ...data });
  };

  const handleClose = () => {
    hideModel();
  };

  useEffect(() => {
    return () => removeForm(FORMS.ADD_COMPANY);
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <Modal as={Modal.Dialog} centered show={addModel} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className='h6'>{mode} Company</Modal.Title>
          <Button variant='close' aria-label='Close' onClick={handleClose} />
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Row>
              <Col md={6} className='mb-3'>
                <InputField label='Name' name='name' error={errors.name} ref={register()} />
              </Col>
              <Col md={6} className='mb-3'>
                <InputField label='Investment' type='number' name='investment' error={errors.investment} ref={register()} />
              </Col>
              <Col md={6} className='mb-3'>
                <InputField label='Company ID' type='number' name='companyId' error={errors.companyId} ref={register()} />
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

export default AddEditCompany;
