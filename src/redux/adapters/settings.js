import { getUnprefixedSettingsKey } from '../../util/settings'

export default function settingsAdapter(data = []) {
  const [key, value] = data
  const unprefixedKey = getUnprefixedSettingsKey(key)
  return { key: unprefixedKey, value }
}
