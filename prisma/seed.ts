import { PrismaClient, UserRole, UserStatus, EmployeeStatus, AttendanceStatus, AttendanceEventType, LeaveRequestStatus, LeaveApprovalStatus, SalaryStructureStatus, SalaryComponentType, PayrollRunStatus, DocumentType, NotificationType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 1. Create Departments
  const departments = await Promise.all([
    prisma.department.create({ data: { name: 'Engineering', description: 'Software Development' } }),
    prisma.department.create({ data: { name: 'Human Resources', description: 'HR and Administration' } }),
    prisma.department.create({ data: { name: 'Finance', description: 'Accounting and Payroll' } }),
  ]);
  console.log('Created 3 Departments');

  // 2. Create Designations
  const designations = await Promise.all([
    prisma.designation.create({ data: { name: 'Software Engineer' } }),
    prisma.designation.create({ data: { name: 'HR Manager' } }),
    prisma.designation.create({ data: { name: 'Accountant' } }),
    prisma.designation.create({ data: { name: 'Engineering Manager' } }),
  ]);
  console.log('Created Designations');

  // 3. Create Leave Types
  const leaveTypes = await Promise.all([
    prisma.leaveType.create({ data: { name: 'Paid Leave', description: 'Standard paid time off', defaultDays: 20, isPaid: true } }),
    prisma.leaveType.create({ data: { name: 'Sick Leave', description: 'Medical leave', defaultDays: 10, isPaid: true } }),
    prisma.leaveType.create({ data: { name: 'Unpaid Leave', description: 'Unpaid time off', defaultDays: 0, isPaid: false } }),
  ]);
  console.log('Created 3 Leave Types');

  // 3.5 Create Company
  const company = await prisma.company.create({
    data: {
      name: 'Odoo India',
    },
  });
  console.log('Created Company');

  // 4. Create Admin User & Employee
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@dayflow.local',
      passwordHash: '$2b$10$FakePasswordHashForDevelopmentOnly1234567890', // Fake hash
      role: UserRole.ADMIN,
      emailVerified: true,
      status: UserStatus.ACTIVE,
      companyId: company.id,
    },
  });

  const adminEmployee = await prisma.employee.create({
    data: {
      userId: adminUser.id,
      companyId: company.id,
      employeeCode: 'OIADMI20230001',
      firstName: 'Admin',
      lastName: 'User',
      joiningDate: new Date('2023-01-01'),
      departmentId: departments[1].id,
      designationId: designations[1].id,
      status: EmployeeStatus.ACTIVE,
    },
  });
  console.log('Created Admin User and Employee');

  // 5. Create 10 Employees
  const employees = [];
  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.create({
      data: {
        email: `employee${i.toString().padStart(3, '0')}@dayflow.local`,
        passwordHash: '$2b$10$FakePasswordHashForDevelopmentOnly1234567890',
        role: UserRole.EMPLOYEE,
        emailVerified: true,
        status: UserStatus.ACTIVE,
        companyId: company.id,
      },
    });

    const emp = await prisma.employee.create({
      data: {
        userId: user.id,
        companyId: company.id,
        employeeCode: `OIJODO2023${(i + 1).toString().padStart(4, '0')}`,
        firstName: `John`,
        lastName: `Doe${i}`,
        joiningDate: new Date(`2023-02-${i.toString().padStart(2, '0')}`),
        departmentId: departments[i % 3].id,
        designationId: designations[i % 4].id,
        managerId: adminEmployee.id,
        status: EmployeeStatus.ACTIVE,
      },
    });
    employees.push(emp);
  }
  console.log('Created 10 Employees');

  // 6. Leave balances for employees
  const year = new Date().getFullYear();
  for (const emp of employees) {
    for (const lt of leaveTypes) {
      if (lt.defaultDays > 0) {
        await prisma.leaveBalance.create({
          data: {
            employeeId: emp.id,
            leaveTypeId: lt.id,
            year: year,
            allocatedDays: lt.defaultDays,
            remainingDays: lt.defaultDays,
          }
        });
      }
    }
  }
  console.log('Created Leave Balances');

  // 7. Attendance Records
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (const emp of employees.slice(0, 5)) {
    const checkInTime = new Date(today);
    checkInTime.setHours(9, 0, 0, 0);
    const checkOutTime = new Date(today);
    checkOutTime.setHours(17, 0, 0, 0);

    const attendance = await prisma.attendance.create({
      data: {
        employeeId: emp.id,
        date: today,
        checkIn: checkInTime,
        checkOut: checkOutTime,
        status: AttendanceStatus.PRESENT,
        totalMinutes: 480,
        workMinutes: 480,
      }
    });

    await prisma.attendanceEvent.create({
      data: {
        attendanceId: attendance.id,
        type: AttendanceEventType.CHECK_IN,
        timestamp: checkInTime,
      }
    });
  }
  console.log('Created Attendance Records');

  // 8. Leave Requests
  const leaveReq = await prisma.leaveRequest.create({
    data: {
      employeeId: employees[0].id,
      leaveTypeId: leaveTypes[0].id,
      startDate: today,
      endDate: today,
      totalDays: 1,
      status: LeaveRequestStatus.APPROVED,
    }
  });

  await prisma.leaveApproval.create({
    data: {
      leaveRequestId: leaveReq.id,
      approverId: adminEmployee.id,
      status: LeaveApprovalStatus.APPROVED,
      comment: 'Approved for development seed',
      approvedAt: new Date(),
    }
  });
  console.log('Created Leave Requests');

  // 9. Salary Structures and Components
  for (const emp of employees) {
    const salary = await prisma.salaryStructure.create({
      data: {
        employeeId: emp.id,
        effectiveFrom: new Date('2023-01-01'),
        grossSalary: 5000 + (Math.random() * 2000),
      }
    });

    await prisma.salaryComponent.createMany({
      data: [
        {
          salaryStructureId: salary.id,
          name: 'Basic Salary',
          type: SalaryComponentType.EARNING,
          amount: salary.grossSalary * 0.6,
        },
        {
          salaryStructureId: salary.id,
          name: 'HRA',
          type: SalaryComponentType.EARNING,
          amount: salary.grossSalary * 0.4,
        },
        {
          salaryStructureId: salary.id,
          name: 'Tax Deduction',
          type: SalaryComponentType.DEDUCTION,
          amount: salary.grossSalary * 0.1,
        }
      ]
    });
  }
  console.log('Created Salary Structures and Components');

  // 10. Payroll Records and Payslips
  const payrollStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const payrollEnd = new Date(today.getFullYear(), today.getMonth(), 0);
  
  const payrollRun = await prisma.payrollRun.create({
    data: {
      periodStart: payrollStart,
      periodEnd: payrollEnd,
      status: PayrollRunStatus.COMPLETED,
      processedAt: new Date(),
    }
  });

  for (const emp of employees.slice(0, 3)) {
    await prisma.payslip.create({
      data: {
        payrollRunId: payrollRun.id,
        employeeId: emp.id,
        grossAmount: 5000,
        totalDeductions: 500,
        netAmount: 4500,
      }
    });
  }
  console.log('Created Payroll Records');

  // 11. Notifications
  await prisma.notification.create({
    data: {
      userId: employees[0].userId,
      title: 'Welcome to Dayflow',
      message: 'Your account has been setup successfully.',
      type: NotificationType.SYSTEM,
    }
  });
  console.log('Created Notifications');

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
