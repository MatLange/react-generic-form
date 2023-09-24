import React, { FormEvent, useState } from 'react'
 
export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    hobby: '',
  })
  const [submitted, setSubmitted] = useState(false);  

  // Function to handle form input changes
  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }
  

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null) // Clear previous errors when a new request starts
 
    try {
      const formData = new FormData(event.currentTarget)
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData,
      })
 
      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.')
      }
 
      // Handle response if necessary
      const data = await response.json()
      // ...
    } catch (error: any) {
      // Capture the error message to display to the user
      setError(error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
 
  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
        <label className="text-xl font-bold">Name</label>
        <input
          className="border-2 border-gray-400 rounded-lg p-2 m-2"
          type="text"
          name="name"
          value={formData.name}
          placeholder='Enter your name'
          onChange={handleChange}
        />
        <label className="text-xl font-bold">Age</label>
        <input
          className="border-2 border-gray-400 rounded-lg p-2 m-2"
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <label className="text-xl font-bold">Hobby</label>
        <input
          className="border-2 border-gray-400 rounded-lg p-2 m-2"
          type="text"
          name="hobby"
          value={formData.hobby}
          onChange={handleChange}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
      </form>

{/*       <form onSubmit={onSubmit}>
        <input type="text" name="name" />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
 */}    </div>
  )
}
