import {environment} from './environments';
import {ApolloServer} from 'apollo-server-fastify';
import {ApolloServerPluginDrainHttpServer} from 'apollo-server-core';
import {ApolloServerPlugin} from 'apollo-server-plugin-base';
import {GraphQLServerListener} from 'apollo-server-plugin-base/src';
import fastify, {FastifyInstance} from 'fastify';
import {schema} from './graphql';
import {db} from './data';

function fastifyAppClosePlugin(app: FastifyInstance): ApolloServerPlugin {
  return {
    async serverWillStart(): Promise<GraphQLServerListener> {
      return {
        async drainServer(): Promise<void> {
          // Close server connection
          await app.close();
          // Close db connection
          await db.close();
        },
      };
    },
  };
}

const bootstrapApplication = async (): Promise<void> => {
  console.log(environment);
  // Synchronize all defined data to the db
  await db.sync();

  // Bootstrap apollo & app server only if db connection was successfully established
  const app = fastify();
  // https://www.apollographql.com/docs/apollo-server/integrations/middleware/#apollo-server-fastify
  const server = new ApolloServer({
    schema,
    plugins: [fastifyAppClosePlugin(app), ApolloServerPluginDrainHttpServer({httpServer: app.server})],
    // TODO parse & save token to context
  });

  await server.start();
  app.register(server.createHandler());

  await app.listen(4000);
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

void bootstrapApplication();
