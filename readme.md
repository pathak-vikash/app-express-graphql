## GraphQL Queries
------------

### 1. Find Books

```
{
    books {
        id,
        name,
        genre
    }
}

```

### 2. Get Book

```
{
    book(id: "2") {
        name,
        genre,
        id
    }
}

```

### 3. Get Book with Author

```
{
    book(id: "2") {
        name,
        genre,
        id,
        author {
            id,
            name
        }
    }
}
```

### 4. Find Authors

```
{
    authors {
        id,
        name,
        age
    }
}

```

### 5. Get Author
```
{
   author(id: 2) {
    id,
    name,
    age
  }
}
```

### 6. Get Author with Books

```
{
   author(id: 2) {
    id,
    name,
    age,
    books {
      id,
      name
    }
  }
}
```
