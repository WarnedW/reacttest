import { useEffect, useState } from 'react'

import type { Vehicle, VehicleUpdatePayload } from '@/types'

export function useEditVehicle(
  vehicle: Vehicle | undefined,
  onSave: (id: number, data: VehicleUpdatePayload) => void
) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => {
    if (vehicle) {
      setName(vehicle.name ?? '')
      setPrice(String(vehicle.price ?? ''))
    } else {
      setName('')
      setPrice('')
    }
  }, [vehicle])

  const handleSave = () => {
    if (vehicle?.id != null) {
      onSave(vehicle.id, { name: name.trim(), price: Number(price) || 0 })
    }
  }

  return {
    name,
    setName,
    price,
    setPrice,
    handleSave,
  }
}
