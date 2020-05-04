import React from 'react'
import { Box, FormControl, InputLabel, Typography } from '@material-ui/core'
import { BasicSlider } from '../BasicSlider'
import { locales } from './locales'
import { OptionsPanelProps } from './types'
import { getFirstValue } from './utils'

export type GeneralOptionsPanelProps = OptionsPanelProps & {}

export const GeneralOptionsPanel: React.FC<GeneralOptionsPanelProps> = ({ options, updateOptions }) => {
  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        {locales.fontSize}
      </Typography>

      <FormControl fullWidth margin="dense">
        <InputLabel shrink>{locales.scroll}</InputLabel>
        <Box marginTop={2}>
          <BasicSlider
            min={1}
            max={20}
            step={0.1}
            value={options.scrollFontSize}
            onChange={(event, value) => updateOptions({ scrollFontSize: getFirstValue(value) })}
          />
        </Box>
      </FormControl>

      {/*<FormControl fullWidth margin="dense">*/}
      {/*  <InputLabel shrink>{locales.top}</InputLabel>*/}
      {/*  <Box marginTop={2}>*/}
      {/*    <BasicSlider*/}
      {/*      min={1}*/}
      {/*      max={20}*/}
      {/*      step={0.1}*/}
      {/*      value={options.topFontSize}*/}
      {/*      onChange={(event, value) => updateOptions({ topFontSize: getFirstValue(value) })}*/}
      {/*    />*/}
      {/*  </Box>*/}
      {/*</FormControl>*/}

      <FormControl fullWidth margin="dense">
        <InputLabel shrink>{locales.bottom}</InputLabel>
        <Box marginTop={2}>
          <BasicSlider
            min={1}
            max={20}
            step={0.1}
            value={options.bottomFontSize}
            onChange={(event, value) => updateOptions({ bottomFontSize: getFirstValue(value) })}
          />
        </Box>
      </FormControl>
    </>
  )
}
