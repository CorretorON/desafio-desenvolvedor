import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Navbar from '../../components/SideBar';
import './styles.css';

export default function Dashboard() {
  const [visitRequests, setVisitRequests] = useState([]);

  useEffect(() => {
    async function fetchVisitRequests() {
      try {
        const response = await api.get('/visit-requests');
        setVisitRequests(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchVisitRequests();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <h1>Visitas marcadas</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>Data da Visita</th>
              <th>Tipo de Imóvel</th>
              <th>Proprietário</th>
            </tr>
          </thead>
          <tbody>
            {visitRequests.map(visitRequest => (
              <tr key={visitRequest.id}>
                <td>{visitRequest.id}</td>
                <td>{visitRequest.name}</td>
                <td>{visitRequest.phone}</td>
                <td>{visitRequest.email}</td>
                <td>{visitRequest.visit_date}</td>
                <td>{visitRequest.immobile_type}</td>
                <td>{visitRequest.immobile_owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
