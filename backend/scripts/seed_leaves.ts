import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const types = [
    { name: 'Paid Time Off', description: 'Standard paid time off', defaultDays: 30, isPaid: true },
    { name: 'Sick Leave', description: 'Medical leave', defaultDays: 10, isPaid: true },
    { name: 'Unpaid Leaves', description: 'Unpaid time off', defaultDays: 0, isPaid: false }
  ];

  for (const t of types) {
    await prisma.leaveType.upsert({
      where: { name: t.name },
      update: {},
      create: t
    });
  }
  
  // Seed LeaveBalance for all existing employees
  const leaveTypes = await prisma.leaveType.findMany();
  const employees = await prisma.employee.findMany();
  
  const currentYear = new Date().getFullYear();
  
  for (const emp of employees) {
     for (const lt of leaveTypes) {
        await prisma.leaveBalance.upsert({
          where: {
            employeeId_leaveTypeId_year: {
              employeeId: emp.id,
              leaveTypeId: lt.id,
              year: currentYear
            }
          },
          update: {},
          create: {
            employeeId: emp.id,
            leaveTypeId: lt.id,
            year: currentYear,
            allocatedDays: lt.defaultDays,
            usedDays: 0,
            remainingDays: lt.defaultDays
          }
        });
     }
  }

  console.log('LeaveTypes and LeaveBalances seeded.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
