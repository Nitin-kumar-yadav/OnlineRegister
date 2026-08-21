import React from 'react'
import heroBg from '../assets/hero.png'
import Card from '../components/Card'

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-cover bg-center bg-black/60 bg-blend-overlay flex items-center justify-center p-8 transition-all duration-500" style={{ backgroundImage: `url(${heroBg})` }}>
            <div className="w-full max-w-7xl text-left flex flex-row gap-8 items-center justify-center flex-wrap">
                <Card />
            </div>
        </div>
    )
}

export default Dashboard