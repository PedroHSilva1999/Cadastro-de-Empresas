import { Request, Response, NextFunction, RequestHandler } from 'express';

export const validateCompanyFields: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, cnpj, address, phone } = req.body;
  
  if (!name || !cnpj || !address || !phone) {
    res.status(400).json({ 
      error: 'Todos os campos são obrigatórios: nome, CNPJ, endereço e telefone' 
    });
    return;
  }
  
  next();
}; 