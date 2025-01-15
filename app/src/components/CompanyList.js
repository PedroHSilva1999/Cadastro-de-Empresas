import React, { useState, useEffect } from 'react';
import { CompanyService } from '../services/CompanyService';

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  
  const companyService = new CompanyService();

  useEffect(() => {
    loadCompanies();
    
    window.addEventListener('online', handleSync);
    return () => window.removeEventListener('online', handleSync);
  }, []);

  const loadCompanies = async () => {
    const data = companyService.getLocalCompanies();
    setCompanies(data);
  };

  const handleSync = async () => {
    if (navigator.onLine) {
      await companyService.syncWithServer();
      loadCompanies();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta empresa?')) {
      await companyService.deleteCompany(id);
      loadCompanies();
    }
  };

  const handleEdit = (company) => {
    setEditingId(company.id);
    setEditForm(company);
  };

  const handleUpdate = async () => {
    await companyService.updateCompany(editingId, editForm);
    setEditingId(null);
    loadCompanies();
  };

  return (
    <div className="company-list">
      <h2>Empresas Cadastradas</h2>
      <div className="sync-status">
        Status: {navigator.onLine ? 'Online' : 'Offline'}
      </div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {companies.map(company => (
            <tr key={company.id}>
              {editingId === company.id ? (
                <>
                  <td>
                    <input
                      value={editForm.name}
                      onChange={e => setEditForm({...editForm, name: e.target.value})}
                    />
                  </td>
                  <td>
                    <input
                      value={editForm.cnpj}
                      onChange={e => setEditForm({...editForm, cnpj: e.target.value})}
                    />
                  </td>
                  <td>
                    <input
                      value={editForm.address}
                      onChange={e => setEditForm({...editForm, address: e.target.value})}
                    />
                  </td>
                  <td>
                    <input
                      value={editForm.phone}
                      onChange={e => setEditForm({...editForm, phone: e.target.value})}
                    />
                  </td>
                  <td>
                    <button onClick={handleUpdate}>Salvar</button>
                    <button onClick={() => setEditingId(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{company.name}</td>
                  <td>{company.cnpj}</td>
                  <td>{company.address}</td>
                  <td>{company.phone}</td>
                  <td>{company.syncStatus}</td>
                  <td>
                    <button onClick={() => handleEdit(company)}>Editar</button>
                    <button onClick={() => handleDelete(company.id)}>Excluir</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 

