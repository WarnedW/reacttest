import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { vehicleCreateFormSchema } from '@/components/VehicleForm/vehicleFormSchema'
import type { VehicleCreatePayload } from '@/types'

const initial: VehicleFormState = {
  name: '',
  model: '',
  year: String(new Date().getFullYear()),
  color: '',
  price: '',
  latitude: '',
  longitude: '',
}

interface VehicleFormState {
  name: string
  model: string
  year: string
  color: string
  price: string
  latitude: string
  longitude: string
}

export function useVehicleForm(
  open: boolean,
  onSubmit: (data: VehicleCreatePayload) => void
) {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (open) {
      setForm(initial)
      setErrors({})
    }
  }, [open])

  const handleChange = useCallback((field: keyof VehicleFormState) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }, [])

  const handleSubmit = useCallback(() => {
    const payload = {
      name: form.name.trim(),
      model: form.model.trim(),
      year: form.year === '' ? NaN : Number(form.year),
      color: form.color.trim(),
      price: form.price === '' ? NaN : Number(form.price),
      latitude: form.latitude === '' ? undefined : Number(form.latitude),
      longitude: form.longitude === '' ? undefined : Number(form.longitude),
    }

    const result = vehicleCreateFormSchema.safeParse(payload)

    if (result.success) {
      onSubmit(result.data)
      return
    }

    const fieldErrors: Record<string, string> = {}
    for (const [key, messages] of Object.entries(result.error.flatten().fieldErrors)) {
      const msg = messages?.[0]
      if (msg) fieldErrors[key] = msg
    }
    setErrors(fieldErrors)
  }, [form, onSubmit])

  const canSubmit = form.name.trim() !== '' && form.model.trim() !== ''

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
    canSubmit,
  }
}
