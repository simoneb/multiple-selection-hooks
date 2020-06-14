import React from 'react'
import { Formik } from 'formik'

import MultipleSelection from './MultipleSelection'
import data from './data'
import './styles.css'
import usePreselection from './usePreselection'

export default function App() {
  const initialValues = usePreselection(
    data,
    ['nonExisting', 'a', 'one', 'b', 'nested.prop'],
    { a: '1' }
  )

  return (
    <div className="App">
      <Formik initialValues={{}}>
        <MultipleSelection data={data} />
      </Formik>
    </div>
  )
}
