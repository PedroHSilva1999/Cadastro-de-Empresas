import { Router } from "express";
import { CompanyController } from "./controllers/CompanyController";
import { validateCNPJ } from "./middlewares/validateCNPJ";
import { validateCompanyFields } from "./middlewares/validateCompanyFields";

const router = Router();
const companyController = new CompanyController();

router.post(
  '/companies', 
  validateCompanyFields,
  validateCNPJ,
  companyController.create
);

router.get('/companies', companyController.list);
router.get('/companies/:id', companyController.show);

router.put(
  '/companies/:id',
  validateCompanyFields,
  validateCNPJ,
  companyController.update
);

router.delete('/companies/:id', companyController.delete);

export { router };
