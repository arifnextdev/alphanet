'use client';

import { InvoiceProps } from '@/types/invoice';
import Image from 'next/image';
import type React from 'react';

const Invoice: React.FC<InvoiceProps> = ({
  data,
  companyName = 'Neyamot Enterprises',
  companyInfo = 'Ka-124, Darjibarir Moor Uttarpara, Khilkhet, Dhaka-1229, Bangladesh',
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const payment = data;
  // Assuming first payment for display
  const totalAmount =
    payment?.subtotal + payment?.tax + payment?.vat - payment?.discount;

  return (
    <div className="bg-gray-100 p-5 min-h-screen">
      <div
        id="print-area"
        className="max-w-4xl mx-auto bg-white shadow-lg "
        style={{ width: '210mm', minHeight: '297mm' }}
      >
        <div className="p-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-10 pb-5 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 border border-gray-300 bg-gray-50 flex items-center justify-center text-xs text-gray-500">
                <Image
                  src={'/Logo.png'}
                  width={50}
                  height={50}
                  alt={companyName}
                />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 mb-1">
                  {companyName}
                </h1>
                <p className="text-sm text-gray-600">{companyInfo}</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-light text-gray-900 mb-1">
                INVOICE
              </h2>
              <div className="text-sm text-gray-600 mb-2">{data.id}</div>
              <div className="text-xs text-gray-500">{data.paidAt}</div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-2 gap-8 mb-5">
            {/* Service Details */}
            <div className="bg-gray-50 p-5 border-l-4 border-gray-900">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                Service Details
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">
                    Domain Name:
                  </span>
                  <span className="text-gray-900">
                    {data.order.domainName ? data.order.domainName : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Product:</span>
                  <span className="text-gray-900">
                    {data.order.product.name}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Type:</span>
                  <span className="text-gray-900">
                    {data.order.product.type}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Status:</span>
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium uppercase rounded ${getStatusColor(data.status)}`}
                  >
                    {data.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Expires:</span>
                  <span className="text-gray-900">
                    {formatDate(data.order.expiresAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-gray-50 p-5 border-l-4 border-gray-900">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                Customer Information
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Name:</span>
                  <span className="text-gray-900">{data.user.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Email:</span>
                  <span className="text-gray-900">{data.user.email}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Phone:</span>
                  <span className="text-gray-900">
                    {data.user.phone || '+8801xxxxxxxxx'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Paid At:</span>
                  <span className="text-gray-900">
                    {formatDate(data.paidAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Breakdown Table */}
          <div className="mb-2">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr>
                  <th className="bg-gray-100 px-3 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wide border-b border-gray-200">
                    Description
                  </th>
                  <th className="bg-gray-100 px-3 py-3 text-center text-xs font-semibold text-gray-900 uppercase tracking-wide border-b border-gray-200">
                    Quantity
                  </th>
                  <th className="bg-gray-100 px-3 py-3 text-right text-xs font-semibold text-gray-900 uppercase tracking-wide border-b border-gray-200">
                    Unit Price
                  </th>
                  <th className="bg-gray-100 px-3 py-3 text-right text-xs font-semibold text-gray-900 uppercase tracking-wide border-b border-gray-200">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-secondary">
                  <td className="px-3 text-secondary py-3 text-sm border-b border-gray-100">
                    {data.order.product.name} - {data.order.domainName}
                  </td>
                  <td className="px-3 py-3 text-sm text-center border-b border-gray-100">
                    1
                  </td>
                  <td className="px-3 py-3 text-sm text-right border-b border-gray-100">
                    {formatCurrency(payment?.subtotal || 0, payment?.currency)}
                  </td>
                  <td className="px-3 py-3 text-sm text-right border-b border-gray-100">
                    {formatCurrency(payment?.subtotal || 0, payment?.currency)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-5">
            <div className="w-64">
              <table className="w-full border-collapse">
                <tbody>
                  <tr>
                    <td className="px-3 py-2 text-sm text-gray-600 border-b border-gray-100">
                      Subtotal:
                    </td>
                    <td className="px-3 py-2 text-sm text-right text-gray-900 font-medium border-b border-gray-100">
                      {formatCurrency(
                        payment?.subtotal || 0,
                        payment?.currency,
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-sm text-gray-600 border-b border-gray-100">
                      Tax:
                    </td>
                    <td className="px-3 py-2 text-sm text-right text-gray-900 font-medium border-b border-gray-100">
                      {formatCurrency(payment?.tax || 0, payment?.currency)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-sm text-gray-600 border-b border-gray-100">
                      VAT:
                    </td>
                    <td className="px-3 py-2 text-sm text-right text-gray-900 font-medium border-b border-gray-100">
                      {formatCurrency(payment?.vat || 0, payment?.currency)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-sm text-gray-600 border-b border-gray-100">
                      Discount:
                    </td>
                    <td className="px-3 py-2 text-sm text-right text-gray-900 font-medium border-b border-gray-100">
                      -
                      {formatCurrency(
                        payment?.discount || 0,
                        payment?.currency,
                      )}
                    </td>
                  </tr>
                  <tr className="border-t-2 border-b-2 border-gray-900">
                    <td className="px-3 py-3 text-base font-semibold text-gray-900">
                      Total:
                    </td>
                    <td className="px-3 py-3 text-base font-semibold text-right text-gray-900">
                      {formatCurrency(totalAmount, payment?.currency)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Transaction Information */}
          <div className="bg-gray-100 p-5 mb-8">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Payment Information
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-xs">
                <span className="block text-gray-600 mb-1">
                  Transaction ID:
                </span>
                <span className="text-gray-900 font-medium">
                  {payment?.transId}
                </span>
              </div>
              <div className="text-xs">
                <span className="block text-gray-600 mb-1">
                  Payment Method:
                </span>
                <span className="text-gray-900 font-medium">
                  {payment?.method}
                </span>
              </div>
              <div className="text-xs">
                <span className="block text-gray-600 mb-1">Currency:</span>
                <span className="text-gray-900 font-medium">
                  {payment?.currency}
                </span>
              </div>
              <div className="text-xs">
                <span className="block text-gray-600 mb-1">
                  Payment Status:
                </span>
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium uppercase rounded ${getStatusColor(payment?.status || 'pending')}`}
                >
                  {payment?.status}
                </span>
              </div>
              <div className="text-xs">
                <span className="block text-gray-600 mb-1">Payment Date:</span>
                <span className="text-gray-900 font-medium">
                  {formatDate(payment?.paidAt || '')}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-5 border-t border-gray-200 text-gray-600 text-xs">
            <p className="mb-1 font-semibold">Thank you for your business!</p>
            <p className="mb-4">
              For any questions regarding this invoice, please contact our
              support team.
            </p>
            <button
              onClick={() => window.print()}
              className="bg-gray-900 text-white px-5 py-2 text-xs hover:bg-gray-700 transition-colors"
            >
              Print Invoice
            </button>

            <style jsx global>{`
              @media print {
                body * {
                  visibility: hidden;
                }

                #print-area,
                #print-area * {
                  visibility: visible;
                }

                #print-area {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                }
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
