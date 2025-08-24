import React from 'react'

interface BadgeProps {
    name: string
}

const StatusBadge = ({ name }: BadgeProps) => {
    let color = ''
    switch (name) {
        case 'Anunciado':
            color = 'bg-blue-dark'
            break
        case 'Vendido':
            color = 'bg-success'
            break
        case 'Cancelado':
            color = 'bg-gray-300'
            break
        default:
            color = 'bg-gray-400'
    }

    return (
        <div className={`text-xs rounded-full px-2 py-1 text-white ${color}`}>
            {name}
        </div>
    )
}

export default StatusBadge

