import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Search from '../components/Search';
import Footer from '../components/Footer';

const PropertyType = () => {
  useEffect(() => {
    // Initialize any required scripts here
  }, []);

  return (
    <div className="container-xxl bg-white p-0">
      {/* Spinner can be a separate component */}
      <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>

      <Navbar />
      
      <Header 
        title="Property Type"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Pages', path: '#' },
          { label: 'Property Type', active: true }
        ]}
      />

      <Search />

      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: '600px'}}>
            <h1 className="mb-3">Property Types</h1>
            <p>Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
          </div>
          <div className="row g-4">
            {/* Property type cards */}
            {[
              { icon: 'icon-apartment.png', title: 'Apartment', count: '123 Properties' },
              { icon: 'icon-villa.png', title: 'Villa', count: '123 Properties' },
              // Add all other property types here
            ].map((property, index) => (
              <div key={index} className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay={`0.${index * 2 + 1}s`}>
                <Link to="#" className="cat-item d-block bg-light text-center rounded p-3">
                  <div className="rounded p-4">
                    <div className="icon mb-3">
                      <img className="img-fluid" src={`/img/${property.icon}`} alt="Icon" />
                    </div>
                    <h6>{property.title}</h6>
                    <span>{property.count}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up"></i>
      </a>
    </div>
  );
};

export default PropertyType;