import React, { FC, useEffect, useState } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Form, Button, Modal, Row, Col } from '@themesberg/react-bootstrap';
import InputField from 'components/Common/InputField';
import { useSharedForm, removeForm } from 'utils/hooks/form';
import { yupResolver } from '@hookform/resolvers';
import { newsSchema } from 'pages/Dashboard/validation';
import { FORMS } from 'config/enums';
import { News } from 'config/interfaces';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface IAddEditNewsProps {
  addModel: boolean;
  hideModel: () => void;
  news: any;
  createNewsAction: (news: News) => void;
  updateNewsAction: (news: News) => void;
}
const AddEditNews: FC<IAddEditNewsProps> = ({ addModel, hideModel, news, createNewsAction, updateNewsAction }) => {
  const mode = news ? 'Edit' : 'Add';
  const { register, errors, handleSubmit, setValues } = useSharedForm(FORMS.ADD_NEWS, {
    mode: 'all',
    resolver: yupResolver(newsSchema)
  });

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (news) {
      setValues(news);
      const blocksFromHtml = htmlToDraft(news.description);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [news, setValues]);

  const onSubmit = data => {
    data.description = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    mode === 'Add' ? createNewsAction(data) : updateNewsAction({ ...news, ...data });
  };

  useEffect(() => {
    return () => removeForm(FORMS.ADD_NEWS);
    // eslint-disable-next-line
  }, []);

  const handleClose = () => {
    hideModel();
  };

  return (
    <React.Fragment>
      <Modal as={Modal.Dialog} centered show={addModel} size='xl' onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className='h6'>{mode} News</Modal.Title>
          <Button variant='close' aria-label='Close' onClick={handleClose} />
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Row>
              <Col md={12} className='mb-3'>
                <InputField autoFocus label='Title' name='title' error={errors.title} ref={register()} />
              </Col>
              <Col md={12} className='mb-3'>
                <Editor
                  editorState={editorState}
                  wrapperClassName='demo-wrapper'
                  editorClassName='demo-editor'
                  onEditorStateChange={setEditorState}
                />
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

export default AddEditNews;
