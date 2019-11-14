import { RGBColor } from 'react-color'
import { BulletChatMode } from '../BulletChat'

export type BulletChatAppOptions = {
  // font size
  scrollFontSize: number
  topFontSize: number
  bottomFontSize: number

  // normal
  normalMode: BulletChatMode
  normalColor: RGBColor
  normalBackgroundColor: RGBColor
  normalDuration: number
  normalOpacity: number
  normalShowIcon: boolean
  normalShowName: boolean

  // superchat
  superchatMode: BulletChatMode
  superchatColor: RGBColor
  superchatBackgroundColor: RGBColor
  superchatDuration: number
  superchatOpacity: number
  superchatShowIcon: boolean
  superchatShowName: boolean
  superchatUsePaidColor: boolean

  // moderator
  moderatorMode: BulletChatMode
  moderatorColor: RGBColor
  moderatorBackgroundColor: RGBColor
  moderatorDuration: number
  moderatorOpacity: number
  moderatorShowIcon: boolean
  moderatorShowName: boolean
}

export const defaultBulletChatAppOptions: BulletChatAppOptions = {
  scrollFontSize: 5,
  topFontSize: 6,
  bottomFontSize: 6,

  normalMode: 'scroll',
  normalColor: { r: 255, g: 255, b: 255, a: 1.0 },
  normalBackgroundColor: { r: 255, g: 255, b: 255, a: 0.0 },
  normalDuration: 7000,
  normalOpacity: 1,
  normalShowIcon: true,
  normalShowName: false,

  superchatMode: 'scroll',
  superchatColor: { r: 255, g: 255, b: 255, a: 1.0 },
  superchatBackgroundColor: { r: 255, g: 255, b: 255, a: 0.0 },
  superchatDuration: 7000,
  superchatOpacity: 1,
  superchatShowIcon: true,
  superchatShowName: true,
  superchatUsePaidColor: true,

  moderatorMode: 'scroll',
  moderatorColor: { r: 255, g: 255, b: 255, a: 1.0 },
  moderatorBackgroundColor: { r: 100, g: 149, b: 237, a: 1.0 },
  moderatorDuration: 14000,
  moderatorOpacity: 1,
  moderatorShowIcon: true,
  moderatorShowName: true,
}

export type OptionsPanelProps = {
  options: BulletChatAppOptions
  updateOptions: (newOptions: Partial<BulletChatAppOptions>) => void
}
