import { transactionFormProps } from 'actions/transaction/actions';

export type optionProps = { label: string, value: string };

export interface TransactionFormProps {
  title: string;
  submitHandler: <T extends transactionFormProps>(values: T) => void;
  submitting?: boolean;
  initialValues?: transactionFormProps;
}
