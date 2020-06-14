import React from 'react'
import { Form, Field, useFormikContext } from 'formik'

import useMultipleSelection from './useMultipleSelection'

export default function MultipleSelection({ data }) {
  const { values, setFieldValue, handleChange } = useFormikContext()
  const { options, result } = useMultipleSelection(
    data,
    ['nonExisting', 'a', 'one', 'b', 'nested.prop'],
    values,
    setFieldValue,
    handleChange
  )

  return (
    <div style={{ display: 'flex' }}>
      <Form>
        {options
          // this avoids rendering options which have no values to select from
          .filter(o => o.values.length)
          .map(option => (
            <div key={option.name}>
              {option.field.readOnly ? (
                <Field {...option.field} />
              ) : (
                <Field as="select" {...option.field}>
                  <option value="">Select a value for {option.name}</option>
                  {option.allowedValues.map(value => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Field>
              )}
            </div>
          ))}
        <p>Form values:</p>
        <pre>{JSON.stringify(values, null, 2)}</pre>
        <p>Result:</p>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </Form>
      <div style={{ marginLeft: 20 }}>
        <div>Options:</div>
        <pre>{JSON.stringify(options, null, 2)}</pre>
      </div>
    </div>
  )
}
