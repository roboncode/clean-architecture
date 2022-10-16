import { Field, Form, Formik } from 'formik';

import { Link } from 'react-router-dom'
import { ToggleButton } from 'ui'
import { useState } from 'react'

function Signin() {

  const [passwordType, setPasswordType] = useState('password')

  const showHideHandler = (val: boolean) => {
    setPasswordType(val ? 'text' : 'password')
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="card max-w-100 w-full drop-shadow-lg">
        <div className="bg-light-blue-600 text-white w-full flex items-center h-14 p-4 pl-6">
          <div v-if="title" className="text-lg font-medium">
            Sign in
          </div>
          <div className="flex-grow"></div>
        </div>
        <div className="p-4 space-y-4">
          <Formik
            initialValues={{
              name: 'Rob Taylor',
              email: 'roboncode@gmail.com',
              password: 'Welcome@1',
            }}
            onSubmit={async values => {
              await new Promise(r => setTimeout(r, 500))
              alert(JSON.stringify(values, null, 2))
            }}
          >
            <Form className="grid gap-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Field id="email" name="email" placeholder="jane@acme.com" type="email" className="textinput" />

              <label htmlFor="password" className="form-label">
                Password
              </label>

              <div className="relative flex items-center gap-2">
                <Field id="password" name="password" type={passwordType} placeholder="*******" className="textinput" />
                <ToggleButton
                  className="btn btn-icon absolute right-2"
                  trueElement={<span className="i-tabler-eye"></span>}
                  falseElement={<span className="i-tabler-eye-off"></span>}
                  onChange={showHideHandler}
                />
              </div>

              <div className="h-row justify-center">
                <button type="submit" className="btn btn-success">
                  Signin
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      <div className="h-row p-4">
        <div>Not a member?</div>
        <Link to="/signup" className="btn btn-sm btn-base">Login</Link>
      </div>
    </div>
  )
}

export default Signin;