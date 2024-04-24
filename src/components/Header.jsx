import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

function Header() {
  const [navbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar
      className={`bg-body-tertiary ${
        navbarVisible ? "navbar-show" : "navbar-hide"
      }`}
      sticky="top"
    >
      <Container>
        <Navbar.Brand href="/">
          <LinkContainer to="/">
            <h1 className="text-success">Filmlar</h1>
          </LinkContainer>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
