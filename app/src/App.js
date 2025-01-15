import React, { useState } from 'react';
import CompanyList from './components/CompanyList';
import CompanyForm from './components/CompanyForm';
import './App.css';

function App() {
  const [refreshList, setRefreshList] = useState(false);

  const handleCompanyAdded = () => {
    setRefreshList(prev => !prev);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gerenciamento de Empresas</h1>
      </header>
      <main className="App-main">
        <CompanyForm onCompanyAdded={handleCompanyAdded} />
        <CompanyList key={refreshList} />
      </main>
    </div>
  );
}

export default App;
