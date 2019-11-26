const graphql = require('graphql')

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema

} = graphql

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];

var authors = [
    { name: 'Vikash Pathak', age: 29, id: '1' },
    { name: 'Rajan Kumar', age: 26, id: '2' },
    { name: 'Ravi Heer', age: 27, id: '3'},
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return authors.find(x => x.id === parent.authorId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books.filter(x => x.authorId == parent.id)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType ({
    name: "RootQueryType",
    fields: {
        books: {
            type: new GraphQLList(BookType),
            args: {},
            resolve(parent, args) {

                return books;
            }
        },
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {

                return books.find(x => x.id === args.id);
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            args: {},
            resolve(parent, args) {

                return authors;
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {

                return authors.find(x => x.id === args.id);
            }
        }
    }
})

module.exports = new GraphQLSchema ({
    query:RootQuery
})