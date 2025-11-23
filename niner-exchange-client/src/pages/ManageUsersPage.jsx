import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchAllUsers } from '../services/adminApi'
import { Search, ArrowLeft, User } from 'lucide-react'

export default function ManageUsersPage() {
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        loadUsers()
    }, [])

    useEffect(() => {
        filterUsers()
    }, [searchTerm, users])

    const loadUsers = async () => {
        try {
            const data = await fetchAllUsers()
            setUsers(data)
            setFilteredUsers(data)
        } catch (error) {
            console.error("Failed to fetch users:", error)
        } finally {
            setLoading(false)
        }
    }

    const filterUsers = () => {
        if (!searchTerm) {
            setFilteredUsers(users)
            return
        }

        const lowerTerm = searchTerm.toLowerCase()
        const filtered = users.filter(user =>
            (user.username && user.username.toLowerCase().includes(lowerTerm)) ||
            (user.email && user.email.toLowerCase().includes(lowerTerm)) ||
            (user.first_name && user.first_name.toLowerCase().includes(lowerTerm)) ||
            (user.last_name && user.last_name.toLowerCase().includes(lowerTerm))
        )
        setFilteredUsers(filtered)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <main className="max-w-7xl mx-auto px-6 py-10">
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/admin')}
                        className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Admin Dashboard
                    </button>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Users</h1>
                    <p className="text-gray-600">View and search all registered users</p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-gray-200">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search users by name, username, or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
                    <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4 grid grid-cols-[auto_2fr_2fr_1fr_1fr] gap-6 items-center">
                        <div className="w-10"></div>
                        <div className="text-sm font-bold text-white uppercase tracking-wider">User</div>
                        <div className="text-sm font-bold text-white uppercase tracking-wider">Email</div>
                        <div className="text-sm font-bold text-white uppercase tracking-wider">Role</div>
                        <div className="text-sm font-bold text-white uppercase tracking-wider">Joined</div>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {loading ? (
                            <div className="p-12 text-center text-gray-500">Loading users...</div>
                        ) : filteredUsers.length === 0 ? (
                            <div className="p-12 text-center text-gray-500">No users found matching your search</div>
                        ) : (
                            filteredUsers.map((user) => (
                                <div
                                    key={user.id}
                                    onClick={() => navigate(`/profile/${user.id}`)}
                                    className="px-6 py-4 grid grid-cols-[auto_2fr_2fr_1fr_1fr] gap-6 items-center hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                                        {user.profile_picture ? (
                                            <img src={user.profile_picture} alt={user.username} className="w-10 h-10 rounded-full object-cover" />
                                        ) : (
                                            <User className="w-5 h-5" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">{user.first_name} {user.last_name}</div>
                                        <div className="text-sm text-gray-500">@{user.username}</div>
                                    </div>
                                    <div className="text-gray-600">{user.email}</div>
                                    <div>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                                            }`}>
                                            {user.role || 'user'}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-500 font-mono">
                                        {new Date(user.date_joined).toLocaleDateString()}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
