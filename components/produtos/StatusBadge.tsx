import React from 'react'

interface BadgeProps {
    name: string
    color: string
}

const StatusBadge = ({ name, color }: BadgeProps) => (
    <div className={`rounded-full px-8 py-4 text-white ${color}`}>
        {name}
    </div>
)

export default StatusBadge

