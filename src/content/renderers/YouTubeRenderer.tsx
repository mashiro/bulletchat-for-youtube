import Emittery from 'emittery'
import React, { ComponentType, CSSProperties } from 'react'
import { RGBColor } from 'react-color'
import ReactDOM from 'react-dom'
import uuid from 'uuid/v4'
import { BulletChatMode, BulletChatOptions } from '../../components/BulletChat'
import { BulletChatApp, BulletChatAppEmitterEvents } from '../../components/BulletChatApp'
import { BulletChatAppOptions, defaultBulletChatAppOptions } from '../../components/OptionsPage'
import { MeasureRect } from '../../hooks'
import { BulletChatOptionCategory } from '../../types'
import { darken, toRGBAString } from '../../utils'
import { YouTubeBulletChatMessage } from '../observers/YouTubeLiveChatObserver'
import { calcFontSize } from '../utils'
import { BulletChatRenderer } from './BulletChatRenderer'
import { createRendererElement } from './createRendererNode'
import classes from './BulletChatRenderer.module.css'
import { isEmpty } from 'lodash'

type ChatOptions = {
  category: BulletChatOptionCategory
  mode: BulletChatMode
  fontSize: number
  duration: number
  color: RGBColor
  backgroundColor: RGBColor
  opacity: number
  showIcon: boolean
  showName: boolean
  usePaidColor?: boolean
}

export class YouTubeRenderer implements BulletChatRenderer {
  private rendererElement: HTMLElement | null = null
  private emitter = new Emittery.Typed<BulletChatAppEmitterEvents>()
  private options: BulletChatAppOptions = defaultBulletChatAppOptions
  private listRect: MeasureRect | null = null

  async init() {
    chrome.storage.onChanged.addListener(this.onChangeOptions)
    chrome.storage.sync.get(defaultBulletChatAppOptions, (items) => {
      this.options = items as BulletChatAppOptions
    })

    const player = await this.findPlayer()
    this.rendererElement = createRendererElement()
    player.appendChild(this.rendererElement)

    this.render()
  }

  finalize(): void {
    chrome.storage.onChanged.removeListener(this.onChangeOptions)
  }

  pushMessage(msg: YouTubeBulletChatMessage) {
    const options = this.getChatOptions(msg)
    const chatOptions: BulletChatOptions = {
      id: uuid(),
      mode: options.mode,
      duration: options.duration,
      Component: this.createChatComponent(msg, options),
    }
    this.emitter.emit('chat', chatOptions)
  }

  private getChatOptions(msg: YouTubeBulletChatMessage): ChatOptions {
    const category = this.getChatOptionCategory(msg)
    switch (category) {
      case 'normal':
        return {
          category: category,
          mode: this.getChatMode(msg),
          fontSize: this.getFontSize(this.options.normalMode),
          duration: this.options.normalDuration,
          color: this.options.normalColor,
          backgroundColor: this.options.normalBackgroundColor,
          opacity: this.options.normalOpacity,
          showIcon: this.options.normalShowIcon,
          showName: this.options.normalShowName,
        }
      case 'superchat':
        const backgroundColor = () => {
          if (this.options.superchatUsePaidColor && msg.paidColor) {
            return { ...msg.paidColor, a: 1.0 }
          }
          return this.options.superchatBackgroundColor
        }
        return {
          category: category,
          mode: this.getChatMode(msg),
          fontSize: this.getFontSize(this.options.superchatMode),
          duration: this.options.superchatDuration,
          color: this.options.superchatColor,
          backgroundColor: backgroundColor(),
          opacity: this.options.superchatOpacity,
          showIcon: this.options.superchatShowIcon,
          showName: this.options.superchatShowName,
          usePaidColor: this.options.superchatUsePaidColor,
        }
      case 'moderator':
        return {
          category: category,
          mode: this.getChatMode(msg),
          fontSize: this.getFontSize(this.options.moderatorMode),
          duration: this.options.moderatorDuration,
          color: this.options.moderatorColor,
          backgroundColor: this.options.moderatorBackgroundColor,
          opacity: this.options.moderatorOpacity,
          showIcon: this.options.moderatorShowIcon,
          showName: this.options.moderatorShowName,
        }
    }
  }

  private getChatOptionCategory(msg: YouTubeBulletChatMessage): BulletChatOptionCategory {
    if (msg.moderator) {
      return 'moderator'
    } else if (msg.paid) {
      return 'superchat'
    }
    return 'normal'
  }

  private getChatMode(msg: YouTubeBulletChatMessage): BulletChatMode {
    const category = this.getChatOptionCategory(msg)
    switch (category) {
      case 'normal':
        return this.options.normalMode
      case 'superchat':
        return this.options.superchatMode
      case 'moderator':
        return this.options.moderatorMode
    }
  }

  private getFontSize(mode: BulletChatMode): number {
    switch (mode) {
      case 'scroll':
        return this.options.scrollFontSize
      case 'top':
        return this.options.topFontSize
      case 'bottom':
        return this.options.bottomFontSize
    }
  }

  private createChatComponent(msg: YouTubeBulletChatMessage, options: ChatOptions): ComponentType {
    const fontSize = `${calcFontSize(this.listRect!!.height, options.fontSize)}px`
    const chatStyle: CSSProperties = {
      fontSize: fontSize,
      lineHeight: fontSize,
      color: toRGBAString(options.color),
      backgroundColor: toRGBAString(options.backgroundColor),
      opacity: options.opacity,
    }
    const iconStyle: CSSProperties = {
      width: fontSize,
      height: fontSize,
    }
    const nameStyle: CSSProperties = {
      color: toRGBAString(darken(options.color, 0.9)),
    }

    return () => (
      <div className={classes.chat} style={chatStyle}>
        <img hidden={!options.showIcon} alt="avatar" src={msg.iconUrl} className={classes.icon} style={iconStyle} />
        {!isEmpty(msg.name) ? (
          <span hidden={!options.showName} className={classes.name} style={nameStyle}>
            {msg.name}
          </span>
        ) : null}
        <span dangerouslySetInnerHTML={{ __html: msg.textHtml }} className={classes.message} />
      </div>
    )
  }

  private onChangeOptions = (changes: { [key: string]: chrome.storage.StorageChange }, namespace: string): void => {
    Object.entries(changes).forEach(([key, change]) => {
      console.log(change)
      const options = this.options as any
      options[key] = change.newValue
    })
  }

  private onChangeListRect = (listRect: MeasureRect) => {
    console.log(listRect)
    this.listRect = listRect
  }

  private render() {
    ReactDOM.render(<BulletChatApp emitter={this.emitter} onChangeRect={this.onChangeListRect} />, this.rendererElement)
  }

  private findPlayer(): Promise<HTMLElement> {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        const el = document.querySelector('#movie_player')
        if (el != null) {
          clearTimeout(timer)
          resolve(el as HTMLElement)
        }
      }, 1000)
    })
  }
}
