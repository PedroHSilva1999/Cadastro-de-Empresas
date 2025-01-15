import { Request, Response, NextFunction, RequestHandler } from 'express';

export const validateCNPJ: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { cnpj } = req.body;
  
  if (!cnpj) {
    res.status(400).json({ error: 'CNPJ é obrigatório' });
    return;
  }

  const cleanCNPJ = cnpj.replace(/[^\d]/g, '');
  
  if (cleanCNPJ.length !== 14) {
    res.status(400).json({ error: 'CNPJ inválido' });
    return;
  }
  
  req.body.cnpj = cleanCNPJ.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
  
  next();
}; 