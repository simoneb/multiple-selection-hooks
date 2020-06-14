import { useMemo } from 'react'
import get from 'lodash/get'
import set from 'lodash/set'

import { getAllowedValues, getOptions } from './utils'

export default function usePreselection(data, keys, preselection) {
  return useMemo(
    () =>
      getOptions(data, keys, {}).reduce((acc, option, index) => {
        const allowedValues = getAllowedValues(data, keys, acc, option, index)
        const tentativeValue = get(preselection, option.name)

        return set(
          acc,
          option.name,
          allowedValues.includes(tentativeValue) ? tentativeValue : ''
        )
      }, {}),
    [data, keys, preselection]
  )
}
