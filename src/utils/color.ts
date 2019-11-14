import { RGBColor } from 'react-color'
import tinycolor from 'tinycolor2'

export function toRGBColor(value: any): RGBColor {
  if (typeof value === 'string') {
    return tinycolor(value).toRgb()
  } else {
    return value
  }
}

export function toRGBAString(color?: RGBColor): string {
  if (color) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
  } else {
    return ''
  }
}

export function copyRGB(base: RGBColor, rgb: RGBColor): RGBColor {
  return {
    r: rgb.r,
    g: rgb.g,
    b: rgb.b,
    a: base.a,
  }
}

export function darken(color: RGBColor, factor: number): RGBColor {
  return {
    r: color.r * factor,
    g: color.g * factor,
    b: color.b * factor,
    a: color.a,
  }
}
