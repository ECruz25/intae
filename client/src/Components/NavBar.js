import React, { useEffect, useState } from 'react';
import {
  Nav,
  NavDropdown,
  Navbar,
  InputGroup,
  FormControl,
  Button,
  Form,
  Modal
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = ({ setPage, history, page }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categories, setCategories] = useState();

  useEffect(() => {
    checkIfIsLoggedIn();
    loadCategories();
  }, [setIsCreatingCategory, page]);

  useEffect(() => {
    loadCategories();
  });

  const loadCategories = async () => {
    const categoriesResponse = await fetch('/api/category');
    const categoriesJson = await categoriesResponse.json();
    const response = await fetch('/api/page');
    const json = await response.json();
    const categoriesToAdd = categoriesJson.map(category => ({
      ...category,
      pages: json.filter(
        page => page.category && page.category._id === category._id
      )
    }));
    const newCategories = json
      .map(page => ({
        ...page.category,
        pages: json.filter(t => t._id === page._id)
      }))
      .reduce((acc, current) => {
        const x = acc.find(item => item._id === current._id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

    setCategories(categoriesToAdd);
  };

  const checkIfIsLoggedIn = async () => {
    const response = await fetch('/api/user/checkToken');
    if (response.status === 200) {
      setIsLogged(true);
    }
  };

  const handleSelect = key => {
    setPage(key);
  };

  const onSelectAddCategory = () => {
    setIsCreatingCategory(true);
  };

  const submitCategory = async () => {
    const response = await fetch('/api/category', {
      method: 'POST',
      body: JSON.stringify({ name: newCategoryName }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200) {
      setNewCategoryName('');
      setIsCreatingCategory(false);
      loadCategories();
    }
  };

  const handleDeleteCategory = async category => {
    const response = await fetch('/api/category', {
      method: 'DELETE',
      body: JSON.stringify(category),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200 && history) {
      history.push(`/`);
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Nav onSelect={handleSelect} variant="tabs">
        <Nav.Item>
          <Link to="/">
            <img src="/logo.jpg" alt="logo" style={{ width: 32, height: 32 }} />
          </Link>
        </Nav.Item>
        {categories &&
          categories.map(category => {
            if (
              (category && category.pages && category.pages.length > 0) ||
              isLogged
            ) {
              return (
                <Nav.Item>
                  <NavDropdown title={category && category.name}>
                    {category.pages &&
                      category.pages.map(page => (
                        <NavDropdown.Item eventKey={page._id}>
                          <Link
                            to={`/${page.title}/${page._id}`}
                            style={{ textDecoration: 'none' }}
                          >
                            {page.title}
                          </Link>
                        </NavDropdown.Item>
                      ))}
                    {isLogged && <NavDropdown.Divider />}
                    {isLogged && (
                      <NavDropdown.Item eventKey="4.4">
                        <Link
                          to={`/createPage/${category._id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          Crear nueva pagina
                        </Link>
                      </NavDropdown.Item>
                    )}
                    {isLogged && category.pages.length === 0 && (
                      <NavDropdown.Item
                        eventKey="4.4"
                        style={{ color: 'red' }}
                        onClick={() => handleDeleteCategory(category)}
                      >
                        Eliminar categoría
                      </NavDropdown.Item>
                    )}
                  </NavDropdown>
                </Nav.Item>
              );
            } else if (!isLogged) {
              return (
                <Nav.Item>
                  <Nav.Link>
                    <Link
                      to={`/${category._id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      {category.name}
                    </Link>
                  </Nav.Link>
                </Nav.Item>
              );
            }
          })}
        {isLogged && (
          <Nav.Item>
            <Nav.Link eventKey="addCategory" onSelect={onSelectAddCategory}>
              +
            </Nav.Link>
          </Nav.Item>
        )}
      </Nav>
      {isCreatingCategory && (
        <Modal
          show={isCreatingCategory}
          onHide={() => setIsCreatingCategory(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Crear Categoria</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Vida estudiantil"
                onChange={({ target: { value } }) => setNewCategoryName(value)}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setIsCreatingCategory(false)}
            >
              Cancelar
            </Button>
            <Button variant="primary" onClick={submitCategory}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Navbar>
  );
};

export default NavBar;
