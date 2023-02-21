 


 2. Tìm 1 quyển sách theo _id

 ```c
 Query:
 
 db.books.find({ "_id": ObjectId("63f3910b9cee451249ae4c3c")});
 ```
 ```c
 Result:

{
  _id: ObjectId("63f3910b9cee451249ae4c3c"),
  title: 'The Lord of the Rings',
  author: 'J.R.R. Tolkien',
  publication_date: '1954-07-29',
  pages: 1178,
  genres: [
    'Fantasy',
    'Adventure'
  ],
  publisher: {
    name: 'George Allen & Unwin',
    location: 'London, UK'
  }
}
 ```

 3. Thêm 1 quyển sách mới (insert toàn bộ thông tin)

  ```c
 Query:
 
 db.books.insertOne({ 
  title: 'Ring abc',
  author: ' Tolkienabc',
  publication_date: '1958-07-79',
  pages: 78,
  genres: [
    'Fantasyabc',
    'Adventureabc'
  ],
  publisher: {
    name: 'George Allen & Unwin abc',
    location: 'London, UK abc'
  }})
 ```

 ```c
 Result:

{
  acknowledged: true,
  insertedId: ObjectId("63f487a058005fbbc2af2a66")
}
 ```

 4. Tìm 1 quyển sách có lớn hơn 400 trang và đúng 2 thể loại

  ```c
 Query:
 
db.books.find({ pages: {$gt: 400}, genres: {$size: 2}})
 ```

 ```c
 Result:

 {
  _id: ObjectId("63f3910b9cee451249ae4c3b"),
  title: 'One Hundred Years of Solitude',
  author: 'Gabriel García Márquez',
  publication_date: '1967-06-01',
  pages: 417,
  genres: [
    'Novel',
    'Magic realism'
  ],
  publisher: {
    name: 'Editorial Sudamericana',
    location: 'Buenos Aires, Argentina'
  }
}
{
  _id: ObjectId("63f3910b9cee451249ae4c3c"),
  title: 'The Lord of the Rings',
  author: 'J.R.R. Tolkien',
  publication_date: '1954-07-29',
  pages: 1178,
  genres: [
    'Fantasy',
    'Adventure'
  ],
  publisher: {
    name: 'George Allen & Unwin',
    location: 'London, UK'
  }
}
 ```

 5. Update thông tin của quyển sách có title là "One Hundred Years Of Solitude"
- publisher_date
- genres
- Publisher

```c
Query:
db.books.updateOne({title: "One Hundred Years of Solitude"}, {$set: {publication_date: "2002-7-18", genres: ["Novel"], "publisher.name": "Hoang Vu", "publisher.location": "HN, VN"}})

```

```c
Result:

{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}

```
6. Delete những quyển sách xuất bản trước năm 1967

```c
Query:

db.books.deleteMany({"publication_date": { $lt: ("1967-01-01")}})


```

```c
Result:

{
  acknowledged: true,
  deletedCount: 6
}
```