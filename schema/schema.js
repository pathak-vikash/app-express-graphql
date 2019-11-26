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

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
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
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {

                return books.find(x => x.id === args.id);
            }
        }
    }
})

module.exports = new GraphQLSchema ({
    query:RootQuery
})