# Use Cases

Business rules.

Applies Single Responsibility Principle (SRP) in SOLID

Isolated from the ddteails of implementation of outer layers, such as database

If we do use controllers, they are there to work directly with the Presentation layer...

Example:

```js
type Params = {
  server: Express
  db: DatabasePerisitence
}

const makeUserRoute = ({server, db): Params} => {

  const getUser = makeGetUser({db})

  // Presentation (route) and Controller
  server.get('/users', async (req, res) => {
    const user = await getUser({
      skip: req.skip,
      limit: req.limit,
    })
    res.send(user)
  })
  
}
```
