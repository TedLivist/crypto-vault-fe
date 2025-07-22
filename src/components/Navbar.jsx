import { NavLink } from "react-router-dom";
import '../styling/Navbar.css'

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      I am navbar
      <NavLink to="/" className="nav-link">Homepage</NavLink>
      <NavLink to="/transactions" className="nav-link">Transactions</NavLink>
    </div>
  );
}
 
export default Navbar;