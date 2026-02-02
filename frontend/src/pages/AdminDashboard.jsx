import React from 'react'

const AdminDashboard = () => {
    return (
        <div className='h-screen bg-purple-200'>
            <div>
                <h1 className='text-4xl font-bold text-start bg-blue-300 pt-10'>Admin Dashboard</h1>
                <div className='w-100 border p-4'>
                    <div className='flex flex-col gap-2 p-10'>
                        <label>Add The job roles</label>
                        <input
                            type="file"
                            accept='.xlsx , .csv'
                            className='border p-3'
                        />
                    </div>
                    <button className='border p-4'>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
