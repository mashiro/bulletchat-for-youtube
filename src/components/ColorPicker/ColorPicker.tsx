import { Button, createStyles, makeStyles, Theme } from '@material-ui/core'
import React, { CSSProperties, useCallback, useEffect, useState } from 'react'
import { ChromePicker, ColorResult, RGBColor } from 'react-color'
import { toRGBAString } from '../../utils'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      position: 'absolute',
      zIndex: 2,
      marginTop: theme.spacing(1),
    },
    cover: {
      position: 'fixed',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  })
)

export type ColorPickerProps = {
  value: RGBColor
  onChange: (color: RGBColor) => void
}

export const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const styles = useStyles()
  const [show, setShow] = useState(false)
  const [color, setColor] = useState(props.value)
  const onChange = useCallback(
    (value: ColorResult) => {
      setColor(value.rgb)
      props.onChange(value.rgb)
    },
    [props.onChange]
  )

  useEffect(() => {
    setColor(props.value)
  }, [props.value])

  const rgba = toRGBAString(color)
  const buttonStyle: CSSProperties = {
    backgroundColor: rgba,
  }

  return (
    <div>
      <Button
        variant="outlined"
        style={buttonStyle}
        onClick={(e) => {
          setShow((show) => !show)
        }}
      >
        {rgba}
      </Button>
      {show ? (
        <div className={styles.popover}>
          <div className={styles.cover} onClick={() => setShow(false)} />
          <ChromePicker color={color} onChangeComplete={onChange} />
        </div>
      ) : null}
    </div>
  )
}
