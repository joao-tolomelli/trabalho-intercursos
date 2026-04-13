import { api } from '../utils/api';

export interface AnalysisPayload {
  activity: string;
  businessType: string;
  workLocation: string;
  worksAlone: string;
  numberOfPeople: string;
  fixedExpenses: string;
  issuesInvoices: string;
  invoiceDoubts: string;
  hasOtherCompany: string;
  hasBenefitsOrCLT: string;
  income: string;
}

export const submitToAI = async (data: AnalysisPayload) => {
  const response = await api.post('/classificador/analisar-perfil', data);
  return response.data;
};