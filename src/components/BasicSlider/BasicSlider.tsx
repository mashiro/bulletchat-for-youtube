import React from 'react'
import { Slider } from '@material-ui/core'
import { SliderProps } from '@material-ui/core/Slider'

export type BasicSliderProps = SliderProps & {
  min: number
  max: number
}

export const BasicSlider: React.FC<BasicSliderProps> = (props) => {
  const marks = [{ value: props.min, label: `${props.min}` }, { value: props.max, label: `${props.max}` }]
  return <Slider marks={marks} valueLabelDisplay="auto" {...props} />
}
