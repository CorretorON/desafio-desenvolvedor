import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Navbar from '../../components/SideBar';

export default function Dashboard() {
    const [imoveis, setImoveis] = useState([]);
    const [editingImovel, setEditingImovel] = useState(null);
    const [editForm, setEditForm] = useState({
        owner: '',
        type: '',
        address: '',
        bedrooms: 0,
        bathrooms: 0,
        total_area: 0,
        price: 0
    });

    const { owner, type, address, bedrooms, bathrooms, total_area, price } = editForm;
    const [errors, setErrors] = useState({});

    useEffect(() => {
        async function fetchImoveis() {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/immobiles', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setImoveis(response.data.imoveis);
            } catch (error) {
                console.error(error);
            }
        }

        fetchImoveis();
    }, []);

    const handleEdit = (imovel) => {
        setEditingImovel(imovel);
        setEditForm({
            owner: imovel.owner,
            type: imovel.type,
            address: imovel.address,
            bedrooms: imovel.bedrooms,
            bathrooms: imovel.bathrooms,
            total_area: imovel.total_area,
            price: imovel.price
        });
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await api.delete(`/immobiles/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setImoveis(imoveis.filter(imovel => imovel.id !== id));
            console.log('Imóvel deletado com sucesso!');
        } catch (error) {
            console.error('Erro ao deletar o imóvel:', error);
        }
    };

    const handleCloseModal = () => {
        setEditingImovel(null);
        setEditForm({
            owner: '',
            type: '',
            address: '',
            bedrooms: 0,
            bathrooms: 0,
            total_area: 0,
            price: 0
        });
    };

    const handleUpdateImovel = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await api.put(`/immobiles/${editingImovel.id}`, editForm, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Alterações salvas:', response.data);

            handleCloseModal();
        } catch (error) {
            console.error('Erro ao salvar as alterações:', error);

        }
    };

    return (
        <div className="container">
            <Navbar />
            <h1>Meus Imóveis</h1>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Proprietário</th>
                            <th>Tipo</th>
                            <th>Endereço</th>
                            <th>Quartos</th>
                            <th>Banheiros</th>
                            <th>Área Total</th>
                            <th>Preço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {imoveis.map((imovel) => (
                            <tr key={imovel.id}>
                                <td>{imovel.id}</td>
                                <td>{imovel.owner}</td>
                                <td>{imovel.type}</td>
                                <td>{imovel.address}</td>
                                <td>{imovel.bedrooms}</td>
                                <td>{imovel.bathrooms}</td>
                                <td>{imovel.total_area}</td>
                                <td>{imovel.price}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => handleEdit(imovel)}>Editar</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(imovel.id)}>Deletar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {editingImovel && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Editar Imóvel</h2>
                        <form onSubmit={handleUpdateImovel}>
                            <label htmlFor="owner">Proprietário *</label>
                            <input
                                type="text"
                                id="owner"
                                placeholder="Proprietário"
                                value={owner}
                                onChange={(event) => setEditForm({ ...editForm, owner: event.target.value })}
                            />
                            {errors.owner && <span className="error">{errors.owner}</span>}
                            <label htmlFor="type">Tipo *</label>
                            <input
                                type="text"
                                id="type"
                                placeholder="Tipo"
                                value={type}
                                onChange={(event) => setEditForm({ ...editForm, type: event.target.value })}
                            />
                            {errors.type && <span className="error">{errors.type}</span>}

                            <label htmlFor="address">Endereço</label>
                            <input
                                type="text"
                                id="address"
                                placeholder="Endereço"
                                value={address}
                                onChange={(event) => setEditForm({ ...editForm, address: event.target.value })}
                            />
                            {errors.address && <span className="error">{errors.address}</span>}

                            <label htmlFor="bedrooms">Quantidade de quartos *</label>
                            <input
                                type="text"
                                id="bedrooms"
                                placeholder="Quantidade de quartos"
                                value={bedrooms}
                                onChange={(event) => setEditForm({ ...editForm, bedrooms: event.target.value })}
                            />
                            {errors.bedrooms && <span className="error">{errors.bedrooms}</span>}

                            <label htmlFor="bathrooms">Quantidade de banheiros *</label>
                            <input
                                type="text"
                                id="bathrooms"
                                placeholder="Quantidade de banheiros"
                                value={bathrooms}
                                onChange={(event) => setEditForm({ ...editForm, bathrooms: event.target.value })}
                            />
                            {errors.bathrooms && <span className="error">{errors.bathrooms}</span>}

                            <label htmlFor="total_area">Área Total *</label>
                            <input
                                type="text"
                                id="total_area"
                                placeholder="Área Total"
                                value={total_area}
                                onChange={(event) => setEditForm({ ...editForm, total_area: event.target.value })}
                            />
                            {errors.total_area && <span className="error">{errors.total_area}</span>}

                            <label htmlFor="price">Preço *</label>
                            <input
                                type="text"
                                id="price"
                                placeholder="Preço"
                                value={price}
                                onChange={(event) => setEditForm({ ...editForm, price: event.target.value })}
                            />
                            {errors.price && <span className="error">{errors.price}</span>}
                            <button className="btn btn-primary" type="submit">Atualizar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}