import { Box, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch } from '@material-ui/core'
import React from 'react'
import { toRGBColor } from '../../utils'
import { BasicSlider } from '../BasicSlider'
import { ColorPicker } from '../ColorPicker/ColorPicker'
import { locales } from './locales'
import { BulletChatAppOptions, OptionsPanelProps } from './types'
import { getFirstValue } from './utils'

type ChatOptionKey = keyof BulletChatAppOptions

export type ChatOptionsPanelProps = OptionsPanelProps & {
  modeOptionKey: ChatOptionKey
  colorOptionKey: ChatOptionKey
  backgroundColorOptionKey: ChatOptionKey
  opacityOptionKey: ChatOptionKey
  durationOptionKey: ChatOptionKey
  showIconOptionKey: ChatOptionKey
  showNameOptionKey: ChatOptionKey
}

export const ChatOptionsPane: React.FC<ChatOptionsPanelProps> = ({ options, updateOptions, ...props }) => {
  return (
    <>
      <FormControl fullWidth margin="dense">
        <InputLabel shrink>{locales.position}</InputLabel>
        <Box marginTop={2}>
          <Select
            value={options[props.modeOptionKey]}
            onChange={(e) => updateOptions({ [props.modeOptionKey]: e.target.value })}
          >
            <MenuItem value="scroll">{locales.scroll}</MenuItem>
            <MenuItem value="bottom">{locales.bottom}</MenuItem>
          </Select>
        </Box>
      </FormControl>

      <FormControl fullWidth margin="dense">
        <InputLabel shrink>{locales.color}</InputLabel>
        <Box marginTop={2}>
          <ColorPicker
            value={toRGBColor(options[props.colorOptionKey])}
            onChange={(value) => updateOptions({ [props.colorOptionKey]: value })}
          />
        </Box>
      </FormControl>

      <FormControl fullWidth margin="dense">
        <InputLabel shrink>{locales.backgroundColor}</InputLabel>
        <Box marginTop={2}>
          <ColorPicker
            value={toRGBColor(options[props.backgroundColorOptionKey])}
            onChange={(value) => updateOptions({ [props.backgroundColorOptionKey]: value })}
          />
        </Box>
      </FormControl>

      <FormControl fullWidth margin="dense">
        <InputLabel shrink>{locales.opacity}</InputLabel>
        <Box marginTop={2}>
          <BasicSlider
            min={0}
            max={1}
            step={0.01}
            value={options[props.opacityOptionKey] as number}
            onChange={(event, value) => updateOptions({ [props.opacityOptionKey]: getFirstValue(value) })}
          />
        </Box>
      </FormControl>

      <FormControl fullWidth margin="dense">
        <InputLabel shrink>{locales.duration}</InputLabel>
        <Box marginTop={2}>
          <BasicSlider
            min={1000}
            max={30000}
            step={100}
            value={options[props.durationOptionKey] as number}
            onChange={(event, value) => updateOptions({ [props.durationOptionKey]: getFirstValue(value) })}
          />
        </Box>
      </FormControl>

      <FormControl component="fieldset" fullWidth>
        <FormGroup>
          <FormControlLabel
            label={locales.showIcon}
            labelPlacement="end"
            control={
              <Switch
                color="primary"
                checked={options[props.showIconOptionKey] as boolean}
                onChange={(event, checked) => updateOptions({ [props.showIconOptionKey]: checked })}
              />
            }
          />

          <FormControlLabel
            label={locales.showName}
            labelPlacement="end"
            control={
              <Switch
                color="primary"
                checked={options[props.showNameOptionKey] as boolean}
                onChange={(event, checked) => updateOptions({ [props.showNameOptionKey]: checked })}
              />
            }
          />
        </FormGroup>
      </FormControl>
      {props.children}
    </>
  )
}
