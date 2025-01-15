export class CompanyService {
    STORAGE_KEY = 'companies';
    API_URL = 'http://localhost:3333/companies';

    async createCompany(company) {
        const companies = this.getLocalCompanies();
        const newCompany = {
            ...company,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
            syncStatus: 'pending'
        };

        companies.push(newCompany);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(companies));

        if (navigator.onLine) {
            try {
                const response = await fetch(this.API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(company)
                });
                if (response.ok) {
                    newCompany.syncStatus = 'synced';
                    this.updateLocalCompany(newCompany);
                }
            } catch (error) {
                console.error('Erro ao sincronizar com o servidor:', error);
            }
        }

        return newCompany;
    }

    async updateCompany(id, company) {
        const companies = this.getLocalCompanies();
        const index = companies.findIndex(c => c.id === id);
        
        if (index !== -1) {
            companies[index] = {
                ...companies[index],
                ...company,
                updatedAt: new Date(),
                syncStatus: 'pending'
            };
            
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(companies));
            
            if (navigator.onLine) {
                try {
                    const response = await fetch(`${this.API_URL}/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(company)
                    });
                    if (response.ok) {
                        companies[index].syncStatus = 'synced';
                        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(companies));
                    }
                } catch (error) {
                    console.error('Erro ao atualizar no servidor:', error);
                }
            }
            
            return companies[index];
        }
        return null;
    }

    async deleteCompany(id) {
        const companies = this.getLocalCompanies().filter(c => c.id !== id);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(companies));
        
        if (navigator.onLine) {
            try {
                await fetch(`${this.API_URL}/${id}`, {
                    method: 'DELETE'
                });
            } catch (error) {
                console.error('Erro ao deletar no servidor:', error);
            }
        }
    }

    getLocalCompanies() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    updateLocalCompany(updatedCompany) {
        const companies = this.getLocalCompanies();
        const index = companies.findIndex(c => c.id === updatedCompany.id);
        if (index !== -1) {
            companies[index] = updatedCompany;
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(companies));
        }
    }

    async syncWithServer() {
        if (!navigator.onLine) return;

        const companies = this.getLocalCompanies();
        const pendingCompanies = companies.filter(c => c.syncStatus === 'pending');

        for (const company of pendingCompanies) {
            try {
                const response = await fetch(this.API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(company)
                });

                if (response.ok) {
                    company.syncStatus = 'synced';
                    this.updateLocalCompany(company);
                }
            } catch (error) {
                console.error('Erro na sincronização:', error);
            }
        }
    }
}