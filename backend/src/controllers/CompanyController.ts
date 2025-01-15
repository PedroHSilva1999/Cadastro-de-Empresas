import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

interface ICompany {
  id: string;
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export class CompanyController {
  private companies: ICompany[] = [];

  public create = async (req: Request, res: Response): Promise<void> => {
    const { name, cnpj, address, phone } = req.body;

    const company: ICompany = {
      id: uuid(),
      name,
      cnpj,
      address,
      phone,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.companies.push(company);

     res.status(201).json(company);
  }

  public list = async (req: Request, res: Response): Promise<void> => {
     res.json(this.companies);
  }

  public show = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const company = this.companies.find(company => company.id === id);

    if (!company) {
       res.status(404).json({ error: 'Empresa não encontrada' });
    }

     res.json(company);
  }

  public update = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, cnpj, address, phone } = req.body;

    const companyIndex = this.companies.findIndex(company => company.id === id);

    if (companyIndex < 0) {
       res.status(404).json({ error: 'Empresa não encontrada' });
    }

    const company = {
      ...this.companies[companyIndex],
      name,
      cnpj,
      address,
      phone,
      updatedAt: new Date()
    };

    this.companies[companyIndex] = company;

    res.json(company);
  }

  public delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const companyIndex = this.companies.findIndex(company => company.id === id);

    if (companyIndex < 0) {
    res.status(404).json({ error: 'Empresa não encontrada' });
    }

    this.companies.splice(companyIndex, 1);

    res.status(204).send();
  }
} 