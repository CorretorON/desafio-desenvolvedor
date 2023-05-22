import React, { useState, useEffect } from 'react';
import Navbar from '../../components/SideBar';
import api from '../../services/api';
import './styles.css';

export default function Dashboard() {
    const [owner, setOwner] = useState('');
    const [type, setType] = useState('');
    const [address, setAddress] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [total_area, setTotal_area] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState({});

    const handleImmbiles = async (event) => {
        event.preventDefault();
    
        // Validar campos obrigatórios
        const errors = {};
        if (owner.trim() === '') {
          errors.owner = 'O campo proprietário é obrigatório';
        }
        if (type.trim() === '') {
          errors.type = 'O campo tipo é obrigatório';
        }
        if (address.trim() === '') {
          errors.address = 'O campo endereço é obrigatório';
        }
        if (bedrooms.trim() === '') {
            errors.bedrooms = 'O campo quantidade de quartos é obrigatório';
        }
        if (bathrooms.trim() === '') {
            errors.bathrooms = 'O campo quantidade de banheiros é obrigatório';
        } 
        if (total_area.trim() === '') {
            errors.total_area = 'O campo total de área é obrigatório';
        } 
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
          return;
        }
    
        try {
         
          const response = await api.post('/immobiles', {
            owner,
            type,
            address,
            bedrooms,
            bathrooms,
            total_area,
            price
          });
          alert("Imovel cadastrado com sucesso")
          window.location.replace("/dashboard");
        } catch (error) {
          console.error(error);
        }
      };



    return (
        <div className="container">
            <Navbar />
            <h1>Cadastrar Imóveis</h1>
            <div className='content'>
            <form onSubmit={handleImmbiles}>
                <label htmlFor="owner">Proprietário *</label>
                <input
                    type="text"
                    id="owner"
                    placeholder="Proprietário"
                    value={owner}
                    onChange={event => setOwner(event.target.value)}
                />
                {errors.owner && <span className="error">{errors.owner}</span>}
                <label htmlFor="type">Tipo *</label>
                <input
                    type="text"
                    id="type"
                    placeholder="Tipo"
                    value={type}
                    onChange={event => setType(event.target.value)}
                />
                {errors.type && <span className="error">{errors.type}</span>}
                <label htmlFor="address">Endereço</label>
                <input
                    type="text"
                    id="address"
                    placeholder="Endereço"
                    value={address}
                    onChange={event => setAddress(event.target.value)}
                />
                {errors.address && <span className="error">{errors.address}</span>}
                <label htmlFor="bedrooms">Quantidade de quartos *</label>
                <input
                    type="text"
                    id="bedrooms"
                    placeholder="Quantidade de quartos"
                    value={bedrooms}
                    onChange={event => setBedrooms(event.target.value)}
                />
                {errors.bedrooms && <span className="error">{errors.bedrooms}</span>}
                <label htmlFor="bathrooms">Quantidade de banheiros *</label>
                <input
                    type="text"
                    id="bathrooms"
                    placeholder="Quantidade de banheiros"
                    value={bathrooms}
                    onChange={event => setBathrooms(event.target.value)}
                />
                {errors.bathrooms && <span className="error">{errors.bathrooms}</span>}
                <label htmlFor="total_area">total area *</label>
                <input
                    type="text"
                    id="total_area"
                    placeholder="Total area"
                    value={total_area}
                    onChange={event => setTotal_area(event.target.value)}
                />
                {errors.total_area && <span className="error">{errors.total_area}</span>}
                <label htmlFor="price">Preço *</label>
                <input
                    type="text"
                    id="price"
                    placeholder="Preço"
                    value={price}
                    onChange={event => setPrice(event.target.value)}
                />
                {errors.price && <span className="error">{errors.price}</span>}
                <button className="btn" type="submit">Cadastrar</button>
            </form>
            </div>
        </div>
    );
}
