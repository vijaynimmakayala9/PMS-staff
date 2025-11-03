import React, { useState, useEffect } from 'react';
import {
  FiDownload,
  FiPrinter,
  FiMail,
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiCreditCard,
  FiTrendingUp,
  FiPieChart,
  FiFileText,
  FiArrowUp,
  FiArrowDown,
  FiEye,
  FiEyeOff
} from 'react-icons/fi';

const SalarySlip = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-06');
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showNetSalary, setShowNetSalary] = useState(true);

  // Sample salary data
  const salaryData = {
    employee: {
      name: 'Rajesh Kumar',
      employeeId: 'EMP-2024-001',
      designation: 'Senior Software Engineer',
      department: 'Technology',
      bankAccount: 'XXXX XXXX 1234',
      joiningDate: '2022-03-15',
      panNumber: 'ABCDE1234F'
    },
    salaryDetails: {
      basic: 75000,
      hra: 37500,
      specialAllowance: 45000,
      medicalAllowance: 1250,
      travelAllowance: 8000,
      performanceBonus: 15000,
      overtime: 5000,
      otherAllowances: 2000
    },
    deductions: {
      pf: 9000,
      professionalTax: 200,
      incomeTax: 12000,
      insurance: 2500,
      loanRecovery: 0,
      otherDeductions: 500
    },
    attendance: {
      workingDays: 22,
      presentDays: 21,
      leaves: 1,
      lopDays: 0
    }
  };

  const months = [
    { value: '2024-06', label: 'June 2024' },
    { value: '2024-05', label: 'May 2024' },
    { value: '2024-04', label: 'April 2024' },
    { value: '2024-03', label: 'March 2024' },
    { value: '2024-02', label: 'February 2024' },
    { value: '2024-01', label: 'January 2024' }
  ];

  // Calculate totals
  const totalEarnings = Object.values(salaryData.salaryDetails).reduce((sum, amount) => sum + amount, 0);
  const totalDeductions = Object.values(salaryData.deductions).reduce((sum, amount) => sum + amount, 0);
  const netSalary = totalEarnings - totalDeductions;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const downloadPayslip = () => {
    alert('Payslip downloaded successfully!');
  };

  const printPayslip = () => {
    window.print();
  };

  const emailPayslip = () => {
    alert('Payslip sent to your registered email!');
  };

  const getSalaryChange = () => {
    return {
      change: 8.5,
      trend: 'up',
      amount: 11500
    };
  };

  const salaryChange = getSalaryChange();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FiDollarSign className="text-green-600 mr-3" />
              Salary Slip
            </h1>
            <p className="text-gray-600 mt-2">View and download your monthly salary details</p>
          </div>
          <div className="flex space-x-3 mt-4 lg:mt-0">
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {months.map(month => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Salary Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Net Salary</p>
                <div className="flex items-center space-x-2">
                  {showNetSalary ? (
                    <p className="text-3xl font-bold text-green-600 mt-2">
                      {formatCurrency(netSalary)}
                    </p>
                  ) : (
                    <p className="text-3xl font-bold text-green-600 mt-2">••••••</p>
                  )}
                  <button
                    onClick={() => setShowNetSalary(!showNetSalary)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showNetSalary ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">This month</p>
              </div>
              <div className="p-3 rounded-full bg-green-500 bg-opacity-10">
                <FiCreditCard className="text-2xl text-green-500" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              {salaryChange.trend === 'up' ? (
                <FiArrowUp className="text-green-500 mr-1" />
              ) : (
                <FiArrowDown className="text-red-500 mr-1" />
              )}
              <span className={`text-sm ${salaryChange.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {salaryChange.trend === 'up' ? '+' : '-'}{salaryChange.change}% from last month
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Earnings</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{formatCurrency(totalEarnings)}</p>
                <p className="text-xs text-gray-500 mt-1">Before deductions</p>
              </div>
              <div className="p-3 rounded-full bg-blue-500 bg-opacity-10">
                <FiTrendingUp className="text-2xl text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Deductions</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{formatCurrency(totalDeductions)}</p>
                <p className="text-xs text-gray-500 mt-1">Taxes & Contributions</p>
              </div>
              <div className="p-3 rounded-full bg-purple-500 bg-opacity-10">
                <FiPieChart className="text-2xl text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Salary Slip */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Header Section */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Salary Slip</h2>
                    <p className="text-blue-100 mt-1">
                      {months.find(m => m.value === selectedMonth)?.label}
                    </p>
                  </div>
                  <div className="mt-4 lg:mt-0 text-right">
                    <p className="text-lg font-semibold">ABC Technologies Pvt. Ltd.</p>
                    <p className="text-blue-100 text-sm">Bangalore, Karnataka</p>
                  </div>
                </div>
              </div>

              {/* Employee Details */}
              <div className="p-6 border-b border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FiUser className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Employee Name</p>
                      <p className="font-semibold text-gray-800">{salaryData.employee.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FiFileText className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Employee ID</p>
                      <p className="font-semibold text-gray-800">{salaryData.employee.employeeId}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FiUser className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Designation</p>
                      <p className="font-semibold text-gray-800">{salaryData.employee.designation}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <FiCalendar className="text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Pay Period</p>
                      <p className="font-semibold text-gray-800">1st - 30th {months.find(m => m.value === selectedMonth)?.label.split(' ')[0]}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Salary Breakdown */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Salary Breakdown</h3>
                  <button
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    {showBreakdown ? 'Hide Details' : 'Show Details'}
                  </button>
                </div>

                {/* Earnings */}
                <div className="mb-6">
                  <h4 className="font-semibold text-green-600 mb-3">Earnings</h4>
                  <div className="space-y-3">
                    {Object.entries(salaryData.salaryDetails).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="font-semibold text-gray-800">{formatCurrency(value)}</span>
                      </div>
                    ))}
                    <div className="border-t border-gray-200 pt-3 flex justify-between items-center font-semibold">
                      <span className="text-gray-800">Total Earnings</span>
                      <span className="text-green-600">{formatCurrency(totalEarnings)}</span>
                    </div>
                  </div>
                </div>

                {/* Deductions */}
                <div className="mb-6">
                  <h4 className="font-semibold text-red-600 mb-3">Deductions</h4>
                  <div className="space-y-3">
                    {Object.entries(salaryData.deductions).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-gray-600 capitalize">
                          {key === 'pf' ? 'Provident Fund' : 
                           key === 'lop' ? 'Loss of Pay' :
                           key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="font-semibold text-gray-800">{formatCurrency(value)}</span>
                      </div>
                    ))}
                    <div className="border-t border-gray-200 pt-3 flex justify-between items-center font-semibold">
                      <span className="text-gray-800">Total Deductions</span>
                      <span className="text-red-600">{formatCurrency(totalDeductions)}</span>
                    </div>
                  </div>
                </div>

                {/* Net Salary */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Net Salary Payable</span>
                    <span className="text-2xl font-bold text-green-600">
                      {showNetSalary ? formatCurrency(netSalary) : '••••••'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                    <span>In Words: {showNetSalary ? `Rupees ${convertToWords(netSalary)} Only` : '••••••'}</span>
                    <span>Bank Transfer</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 p-4 border-t border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
                  <div>
                    <p>Generated on: {new Date().toLocaleDateString()}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <p>Authorized Signatory</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-6">
              <button
                onClick={downloadPayslip}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <FiDownload className="text-lg" />
                <span>Download PDF</span>
              </button>
              <button
                onClick={printPayslip}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <FiPrinter className="text-lg" />
                <span>Print Slip</span>
              </button>
              <button
                onClick={emailPayslip}
                className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
              >
                <FiMail className="text-lg" />
                <span>Email</span>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Attendance Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FiCalendar className="text-blue-500 mr-2" />
                Attendance Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Working Days</span>
                  <span className="font-semibold">{salaryData.attendance.workingDays}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Present Days</span>
                  <span className="font-semibold text-green-600">{salaryData.attendance.presentDays}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Leaves Taken</span>
                  <span className="font-semibold text-yellow-600">{salaryData.attendance.leaves}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">LOP Days</span>
                  <span className="font-semibold text-red-600">{salaryData.attendance.lopDays}</span>
                </div>
              </div>
            </div>

            {/* Tax Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Tax Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Income Tax</span>
                  <span className="font-semibold text-red-600">{formatCurrency(salaryData.deductions.incomeTax)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Professional Tax</span>
                  <span className="font-semibold text-red-600">{formatCurrency(salaryData.deductions.professionalTax)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Provident Fund</span>
                  <span className="font-semibold text-blue-600">{formatCurrency(salaryData.deductions.pf)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Tax Paid YTD</span>
                    <span className="text-red-600">{formatCurrency(45000)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Year-to-Date Summary */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Year-to-Date</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Total Earnings</span>
                  <span className="font-semibold">{formatCurrency(1560000)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Tax Paid</span>
                  <span className="font-semibold">{formatCurrency(234000)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Net Salary</span>
                  <span className="font-semibold">{formatCurrency(1326000)}</span>
                </div>
                <div className="border-t border-blue-400 pt-3 mt-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>Financial Year 2024-25</span>
                    <span>6 Months</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button className="w-full text-left text-blue-600 hover:text-blue-800 py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors">
                  Form 16 Download
                </button>
                <button className="w-full text-left text-blue-600 hover:text-blue-800 py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors">
                  Investment Declaration
                </button>
                <button className="w-full text-left text-blue-600 hover:text-blue-800 py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors">
                  Tax Saving Options
                </button>
                <button className="w-full text-left text-blue-600 hover:text-blue-800 py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors">
                  Salary Revision History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to convert numbers to words (simplified version)
const convertToWords = (num) => {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

  if (num === 0) return 'Zero';

  let words = '';

  // Handle lakhs
  if (num >= 100000) {
    words += convertToWords(Math.floor(num / 100000)) + ' Lakh ';
    num %= 100000;
  }

  // Handle thousands
  if (num >= 1000) {
    words += convertToWords(Math.floor(num / 1000)) + ' Thousand ';
    num %= 1000;
  }

  // Handle hundreds
  if (num >= 100) {
    words += ones[Math.floor(num / 100)] + ' Hundred ';
    num %= 100;
  }

  // Handle tens and ones
  if (num >= 20) {
    words += tens[Math.floor(num / 10)] + ' ';
    num %= 10;
  } else if (num >= 10) {
    words += teens[num - 10] + ' ';
    num = 0;
  }

  if (num > 0) {
    words += ones[num] + ' ';
  }

  return words.trim() + ' Rupees';
};

export default SalarySlip;