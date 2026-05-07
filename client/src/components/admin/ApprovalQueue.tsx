import React, { useState } from 'react';

const mockData = [
  { id: 1, user: 'JohnDoe', amount: 500, ref: 'REF123', date: '2023-10-27 14:32', status: 'pending', type: 'deposit' },
  { id: 2, user: 'JaneSmith', amount: 1500, ref: 'REF456', date: '2023-10-27 15:10', status: 'pending', type: 'withdrawal' },
];

const ApprovalQueue = () => {
  const [activeTab, setActiveTab] = useState('deposit');
  const [data, setData] = useState(mockData);
  const [rejectModal, setRejectModal] = useState<{isOpen: boolean, id: any}>({ isOpen: false, id: null });
  const [rejectReason, setRejectReason] = useState('');
  const [selectedIds, setSelectedIds] = useState(new Set());

  const filteredData = data.filter(d => d.type === activeTab);

  const handleApprove = (id: any) => {
    setData(data.filter(d => d.id !== id));
  };

  const handleBulkApprove = () => {
    setData(data.filter(d => !selectedIds.has(d.id)));
    setSelectedIds(new Set());
  };

  const handleReject = () => {
    if (rejectModal.id) {
      setData(data.filter(d => d.id !== rejectModal.id));
    }
    setRejectModal({ isOpen: false, id: null });
    setRejectReason('');
  };

  const toggleSelect = (id: any) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Approval Queue</h2>

      <div className="flex gap-4 mb-6 border-b border-gray-700">
        <button
          className={`pb-2 px-4 ${activeTab === 'deposit' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-gray-400'}`}
          onClick={() => setActiveTab('deposit')}
        >
          Pending Deposits
        </button>
        <button
          className={`pb-2 px-4 ${activeTab === 'withdrawal' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-gray-400'}`}
          onClick={() => setActiveTab('withdrawal')}
        >
          Pending Withdrawals
        </button>
      </div>

      <div className="mb-4">
        <button
          onClick={handleBulkApprove}
          disabled={selectedIds.size === 0}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded text-sm font-bold"
        >
          Bulk Approve Selected ({selectedIds.size})
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-gray-900 text-xs uppercase">
            <tr>
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedIds(new Set(filteredData.map(d => d.id)));
                    } else {
                      setSelectedIds(new Set());
                    }
                  }}
                  checked={selectedIds.size === filteredData.length && filteredData.length > 0}
                />
              </th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">Requested At</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No pending {activeTab}s.
                </td>
              </tr>
            ) : (
              filteredData.map(row => (
                <tr key={row.id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(row.id)}
                      onChange={() => toggleSelect(row.id)}
                    />
                  </td>
                  <td className="px-4 py-3 text-white">{row.user}</td>
                  <td className="px-4 py-3 font-mono text-green-400">${row.amount}</td>
                  <td className="px-4 py-3 font-mono text-xs">{row.ref}</td>
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => handleApprove(row.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => setRejectModal({ isOpen: true, id: row.id })}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Reject Modal */}
      {rejectModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 w-96">
            <h3 className="text-xl font-bold text-white mb-4">Reject {activeTab}</h3>
            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-2">Reason</label>
              <select className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white mb-2">
                <option>Invalid Documentation</option>
                <option>Suspicious Activity</option>
                <option>Other</option>
              </select>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Additional details..."
                className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white h-24"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRejectModal({ isOpen: false, id: null })}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalQueue;
