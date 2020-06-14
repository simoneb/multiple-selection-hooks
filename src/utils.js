import uniq from 'lodash/uniq'
import filter from 'lodash/filter'
import pick from 'lodash/pick'
import map from 'lodash/map'
import isObject from 'lodash/isObject'
import compact from 'lodash/compact'

export const ANY = '*'

export function getAllowedValues(data, keys, values, option, index) {
  return compact(
    uniq(
      map(
        filter(data, pick(stripFalsyProps(values), keys.slice(0, index))),
        option.name
      )
    )
  )
}

export function getOptions(data, keys, values) {
  return keys
    .map(key => ({
      name: key,
      wildcard: data.some(d => d[key]) && data.some(d => !d[key])
    }))
    .map((option, index) => ({
      ...option,
      values: compact(uniq(map(data, option.name))),
      allowedValues: getAllowedValues(data, keys, values, option, index)
    }))
    .map(option => ({
      ...option,
      values: option.values.concat(option.wildcard ? [ANY] : []),
      allowedValues: option.allowedValues.concat(option.wildcard ? [ANY] : [])
    }))
}

export function stripFalsyProps(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    if (isObject(obj[key])) {
      const result = stripFalsyProps(obj[key])

      if (Object.keys(result).length) {
        return { ...acc, [key]: result }
      }

      return acc
    }

    if (obj[key] && obj[key] !== ANY) {
      return { ...acc, [key]: obj[key] }
    }

    return acc
  }, {})
}
