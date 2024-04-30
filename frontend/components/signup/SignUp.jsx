import React, { useState } from 'react'

function SignUp() {
 const [formData, setFormData] = useState({
  form_type: 'customer',
  utf8: '✓',
 })

 const handleChange = (event) => {
  const { name, value } = event.target
  setFormData((prevState) => ({
   ...prevState,
   [name]: value,
  }))
 }

 const handleSubmit = (event) => {
  event.preventDefault()
  fetch('/contact#contact_form', {
   method: 'POST',
   headers: {
    'Content-Type': 'application/x-www-form-urlencoded', // or 'application/json' if the server supports it
   },
   body: new URLSearchParams(formData).toString(),
  })
   .then((response) => response.body.getReader().read())
   .then((data) => {
    console.log('Success:', data)
    // Handle success
   })
   .catch((error) => {
    console.error('Error:', error)
    // Handle errors
   })
 }

 return (
  <>
   <form
    onSubmit={handleSubmit}
    id='contact_form'
    acceptCharset='UTF-8'
    className='contact-form'>
    <input
     type='hidden'
     name='form_type'
     value={formData.form_type}
    />
    <input
     type='hidden'
     name='utf8'
     value={formData.utf8}
    />
    <input
     type='email'
     name='contact[email]'
     onChange={handleChange}
    />
    <button type='submit'>Send</button>
    <div></div>
   </form>
  </>
 )
}

export default SignUp
