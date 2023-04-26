import React, { useState} from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


let App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const productsArr = [
    {
      title: 'Colors',
      price: 100,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
      quantity: 1,
    },
    {
      title: 'Black and white Colors',
      price: 50,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
      quantity: 2,
     },
    {
      title: 'Yellow and Black Colors',
      price: 70,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
      quantity: 3,
    },
    {
      title: 'Blue Color',
      price: 100,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
      quantity: 4,
    }
  ];

  const addToCart = (product) => {
    const updatedCartItems = [...cartItems];
    const existingCartItemIndex = updatedCartItems.findIndex((item) => item.title === product.title);

    if (existingCartItemIndex >= 0) {
      const existingCartItem = updatedCartItems[existingCartItemIndex];
      const updatedCartItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1
      };
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
    } else {
      updatedCartItems.push({ ...product, quantity: 1 });
    }

    setCartItems(updatedCartItems);
  };

  const removeFromCart = (product) => {
    const updatedCartItems = [...cartItems];
    const existingCartItemIndex = updatedCartItems.findIndex((item) => item.title === product.title);

    if (existingCartItemIndex >= 0) {
      const existingCartItem = updatedCartItems[existingCartItemIndex];

      if (existingCartItem.quantity === 1) {
        updatedCartItems.splice(existingCartItemIndex, 1);
      } else {
        const updatedCartItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity - 1
        };
        updatedCartItems[existingCartItemIndex] = updatedCartItem;
      }

      setCartItems(updatedCartItems);
    }
  };

  const cartTotal = cartItems.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
  }, 0);

  return (
    <>
      <Navbar bg="dark" expand="lg" variant='dark'>
        <Container>
          <Navbar.Brand href="#home"><h1>Generics Store</h1></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">About</Nav.Link>
              <Nav.Link onClick={() => setShowCart(true)}>Cart ({cartItems.length})</Nav.Link>

              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Filter</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Car-Color
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Home-Color</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Holi-Color
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
    <div className='products'>
      {productsArr.map((product, index) => {
        return (
          <div className='product' key={index}>
            <img src={product.imageUrl} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <Button onClick={() => addToCart(product)}>Add to Cart</Button>
          </div>
        )
      })}
    </div>
  </Container>

<Modal show={showCart} onHide={() => setShowCart(false)}>
<Modal.Header closeButton>
  <Modal.Title>Shopping Cart</Modal.Title>
</Modal.Header>
<Modal.Body>
  <div className='cart-items'>
    {cartItems.length === 0 ? <p>Your cart is empty</p> : null}
    {cartItems.map((item, index) => {
      return (
        <div className='cart-item' key={index}>
          <div className='item-details'>
            <img src={item.imageUrl} alt={item.title} />
            <h4>{item.title}</h4>
          </div>
          <div className='item-quantity'>
            <button onClick={() => removeFromCart(item)}>-</button>
            <p>{item.quantity}</p>
            <button onClick={() => addToCart(item)}>+</button>
          </div>
          <div className='item-price'>
            <p>${item.price * item.quantity}</p>
          </div>
        </div>
      )
    })}
  </div>
</Modal.Body>
<Modal.Footer>
  <p>Total: ${cartTotal}</p>
  <Button variant='secondary' onClick={() => setShowCart(false)}>
    Close
  </Button>
  <Button variant='primary'>Checkout</Button>
</Modal.Footer>
</Modal>
</>
  );
}

export default App;