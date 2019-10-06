import React, { useEffect, useState, Fragment } from 'react';
import { Jumbotron, Button, Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import { editorModules, editorFormats } from '../settings';

const SingleSectionPage = ({ match }) => {
  const [pageInformation, setPageInformation] = useState({
    title: '',
    content: ''
  });
  const [canEdit, setCanEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    loadPageInformation();
    isLoggedIn();
  }, [match, isEditing]);

  const loadPageInformation = async () => {
    debugger;
    const response = await fetch(`/api/page/${match.params.id}`);
    const json = await response.json();
    setTitle(json.title);
    setContent(json.content);
    setPageInformation(json);
  };

  const isLoggedIn = async () => {
    const response = await fetch('/api/user/checkToken');
    if (response.status === 200) {
      setCanEdit(true);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const saveEdit = async e => {
    e.preventDefault();
    const request = {
      _id: pageInformation._id,
      title,
      content
    };
    const response = await fetch('/api/page', {
      method: 'PUT',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200) {
      setIsEditing(false);
    }
  };

  return (
    <Jumbotron>
      {isEditing ? (
        <Form onSubmit={saveEdit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Titulo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Titulo"
              name="title"
              required
              onChange={({ target: { value } }) => setTitle(value)}
              autocomplete="off"
              value={title}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Contenido</Form.Label>
            <ReactQuill
              theme="snow"
              value={content}
              modules={editorModules}
              formats={editorFormats}
              onChange={value => setContent(value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Form>
      ) : (
        <div>
          <h1>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {pageInformation.title}
              {canEdit && !isEditing && (
                <Button variant="info" onClick={handleEditClick}>
                  Editar
                </Button>
              )}
            </div>
          </h1>
          <div>{require('html-react-parser')(pageInformation.content)}</div>
        </div>
      )}
    </Jumbotron>
  );
};

export default SingleSectionPage;
