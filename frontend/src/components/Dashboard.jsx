import React from 'react'

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-4" style={{ backgroundImage: "url('/hero.png')" }}>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
                <h1 className="text-3xl font-bold text-white mb-4 drop-shadow-md">Dashboard</h1>
                <p className="text-gray-100 mb-8 drop-shadow-sm">Welcome back! Here is your personalized dashboard view.</p>
                <div className="space-y-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full shadow-lg">
                        View Analytics
                    </button>
                    <button className="bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full shadow-lg">
                        Settings
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard