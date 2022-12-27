import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Nav() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <div className="navbar-brand">
            <img
              src="images/logo.png"
              alt="img cannot be displayed"
              className="logo"
            />
          </div>
          <div className="navbar-brand fw-bold fs-3">Ethan's Pokédex</div>
          <Button variant="secondary" onClick={handleShow}>
            About
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>About</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Welcome to my Pokédex! Here, you can see every Pokémon as well
                as its types and base stats (HP, attack, defense, etc.). At the
                bottom of the page, you can use the 'Previous' and 'Next'
                buttons or the dropdown menu to navigate the site. Hope you can
                use this to learn more about Pokémon!
              </p>
              <br></br>
              <p>
                NOTE: All Pokémon after #905 (starting with Deoxys Attack) are
                variant Pokémon, so they do not have descriptions and their
                index numbers are not official. All original Pokémon have
                descriptions and correct index numbers though!
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Understood!
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
