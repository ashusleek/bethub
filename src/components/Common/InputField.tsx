import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { Form, InputGroup } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InputField: ForwardRefRenderFunction<any, any> = ({ name, type, label, defaultValue, error, icon, ...props }, ref) => {
  return (
    <Form.Group controlId={name}>
      {label && <Form.Label>{label}</Form.Label>}
      <InputGroup>
        {icon && (
          <InputGroup.Text>
            <FontAwesomeIcon icon={icon} />
          </InputGroup.Text>
        )}
        <Form.Control
          type={type ? type : 'text'}
          placeholder={label}
          ref={ref}
          defaultValue={defaultValue}
          name={name}
          isInvalid={!!error}
          {...props}
        />
      </InputGroup>
      {error && <Form.Control.Feedback type='invalid'>{error.message}</Form.Control.Feedback>}
    </Form.Group>
  );
};

export default forwardRef(InputField);
