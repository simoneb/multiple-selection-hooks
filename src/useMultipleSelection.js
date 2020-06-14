import { useMemo } from 'react'
import filter from 'lodash/filter'
import find from 'lodash/find'
import get from 'lodash/get'
import matches from 'lodash/matches'
import { getOptions, stripFalsyProps } from './utils'

export default function useMultipleSelection(
  data,
  keys,
  values,
  setFieldValue,
  handleChange
) {
  return useMemo(() => {
    const options = getOptions(data, keys, values)
      .map((option, index, options) => ({
        ...option,
        field: {
          name: option.name,
          readOnly: option.allowedValues.length === 1,
          disabled:
            // not first option and
            index > 0 &&
            // previous option has value but no selected value
            (options[index - 1].values.length &&
              !get(values, options[index - 1].name)),
          onChange(e) {
            // when changing an option, reset all next options
            options
              .slice(options.indexOf(find(options, { name: option.name })))
              // formik resets a field whose value is undefined
              .forEach(o => setFieldValue(o.name, ''))

            handleChange(e)
          },
        },
      }))
      .map((option, index, options) => ({
        ...option,
        field: {
          ...option.field,
          disabled:
            // already disabled or the previous one is disabled
            option.field.disabled ||
            (index > 0 && options[index - 1].field.disabled),
        },
      }))

    // set any option to the only allowed
    // value if there is only one
    options.forEach(option => {
      if (
        option.allowedValues.length === 1 &&
        get(values, option.name) !== option.allowedValues[0]
      ) {
        console.log(values, option.name, option.allowedValues[0])
        setFieldValue(option.name, option.allowedValues[0])
      }
    })

    const result = filter(data, matches(stripFalsyProps(values)))

    return {
      options,
      result,
    }
  }, [data, keys, values, setFieldValue, handleChange])
}
