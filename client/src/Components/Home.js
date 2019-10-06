import React, { useEffect, useState } from 'react';
import { Button, Form, Jumbotron } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import { editorModules, editorFormats } from '../settings';

const Home = () => {
  const [pageInformation, setPageInformation] = useState({
    content: ''
  });
  const [canEdit, setCanEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/api/page/main')
      .then(res => res.json())
      .then(res => {
        debugger;
        setPageInformation(res[0]);
        setContent(res[0].content);
      });
    isLoggedIn();
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const isLoggedIn = async () => {
    const response = await fetch('/api/user/checkToken');
    if (response.status === 200) {
      setCanEdit(true);
    }
  };

  const saveEdit = async e => {
    e.preventDefault();
    const request = {
      _id: pageInformation._id,
      title,
      content
    };
    const response = await fetch('/api/page/main', {
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
    <div style={{ margin: 20 }}>
      {isEditing ? (
        <Form onSubmit={saveEdit}>
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
    </div>
  );
};

export default Home;
