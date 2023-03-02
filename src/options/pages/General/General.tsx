import React, { useEffect } from 'react'

import SettingsList from './components/SettingsList'
import { useGeneralStore } from './generalStore'

const General: React.FC<{}> = () => {
  const { getGeneralSettings, isLoading } = useGeneralStore()

  useEffect(() => {
    getGeneralSettings()
  }, [])

  if (isLoading) {
    return null
  }

  return <SettingsList />
}

export default General
