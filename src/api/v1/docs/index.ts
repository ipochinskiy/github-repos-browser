export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Github Repos Browser's API",
    version: "v1",
  },
  consumes: "application/json",
  paths: {
    "/api/v1/repositories?username={username}": {
      get: {
        summary: "Fetches non-forked repositories of a user with {username}",
        parameters: [
          {
            in: 'query',
            name: 'username',
            description: 'Name of the user to fetch repositories for',
            schema: {
              type: 'string',
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'List of the users\'s repositories which are not forks',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Repository',
                  },
                },
              },
            },
          },
          406: {
            $ref: '#/components/responses/NotAcceptable',
          },
        },
      }
    },
  },
  components: {
    schemas: {
      Branch: {
        properties: {
          name: {
            type: 'string',
          },
          lastCommitSha: {
            type: 'string',
          },
        },
        example: {
          name: 'extra-sticky',
          lastCommitSha: 'e7e7912165544dbe886d6b2354723d6657d672ec',
        },
      },
      Repository: {
        properties: {
          name: {
            type: 'string',
          },
          ownerLogin: {
            type: 'string',
          },
          branchList: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Branch',
            },
          },
        },
        example: {
          name: 'web-blaster',
          ownerLogin: 'spidey',
          branchList: [
            {
              name: 'extra-sticky',
              lastCommitSha: 'e7e7912165544dbe886d6b2354723d6657d672ec',
            },
            {
              name: 'extra-creamy',
              lastCommitSha: '05532f1f1e0fb5d35155d995fcab6619c47309b3',
            },
          ],
        },
      },
      Error: {
        properties: {
          status: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
        },
      },
    },
    responses: {
      NotAcceptable: {
        description: 'Requested content type is not acceptable',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
    },
  },
};