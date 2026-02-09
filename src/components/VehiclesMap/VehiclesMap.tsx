import 'leaflet/dist/leaflet.css'

import { Box, Paper, Typography } from '@mui/material'
import L from 'leaflet'
import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import {
  MAP_DEFAULT_CENTER,
  MAP_DEFAULT_ZOOM,
  MAP_FIT_MAX_ZOOM,
  MAP_FIT_PADDING,
  MAP_MIN_HEIGHT,
  MAP_SINGLE_ZOOM,
  MARKER_ICON,
  TILE_LAYER_ATTRIBUTION,
  TILE_LAYER_URL,
} from '@/constants'
import type { Vehicle } from '@/types'
import { formatPrice } from '@/utils'
import { getVehiclesWithCoords, type VehicleWithCoords } from '@/utils'

L.Marker.prototype.options.icon = L.icon(MARKER_ICON)

function MapFitBounds({ vehicles }: { vehicles: VehicleWithCoords[] }) {
  const map = useMap()
  const coordsKey = vehicles.map((v) => `${v.latitude},${v.longitude}`).join('|')

  useEffect(() => {
    if (vehicles.length === 0) return
    if (vehicles.length === 1) {
      map.setView([vehicles[0].latitude, vehicles[0].longitude], MAP_SINGLE_ZOOM)
      return
    }
    const bounds = L.latLngBounds(
      vehicles.map((v) => [v.latitude, v.longitude] as L.LatLngTuple)
    )
    map.fitBounds(bounds, {
      padding: MAP_FIT_PADDING,
      maxZoom: MAP_FIT_MAX_ZOOM,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- coordsKey достаточен для смены координат
  }, [map, coordsKey])

  return null
}

export interface VehiclesMapProps {
  vehicles: Vehicle[]
  height?: number
}

export function VehiclesMap({ vehicles, height = 400 }: VehiclesMapProps) {
  const withCoords = getVehiclesWithCoords(vehicles)

  return (
    <Paper sx={{ overflow: 'hidden', height }}>
      <Box sx={{ height: '100%', minHeight: MAP_MIN_HEIGHT }}>
        <MapContainer
          center={MAP_DEFAULT_CENTER}
          zoom={MAP_DEFAULT_ZOOM}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom
        >
          <TileLayer attribution={TILE_LAYER_ATTRIBUTION} url={TILE_LAYER_URL} />
          <MapFitBounds vehicles={withCoords} />
          {withCoords.map((v) => (
            <Marker key={v.id} position={[v.latitude, v.longitude]}>
              <Popup>
                <Typography variant="subtitle2">
                  {v.name} {v.model}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Год: {v.year} · Цена: {formatPrice(v.price)}
                </Typography>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>
    </Paper>
  )
}
