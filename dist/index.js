import { createServer } from 'node:http';
import { Neo4jGraphQL } from "@neo4j/graphql";
import { createYoga } from 'graphql-yoga';
import neo4j from "neo4j-driver";
import { readFileSync } from "fs";
// Read the schema from the file
const typeDefs = readFileSync('schema.graphql', 'utf8');
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'alex-nixon-politic-chariot-multi-3818'));
const neo4jGraphQL = new Neo4jGraphQL({
    typeDefs,
    driver,
});
const schema = await neo4jGraphQL.getSchema();
function main() {
    const yoga = createYoga({ schema });
    const server = createServer(yoga);
    server.listen(4000, () => {
        console.log(`🚀  Server ready at  http://localhost:4000/graphql`);
    });
}
main();
// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
// import { Neo4jGraphQL } from "@neo4j/graphql";
// import neo4j from "neo4j-driver";
// import { readFileSync } from "fs";
// // Read the schema from the file
// const typeDefs = readFileSync('schema.graphql', 'utf8');
// const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'alex-nixon-politic-chariot-multi-3818'));
// const neo4jGraphQL = new Neo4jGraphQL({
//   typeDefs,
//   driver,
// })
// const schema = await neo4jGraphQL.getSchema();
// console.log(schema)
// const server = new ApolloServer({
//   schema,
// });
// const { url } = await startStandaloneServer(server);
// console.log(`🚀  Server ready at ${url}`);
