import { FormControl, FormControlLabel, FormGroup, Paper, Switch, Tab, Tabs } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React, { useCallback, useEffect, useState } from 'react'
import { useDebounce } from '../../hooks'
import { ChatOptionsPane } from './ChatOptionsPanel'
import { GeneralOptionsPanel } from './GeneralOptionsPanel'
import { locales } from './locales'
import { TabPanel } from './TabPanel'
import { BulletChatAppOptions, defaultBulletChatAppOptions } from './types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: 420,
      height: 420,
      display: 'flex',
      flexGrow: 1,
    },
    tabs: {
      minWidth: 120,
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    panel: {
      flexGrow: 1,
      overflowY: 'auto',
    },
  })
)

export type OptionPageProps = {}

export const OptionPage: React.FC<OptionPageProps> = (props) => {
  const classes = useStyles()
  const [options, setOptions] = useState(defaultBulletChatAppOptions)

  // save and restore options
  useEffect(() => {
    chrome.storage.sync.get(defaultBulletChatAppOptions, (items) => {
      setOptions(items as BulletChatAppOptions)
    })
  }, [])

  useDebounce(
    () => {
      chrome.storage.sync.set(options)
    },
    500,
    [options]
  )

  const updateOptions = useCallback((newOptions: Partial<BulletChatAppOptions>) => {
    setOptions((options) => {
      return { ...options, ...newOptions }
    })

    // sync to content scripts
    chrome.storage.local.set(newOptions)
  }, [])

  const [tabIndex, setTabIndex] = useState(0)

  return (
    <Paper className={classes.paper}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tabIndex}
        onChange={(e, v) => setTabIndex(v)}
        className={classes.tabs}
      >
        <Tab label={locales.general} />
        <Tab label={locales.normal} />
        <Tab label={locales.superchat} />
        <Tab label={locales.moderator} />
      </Tabs>
      <div className={classes.panel}>
        <TabPanel index={0} value={tabIndex}>
          <GeneralOptionsPanel options={options} updateOptions={updateOptions} />
        </TabPanel>
        <TabPanel index={1} value={tabIndex}>
          <ChatOptionsPane
            options={options}
            updateOptions={updateOptions}
            modeOptionKey="normalMode"
            colorOptionKey="normalColor"
            backgroundColorOptionKey="normalBackgroundColor"
            opacityOptionKey="normalOpacity"
            durationOptionKey="normalDuration"
            showIconOptionKey="normalShowIcon"
            showNameOptionKey="normalShowName"
          />
        </TabPanel>
        <TabPanel index={2} value={tabIndex}>
          <ChatOptionsPane
            options={options}
            updateOptions={updateOptions}
            modeOptionKey="superchatMode"
            colorOptionKey="superchatColor"
            backgroundColorOptionKey="superchatBackgroundColor"
            opacityOptionKey="superchatOpacity"
            durationOptionKey="superchatDuration"
            showIconOptionKey="superchatShowIcon"
            showNameOptionKey="superchatShowName"
          >
            <FormControl component="fieldset" fullWidth>
              <FormGroup>
                <FormControlLabel
                  label={locales.usePaidColor}
                  labelPlacement="end"
                  control={
                    <Switch
                      color="primary"
                      checked={options.superchatUsePaidColor}
                      onChange={(event, checked) => updateOptions({ superchatUsePaidColor: checked })}
                    />
                  }
                />
              </FormGroup>
            </FormControl>
          </ChatOptionsPane>
        </TabPanel>
        <TabPanel index={3} value={tabIndex}>
          <ChatOptionsPane
            options={options}
            updateOptions={updateOptions}
            modeOptionKey="moderatorMode"
            colorOptionKey="moderatorColor"
            backgroundColorOptionKey="moderatorBackgroundColor"
            opacityOptionKey="moderatorOpacity"
            durationOptionKey="moderatorDuration"
            showIconOptionKey="moderatorShowIcon"
            showNameOptionKey="moderatorShowName"
          />
        </TabPanel>
      </div>
    </Paper>
  )
}
