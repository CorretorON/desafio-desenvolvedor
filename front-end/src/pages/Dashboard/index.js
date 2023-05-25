import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../services/api';
import Navbar from '../../components/SideBar';
import './styles.css';

export default function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showMarkVisitModal, setShowMarkVisitModal] = useState(false);
  const [visit_date, setVisit_Date] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function fetchProperties() {
      try {
        const token = localStorage.getItem('token'); // Obter o token do localStorage
        const response = await axios.get('http://localhost:8000/api/immobiles', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProperties(response.data.imoveis);
        setFilteredProperties(response.data.imoveis);
        console.log(response.data.imoveis); // Processar os dados recebidos
      } catch (error) {
        console.error(error);
      }
    }

    fetchProperties();
  }, []);

  const formatArea = (area) => {
    return area + ' m²';
  };

  const handleFilter = () => {
    let filtered = properties;

    if (selectedType) {
      filtered = filtered.filter(property => property.type === selectedType);
    }

    if (priceFilter === 'maior') {
      filtered = filtered.filter(property => property.price > 250000.00);
    }

    if (priceFilter === 'menor') {
      filtered = filtered.filter(property => property.price <= 250000.00);
    }

    setFilteredProperties(filtered);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
  };

  const handleShowDetails = (property) => {
    setSelectedProperty(property);
    setShowDetailsModal(true);
  };

  const handleMarkVisit = (property) => {
    setSelectedProperty(property);
    setShowMarkVisitModal(true);
  };

  const handleMarkVisitSubmit = async (event) => {
    event.preventDefault();

    // Validar campos obrigatórios
    const errors = {};
    if (visit_date.trim() === '') {
      errors.visit_date = 'O campo data é obrigatório';
    }
    if (name.trim() === '') {
      errors.name = 'O campo nome é obrigatório';
    }
    if (phone.trim() === '') {
      errors.phone = 'O campo telefone é obrigatório';
    }
    if (email.trim() === '') {
      errors.email = 'O campo e-mail é obrigatório';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const response = await api.post(`/immobile/${selectedProperty.id}/mark-visit`, {
        visit_date,
        name,
        phone,
        email
      });
      alert("Visita agendada");
      window.location.replace("/dashboard");
    } catch (error) {
      console.error(error);
    }

    setShowMarkVisitModal(false);
    setVisit_Date('');
    setName('');
    setPhone('');
    setEmail('');
  };

  useEffect(() => {
    handleFilter();
  }, [selectedType, priceFilter]);

  return (
    <div className="container">
      <Navbar />
      <h1>Lista de Imóveis</h1>
      <div className="filter-form">
        <h2>Filtros:</h2>
        <select value={selectedType} onChange={handleTypeChange}>
          <option value="">Todos os Tipos</option>
          <option value="casa">Casa</option>
          <option value="apartamento">Apartamento</option>
        </select>
        <select value={priceFilter} onChange={handlePriceFilterChange}>
          <option value="">Todos os Preços</option>
          <option value="maior">Valor Maior</option>
          <option value="menor">Valor Menor</option>
        </select>
      </div>
      <div className="property-list">
        {filteredProperties.map(property => (
          <div key={property.id} className="property-card">
            <div className="property-info">
              <h3>Tipo: {property.type}</h3>
              <p>Proprietário: {property.owner}</p>
              <p>Endereço: {property.address}</p>
              <p>Priço: ${property.price}</p>
              <button onClick={() => handleShowDetails(property)}>Exibir Detalhes</button>
              <button onClick={() => handleMarkVisit(property)}>Marcar visita</button>
            </div>
          </div>
        ))}
      </div>
      {showDetailsModal && selectedProperty && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-close">
              <button onClick={() => setShowDetailsModal(false)}>Fechar</button>
            </div>
            <div className="modal-details">
              <h2>Detalhes do Imóvel</h2>
              <p>Tipo: {selectedProperty.type}</p>
              <p>Endereço: {selectedProperty.address}</p>
              <p>Quartos: {selectedProperty.bedrooms}</p>
              <p>Banheiros: {selectedProperty.bathrooms}</p>
              <p>Total Area: {formatArea(selectedProperty.total_area)}</p>
              <p>Priço: ${selectedProperty.price}</p>
            </div>
          </div>
        </div>
      )}
      {showMarkVisitModal && selectedProperty && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-close">
              <button onClick={() => setShowMarkVisitModal(false)}>Fechar</button>
            </div>
            <div className="modal-visit">
              <h2>Marcar Visita</h2>
              <form onSubmit={handleMarkVisitSubmit}>
                <label>Data da Visita:</label>
                {errors.visit_date && <span className="error">{errors.visit_date}</span>}
                <input
                  type="date"
                  value={visit_date}
                  onChange={event => setVisit_Date(event.target.value)}
                />

                <label>Nome:</label>
                {errors.name && <span className="error">{errors.name}</span>}
                <input
                  type="text"
                  value={name}
                  onChange={event => setName(event.target.value)}
                />

                <label>Telefone:</label>
                {errors.phone && <span className="error">{errors.phone}</span>}
                <input
                  type="text"
                  value={phone}
                  onChange={event => setPhone(event.target.value)}
                />

                <label>E-mail:</label>
                {errors.email && <span className="error">{errors.email}</span>}
                <input
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
                <button type="submit">Marcar Visita</button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
