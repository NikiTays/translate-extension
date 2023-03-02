import React from 'react'
import { useGeneralStore } from '../../generalStore'

const SettingsList: React.FC<{}> = () => {
  const { generalSettings } = useGeneralStore()

  return <div>general in progress</div>
}

export default SettingsList
