import React, { useState, useEffect } from 'react';
import { Jumbotron, Form, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import { editorModules, editorFormats } from '../settings';

const CreatePage = ({ match, history }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState({});

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const response = await fetch(`/api/category/${match.params.categoryId}`);
    setCategory(await response.json());
  };

  const save = async e => {
    e.preventDefault();
    const request = {
      title,
      content,
      category
    };
    const response = await fetch('/api/page', {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200) {
      history.push(`info/${title}`);
    }
  };

  return (
    <div style={{ margin: 20 }}>
      <h3>Nueva Pagina para la categoría {category.name}</h3>
      <Form onSubmit={save}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Titulo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Titulo"
            name="title"
            required
            onChange={({ target: { value } }) => setTitle(value)}
            autocomplete="off"
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
          Crear
        </Button>
      </Form>
      {content}
    </div>
  );
};

export default CreatePage;
