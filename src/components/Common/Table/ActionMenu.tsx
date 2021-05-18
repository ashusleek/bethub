import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';

export enum ACTIONS {
  EDIT = 'edit',
  DOWNLOAD = 'download',
  REMOVE = 'remove'
}

interface IActionMenuProps {
  handleEdit?: (row) => void;
  handleDownload?: (row) => void;
  handleDelete?: (row) => void;
  disabledActions?: string[];
  row?: any;
}

const ActionMenu: FC<IActionMenuProps> = ({ handleEdit, handleDownload, handleDelete, row, disabledActions }) => {
  return (
    <Dropdown as={ButtonGroup}>
      <Dropdown.Toggle as={Button} split variant='link' className='text-dark m-0 p-0'>
        <span className='icon icon-sm'>
          <FontAwesomeIcon icon={faEllipsisH} className='icon-dark' />
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {handleEdit && !disabledActions?.includes(ACTIONS.EDIT) && (
          <Dropdown.Item onClick={() => handleEdit(row)}>
            <FontAwesomeIcon icon={faEdit} className='me-2' /> Edit
          </Dropdown.Item>
        )}

        {handleDownload && !disabledActions?.includes(ACTIONS.DOWNLOAD) && (
          <Dropdown.Item onClick={() => handleDownload(row)}>
            <FontAwesomeIcon icon={faEdit} className='me-2' /> Download
          </Dropdown.Item>
        )}

        {handleDelete && !disabledActions?.includes(ACTIONS.REMOVE) && (
          <Dropdown.Item className='text-danger' onClick={() => handleDelete(row)}>
            <FontAwesomeIcon icon={faTrashAlt} className='me-2' /> Remove
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ActionMenu;
