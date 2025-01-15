import React, { useState } from 'react';
import { CompanyService } from '../services/CompanyService';
import { formatCNPJ, validateCNPJ } from '../utils/validators';

export default function CompanyForm({ onCompanyAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    cnpj: '',
    address: '',
    phone: ''
  });
  const [error, setError] = useState('');

  const companyService = new CompanyService();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cnpj') {
      formattedValue = formatCNPJ(value);
    }
    if (name === 'phone') {
      formattedValue = value.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateCNPJ(formData.cnpj)) {
      setError('CNPJ inválido');
      return;
    }

    try {
      await companyService.createCompany(formData);
      setFormData({
        name: '',
        cnpj: '',
        address: '',
        phone: ''
      });
      if (onCompanyAdded) onCompanyAdded();
    } catch (err) {
      setError('Erro ao salvar empresa');
    }
  };

  return (
    <div className="company-form">
      <h2>Nova Empresa</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome da Empresa:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>CNPJ:</label>
          <input
            type="text"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
            placeholder="00.000.000/0000-00"
            required
          />
        </div>

        <div className="form-group">
          <label>Endereço:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Telefone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(00) 00000-0000"
            required
          />
        </div>

        <button type="submit">Salvar Empresa</button>
      </form>
    </div>
  );
} 
