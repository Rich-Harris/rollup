export { external1 } from 'external1';
export * from 'external2';

const dynamic = import('external3');

export { dynamic };
