import React, { ChangeEvent } from 'react'
import Slider, { SliderProps } from '@material-ui/core/Slider'

export type BasicSliderProps = Omit<SliderProps, 'onChange'> & {
  min: number
  max: number
  onChange: (event: ChangeEvent<{}>, value: number | number[]) => void
}

export const BasicSlider: React.FC<BasicSliderProps> = (props) => {
  const marks = [
    { value: props.min, label: `${props.min}` },
    { value: props.max, label: `${props.max}` },
  ]
  return <Slider marks={marks} valueLabelDisplay="auto" {...props} />
}
