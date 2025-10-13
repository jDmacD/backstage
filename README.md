# [Backstage](https://backstage.io)

This is your newly scaffolded Backstage App, Good Luck!

To start the app, run:

```sh
yarn install
yarn start
```
# TODO

## Custom Entity Provider

- https://backstage.io/docs/features/software-catalog/external-integrations/#custom-entity-providers

I can use steampipe to populate the catalog using postgres queries.

```sql
SELECT 
  jsonb_build_object(
    'apiVersion', 'backstage.io/v1alpha1',
    'kind', 'Component',
    'metadata', jsonb_build_object(
      'name', name,
      'namespace', destination::jsonb ->> 'namespace',
      'annotations', jsonb_build_object(
        'argocd/app-name', name,
        'backstage.io/kubernetes-id', name
      ),
    )
    'spec', jsonb_build_object(
      'type', 'website',
      'lifecycle', 'production',
      'owner', 'user:default/jmacdonald_jtec.xyz',
      'system', 'turing',
      'dependsOn', json_build_array(
        'resource:turing'
      )
    )
  ) as result
FROM 
  kubernetes_application
```
The configuration would look something like

```yaml
catalog:
  providers:
    postgres-provider:
      schedule:
        initialDelay: { seconds: 30 }
        frequency: { hours: 1 }
        timeout: { minutes: 50 }
    entities:
      - name: Argo CD Applications
        connection:
          host: ${POSTGRES_HOST}
          port: ${POSTGRES_PORT}
          user: ${POSTGRES_USER}
          password: ${POSTGRES_PASSWORD}
        query: |
          SELECT 
            jsonb_build_object(
              'apiVersion', 'backstage.io/v1alpha1',
              'kind', 'Component',
              'metadata', jsonb_build_object(
                'name', name,
                'namespace', destination::jsonb ->> 'namespace',
                'annotations', jsonb_build_object(
                  'argocd/app-name', name,
                  'backstage.io/kubernetes-id', name
                ),
              )
              'spec', jsonb_build_object(
                'type', 'website',
                'lifecycle', 'production',
                'owner', 'user:default/jmacdonald_jtec.xyz',
                'system', 'turing',
                'dependsOn', json_build_array(
                  'resource:turing'
                )
              )
            ) as result
          FROM 
            kubernetes_application
```


Another option would be use the a url `location`
- https://backstage.io/docs/features/software-catalog/configuration/#static-location-configuration