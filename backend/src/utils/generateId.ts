import { prisma } from '../config/prisma';

export const generateEmployeeCode = async (
  companyName: string,
  firstName: string,
  lastName?: string
): Promise<string> => {
  // 1. Company Prefix: First 2 letters of Company Name
  const companyPrefix = companyName
    .replace(/[^a-zA-Z]/g, '')
    .substring(0, 2)
    .toUpperCase()
    .padEnd(2, 'X');

  // 2. Name Prefix: First 2 of First Name + First 2 of Last Name
  // If no last name, first 4 of first name
  let namePrefix = '';
  const cleanFirstName = firstName.replace(/[^a-zA-Z]/g, '').toUpperCase();
  
  if (lastName) {
    const cleanLastName = lastName.replace(/[^a-zA-Z]/g, '').toUpperCase();
    namePrefix = (cleanFirstName.substring(0, 2).padEnd(2, 'X')) + 
                 (cleanLastName.substring(0, 2).padEnd(2, 'X'));
  } else {
    namePrefix = cleanFirstName.substring(0, 4).padEnd(4, 'X');
  }

  // 3. Year
  const currentYear = new Date().getFullYear().toString();

  // 4. Serial: Count employees joined this year in this company
  // Actually, we can count total employees created this year across the system for simplicity,
  // or specifically for this company. Let's do it generally for this company/system.
  // We'll just search for IDs starting with the same Company+Year prefix
  
  // Find the max serial for this company and year
  const lastEmployee = await prisma.employee.findFirst({
    where: {
      employeeCode: {
        startsWith: companyPrefix,
        contains: currentYear,
      }
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  let serialNumber = 1;
  if (lastEmployee) {
    const lastCode = lastEmployee.employeeCode;
    // Extract the last 4 digits
    const lastSerialMatch = lastCode.match(/(\d{4})$/);
    if (lastSerialMatch) {
      serialNumber = parseInt(lastSerialMatch[1], 10) + 1;
    }
  }

  const serialString = serialNumber.toString().padStart(4, '0');

  return `${companyPrefix}${namePrefix}${currentYear}${serialString}`;
};

export const generateRandomPassword = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < 10; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};
