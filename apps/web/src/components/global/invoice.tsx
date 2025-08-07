import React from 'react';

const Invoice = () => {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md border border-gray-200 text-gray-800 font-sans">
      <h1 className="text-3xl font-bold mb-6">Invoice No: 1470</h1>

      <div className="mb-6 space-y-4">
        <div>
          <p className="font-semibold">From:</p>
          <p>
            Neyamot Enterprise
            <br />
            Ka-124, Darjibarir Moor, Uttarpara, Khilkhet, Dhaka-1229, Bangladesh
            <br />
            Phone: +88 09677220022, +88 01820020022
            <br />
            Email:&apos; &apos;
            <a
              href="mailto:support@neyamotenterprise.com"
              className="text-blue-600"
            >
              support@neyamotenterprise.com
            </a>
            <br />
            Website:&apos; &apos;
            <a
              href="https://www.neyamotenterprise.com/"
              className="text-blue-600"
            >
              neyamotenterprise.com
            </a>
          </p>
        </div>

        <div>
          <p className="font-semibold">To:</p>
          <p>
            Connect Bangla Limited
            <br />
            Bangla TV, 83 Shiddheswari Road, Mouchak, Ramna
            <br />
            Phone: 8801713006500
            <br />
            Email:&apos; &apos;
            <a href="mailto:samad.haque@gmail.com" className="text-blue-600">
              samad.haque@gmail.com
            </a>
          </p>
        </div>

        <div>
          <p>
            <strong>Date of Invoice:</strong> 18-05-2025 06:47:36
          </p>
          <p>
            <strong>Due Date:</strong> 18-05-2025 06:47:35
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Unit Price</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">
                Monthly Recurring Charge for IP PBX
                <br />
                IPTN 09613241002, Billing Month May-2025
                <br />
                Today&apos;s rest amount TK 0.00
              </td>
              <td className="border px-4 py-2">TK 600.00</td>
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">TK 600.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 space-y-2 text-right font-semibold">
        <p>Subtotal: TK 600.00</p>
        <p>VAT (0%): TK 0.00</p>
        <p>Grand Total: TK 600.00</p>
        <p>Paid Amount: TK 600.00</p>
        <p>Total Due: TK 0.00</p>
      </div>

      <div className="mt-10 text-sm text-gray-600">
        <p>Thank you for being with us!</p>
        <p>If you have any further questions, please contact us.</p>
      </div>
    </div>
  );
};

export default Invoice;