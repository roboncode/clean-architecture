import { useParams, useSearchParams } from 'react-router-dom'

function Child() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  console.log(searchParams.get('message'))
  
  return (
    <div className="p-4 bg-yellow-300">
      Query: {searchParams.get('message')}
      <h1>I am a child component {id}</h1>
    </div>
  )
}

export default Child
