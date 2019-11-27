const graphql = require('graphql')
const Book = require("../models/book")
const Author = require("../models/author")

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema

} = graphql

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                //return authors.find(x => x.id === parent.authorId)
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
                //return books.filter(x => x.authorId == parent.id)
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

                //return books.find(x => x.id === args.id);
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

                //return authors.find(x => x.id === args.id);
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args){

                console.log(args);

                let author = new Author ({
                    name: args.name,
                    age: args.age
                })

                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorId: {type: GraphQLString}
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })

                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema ({
    query:RootQuery,
    mutation: Mutation
})