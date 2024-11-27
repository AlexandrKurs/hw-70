import {NavLink} from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <nav className="w-50 bg-dark mx-auto px-4">
        <div className="container navbar navbar-expand-xl">
          <div>
            <NavLink to="/"><span className="navbar-brand mb-0 text-white fs-2 text-uppercase text-decoration-none">Contacts</span></NavLink>
          </div>

          <div className="ms-auto">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link fw-bold bg-white rounded text-dark" to="/new-contact">Add contact</NavLink>
              </li>
            </ul>
          </div>
        </div>

      </nav>
    </>
  )
    ;
};

export default NavBar;