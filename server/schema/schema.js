const graphql = require('graphql')
const Book = require("../models/book")
const Author = require("../models/author")

const {makeExecutableSchema} = require("graphql-tools/dist/makeExecutableSchema")

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLNonNull
} = graphql

const typeDefs = `
    type Book {
        id: ID
        name: String!
        genre: String!
        authorId: String!
        author: Author
    }

    type Author {
        id: ID
        name: String!
        age: Int!
        books: [Book]
    }

    type Query {
        books: [Book]
        book(id: ID): Book
        authors: [Author]
        author(id: ID): Author
    }

    type Mutation {
        addBook(name: String!, genre: String!, authorId: String!): Book!
        addAuthor(name: String!, age: Int!): Author!
    }
`;

const resolvers =  {
    Query: {
        books: (parent, args) => {
            return Book.find({});
        },
        book: ({id}, args) => {
            return Book.findById(id);
        },
        authors: (parent, args) => {
            return Author.find({});
        },
        author: (parent, args) => {
            return Author.findById(args.id)
        }
    },
    Book: {
        author: ({authorId}, args) => {
            return Author.findById(authorId);
        }
    },
    Author: {
        books: ({id}, args) => {
            return Book.find({authorId: id})
        }
    },
    Mutation: {
        addAuthor: (parent, args) => {
            let author = new Author ({
                name: args.name,
                age: args.age
            });

            return author.save();
        },
        addBook: (parent, args) => {
            let book = new Book({
                name: args.name,
                genre: args.genre,
                authorId: args.authorId
            })

            return book.save();
        }
    }
};
/*
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.findById(parent.authorId)
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
                return Book.find({authorId: parent.id})
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

                return Book.find({});
            }
        },
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Book.findById(args.id)
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            args: {},
            resolve(parent, args) {

                return Author.find({});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Author.findById(args.id)
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
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
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
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
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

*/

module.exports = new makeExecutableSchema ({
    typeDefs,
    resolvers
})

