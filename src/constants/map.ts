export const MAP_DEFAULT_CENTER: [number, number] = [55.75, 37.62]
export const MAP_DEFAULT_ZOOM = 4
export const MAP_SINGLE_ZOOM = 12
export const MAP_FIT_PADDING: [number, number] = [24, 24]
export const MAP_FIT_MAX_ZOOM = 12
export const MAP_MIN_HEIGHT = 300
export const MAP_DEFAULT_HEIGHT = 400

export const TILE_LAYER_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
export const TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

export const MARKER_ICON = {
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41] as [number, number],
  iconAnchor: [12, 41] as [number, number],
  popupAnchor: [1, -34] as [number, number],
  shadowSize: [41, 41] as [number, number],
}
