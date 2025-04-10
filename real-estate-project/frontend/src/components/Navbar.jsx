import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="container-fluid nav-bar bg-transparent">
      <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4">
        <Link to="/" className="navbar-brand d-flex align-items-center text-center">
          <div className="icon p-2 me-2">
            <img className="img-fluid" src="/img/icon-deal.png" alt="Icon" style={{width: '30px', height: '30px'}} />
          </div>
          <h1 className="m-0 text-primary">HomeHive</h1>
        </Link>
        <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto">
            <Link to="/" className="nav-item nav-link">Home</Link>
            <Link to="/about" className="nav-item nav-link">About</Link>
            <div className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle active" data-bs-toggle="dropdown">Property</a>
              <div className="dropdown-menu rounded-0 m-0">
                <Link to="/property-list" className="dropdown-item">Property List</Link>
                <Link to="/property-type" className="dropdown-item active">Property Type</Link>
                <Link to="/property-agent" className="dropdown-item">Property Agent</Link>
                <Link to="/property-management" className="dropdown-item">Property Management</Link>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
              <div className="dropdown-menu rounded-0 m-0">
                <Link to="/testimonial" className="dropdown-item">Testimonial</Link>
                <Link to="/404" className="dropdown-item">404 Error</Link>
              </div>
            </div>
            <Link to="/contact" className="nav-item nav-link">Contact</Link>
          </div>
          <Link to="/property-management" className="btn btn-primary px-3 d-none d-lg-flex">Manage Property</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;