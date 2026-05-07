import React, { useState } from 'react';

const Search = (props: any) => <span {...props}>🔍</span>;
const ChevronDown = (props: any) => <span {...props}>🔽</span>;
const ChevronUp = (props: any) => <span {...props}>🔼</span>;

const mockUsers = [
  { id: 1, username: 'PokerKing', phone: '+1234567890', balance: 5400, premium: true, lastActive: '2 mins ago' },
  { id: 2, username: 'RiverRat', phone: '+1987654321', balance: 120, premium: false, lastActive: '1 hr ago' },
];

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedUser, setExpandedUser] = useState<any>(null);

  const toggleExpand = (id: any) => {
    setExpandedUser(expandedUser === id ? null : id);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">User Management</h2>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search by username or phone number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-gray-900 text-xs uppercase">
            <tr>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Balance</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last Active</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map(user => (
              <React.Fragment key={user.id}>
                <tr className="border-b border-gray-700 hover:bg-gray-700 cursor-pointer" onClick={() => toggleExpand(user.id)}>
                  <td className="px-4 py-3 text-white font-bold">{user.username}</td>
                  <td className="px-4 py-3">{user.phone}</td>
                  <td className="px-4 py-3 text-green-400">${user.balance}</td>
                  <td className="px-4 py-3">
                    {user.premium ? <span className="text-yellow-400 text-xs">Premium</span> : <span className="text-gray-500 text-xs">Standard</span>}
                  </td>
                  <td className="px-4 py-3">{user.lastActive}</td>
                  <td className="px-4 py-3 text-right">
                    {expandedUser === user.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </td>
                </tr>
                {expandedUser === user.id && (
                  <tr className="bg-gray-900 border-b border-gray-700">
                    <td colSpan={6} className="p-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 space-y-4">
                          <div>
                            <h4 className="text-white font-bold mb-2">Recent Transactions</h4>
                            <p className="text-xs text-gray-500">Deposit: $500 (2 days ago)</p>
                            <p className="text-xs text-gray-500">Withdrawal: $100 (1 week ago)</p>
                          </div>
                          <div>
                            <h4 className="text-white font-bold mb-2">Security</h4>
                            <p className="text-xs text-gray-500">Last IP: 192.168.1.1</p>
                            <p className="text-xs text-green-500">No collusion flags</p>
                          </div>
                        </div>
                        <div className="space-y-2 flex flex-col justify-start items-end">
                          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs">Adjust Balance</button>
                          <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded text-xs">Force Logout</button>
                          <button className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-xs">Restrict Account</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserSearch;
