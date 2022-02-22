import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {environment} from '~environments/environment';

export function apolloClientOptions(httpLink: HttpLink): ApolloClientOptions<unknown> {
  return {
    link: httpLink.create({uri: `//${environment.api.host}:${environment.api.port}/graphql`}),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: apolloClientOptions,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
