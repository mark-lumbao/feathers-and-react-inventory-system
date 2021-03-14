export type paginationProps = {
  limit: number,
  skip: number,
}

export const DEFAULT_PAGINATION: paginationProps = {
  limit: 15,
  skip: 0,
};

export const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
