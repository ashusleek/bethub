import React, { useEffect } from 'react';
import { Form, Button, Modal, Row, Col } from '@themesberg/react-bootstrap';
import InputField from 'components/Common/InputField';
import { removeForm, useSharedForm } from 'utils/hooks/form';
import { yupResolver } from '@hookform/resolvers';
import { suggestionSchema } from 'pages/Dashboard/validation';
import { FORMS } from 'config/enums';

const AddEditSuggestion = ({ addModel, hideModel, suggestion, company, createCompanySuggestionAction, updateCompanySuggestionAction }) => {
  const mode = suggestion ? 'Edit' : 'Add';
  const { register, errors, handleSubmit, setValues } = useSharedForm(FORMS.ADD_SUGGESION, {
    mode: 'all',
    resolver: yupResolver(suggestionSchema)
  });

  useEffect(() => {
    if (suggestion) {
      setValues(suggestion);
    }
  }, [suggestion, setValues]);

  const onSubmit = data => {
    mode === 'Add' ? createCompanySuggestionAction(company, data) : updateCompanySuggestionAction(company, { ...suggestion, ...data });
  };

  const handleClose = () => {
    hideModel();
  };

  useEffect(() => {
    return () => removeForm(FORMS.ADD_SUGGESION);
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <Modal as={Modal.Dialog} centered show={addModel} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className='h6'>{mode} Suggestion</Modal.Title>
          <Button variant='close' aria-label='Close' onClick={handleClose} />
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Row>
              <Col md={12} className='mb-3'>
                <InputField label='Title' name='title' error={errors.title} ref={register()} />
              </Col>
              <Col md={12} className='mb-3'>
                <InputField label='Description' name='description' error={errors.description} ref={register()} />
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

export default AddEditSuggestion;
