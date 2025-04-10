import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyForm from '../components/propertyForm';
import ConfirmationModal from '../components/confirmationModal';
import { Modal, Button, Form, Table, Badge } from 'react-bootstrap';

const PropertyManagement = ({ userRole = 'admin' }) => {
  // State management
  const [properties, setProperties] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    category: '',
    status: '',
    minPrice: '',
    maxPrice: ''
  });
  const [loading, setLoading] = useState(true);

  // Sample data - replace with API calls in real implementation
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const sampleData = [
          {
            id: 1,
            name: "Luxury Villa",
            location: "Miami",
            price: 1250000,
            category: "Villa",
            status: "Available",
            images: ["/img/property-1.jpg"],
            transactionType: "sale",
            amenities: { size: "3500 sqft", beds: 4, baths: 3 }
          },
          {
            id: 2,
            name: "Downtown Apartment",
            location: "New York",
            price: 750000,
            category: "Apartment",
            status: "Available",
            images: ["/img/property-2.jpg"],
            transactionType: "sale",
            amenities: { size: "1200 sqft", beds: 2, baths: 2 }
          },
          {
            id: 3,
            name: "Beachfront Office",
            location: "Miami",
            price: 2000000,
            category: "Office",
            status: "Rented",
            images: ["/img/property-3.jpg"],
            transactionType: "rent",
            amenities: { size: "5000 sqft", beds: 0, baths: 4 }
          }
        ];
        
        setProperties(sampleData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // CRUD operations
  const handleCreate = (newProperty) => {
    const newId = properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1;
    setProperties([...properties, { ...newProperty, id: newId }]);
    setShowCreateModal(false);
  };

  const handleUpdate = (updatedProperty) => {
    setProperties(properties.map(p => 
      p.id === updatedProperty.id ? updatedProperty : p
    ));
    setShowEditModal(false);
  };

  const handleDelete = () => {
    setProperties(properties.filter(p => p.id !== currentProperty.id));
    setShowDeleteModal(false);
  };

  // Filter and search functionality
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilters = (
      (filters.location === '' || property.location === filters.location) &&
      (filters.category === '' || property.category === filters.category) &&
      (filters.status === '' || property.status === filters.status) &&
      (filters.minPrice === '' || property.price >= Number(filters.minPrice)) &&
      (filters.maxPrice === '' || property.price <= Number(filters.maxPrice))
    );

    return matchesSearch && matchesFilters;
  });

  // Get unique values for filters
  const locations = [...new Set(properties.map(p => p.location))];
  const categories = [...new Set(properties.map(p => p.category))];
  const statuses = ["Available", "Sold", "Rented"];

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-xxl bg-white p-0">
      <Navbar />
      
      {/* Header Section */}
      <div className="container-fluid header bg-white p-0">
        <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
          <div className="col-md-6 p-5 mt-lg-5">
            <h1 className="display-5 mb-4">Property Management</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb text-uppercase">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to="/property">Property</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Management</li>
              </ol>
            </nav>
          </div>
          <div className="col-md-6">
            <img className="img-fluid" src="/img/header.jpg" alt="Property Management" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '600px' }}>
            <h1 className="mb-3">Manage Your Properties</h1>
            <p>Efficiently manage all your real estate properties in one place.</p>
          </div>

          {/* Search and Action Bar */}
          <div className="row mb-4 g-3">
            <div className="col-md-8">
              <Form.Control
                type="search"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {userRole !== 'user' && (
              <div className="col-md-4 text-end">
                <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                  <i className="fas fa-plus me-2"></i>Add Property
                </Button>
              </div>
            )}
          </div>

          {/* Filter Controls */}
          <div className="row mb-4 g-3">
            <div className="col-md-3">
              <Form.Select
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </Form.Select>
            </div>
            
            <div className="col-md-2">
              <Form.Select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
              >
                <option value="">All Types</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Form.Select>
            </div>
            
            <div className="col-md-2">
              <Form.Select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </Form.Select>
            </div>
            
            <div className="col-md-2">
              <Form.Control
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
              />
            </div>
            
            <div className="col-md-2">
              <Form.Control
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
              />
            </div>
            
            <div className="col-md-1">
              <Button 
                variant="outline-secondary" 
                onClick={() => setFilters({
                  location: '',
                  category: '',
                  status: '',
                  minPrice: '',
                  maxPrice: ''
                })}
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Properties Table */}
          <div className="row">
            <div className="col-12">
              <div className="bg-light rounded p-4">
                {filteredProperties.length === 0 ? (
                  <div className="text-center py-5">
                    <h4>No properties found</h4>
                    <p>Try adjusting your search or filters</p>
                  </div>
                ) : (
                  <Table hover responsive>
                    <thead>
                      <tr>
                        <th>Property</th>
                        <th>Location</th>
                        <th>Price</th>
                        <th>Type</th>
                        <th>Status</th>
                        {userRole !== 'user' && <th>Actions</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProperties.map(property => (
                        <tr key={property.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={property.images[0]}
                                className="rounded me-3"
                                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                alt={property.name}
                              />
                              <div>
                                <h6 className="mb-0">{property.name}</h6>
                                <small>
                                  {property.amenities.beds} Beds, {property.amenities.baths} Baths
                                </small>
                              </div>
                            </div>
                          </td>
                          <td>{property.location}</td>
                          <td>
                            {property.transactionType === 'rent' ? (
                              <>${property.price.toLocaleString()}/mo</>
                            ) : (
                              <>${property.price.toLocaleString()}</>
                            )}
                          </td>
                          <td>{property.category}</td>
                          <td>
                            <Badge 
                              bg={
                                property.status === 'Available' ? 'success' :
                                property.status === 'Sold' ? 'danger' : 'warning'
                              }
                            >
                              {property.status}
                            </Badge>
                          </td>
                          {userRole !== 'user' && (
                            <td>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-2"
                                onClick={() => {
                                  setCurrentProperty(property);
                                  setShowEditModal(true);
                                }}
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => {
                                  setCurrentProperty(property);
                                  setShowDeleteModal(true);
                                }}
                              >
                                <i className="fas fa-trash"></i>
                              </Button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PropertyForm
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onSubmit={handleCreate}
        title="Add New Property"
      />

      <PropertyForm
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        onSubmit={handleUpdate}
        property={currentProperty}
        title="Edit Property"
      />

      <ConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Confirm Delete"
        message={`Are you sure you want to delete "${currentProperty?.name}"?`}
      />

      <Footer />
    </div>
  );
};

export default PropertyManagement;