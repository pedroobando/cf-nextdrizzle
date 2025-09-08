This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Nextjs + Drizzle + D1 + Cloudflare

## Drizzle

### Instalacion

Instalacion de drizzle

```
pnpm add drizzle-orm
pnpm add -D drizzle-kit
```

### drizzle.config.ts

Creacion del archivo drizzle.config.ts, el cual dejamos en el direcctorio raiz de nuestra apps.

```
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: 'drizzle/migrations',
  dialect: 'sqlite',
  schema: 'src/db/schema.ts',
});
```

### Creacion archivo schema.ts

Creamos el archivo src/db/schema.ts cargamos los datos para nuestra base de datos.

```
import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
  // id is autoincremental
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  fullname: text('fullname').notNull(),
  email: text('email').notNull(),
  password: text().notNull(),
  active: integer('active', { mode: 'boolean' }).notNull().default(true),

  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});
```

### Actualizacion del archivo `packege.json`

Agregamos estas lineas al pagkege.json, con el objetivo de generar las tablas y migraciones

```
    "db:generate": "drizzle-kit generate",
    "db:up": "drizzle-kit up:sqlite"
```

### Generacion de Schema

Con este comando generamos el schema,en `SQL`, pero no el la base de datos, es decir tenemos la instruccion en un script para ser aplicada a la base de datos.

```
pnpm db:generate
```

## Cloudflate Worker

### Doployment

Para hacer el deploy en worker:

pnpm wrangler deploy --name nextdrizzle

### Worker-configuration

Con este comando generamos el archivo worker-configuration.d.ts, este nos permitira manejar la configuracion de los servicios de cloudflare me diante typescript

```
pnpm cf-typegen
pnpm wrangler types
```

### Database D1

Vamos a crear la base de datos

pnpm wrangler d1 create [namedatabase]

Wrangler nos crea esta configuracion y la agrega al archivo wrangler.jsonc To access your new D1 Database in your Worker, add the following snippet to your configuration file:

```
{ "d1_databases":
 [
   {
      "binding": "DB",
      "database_name": "blogDB",
      "database_id": "c0xxxxxxx-xxxx-4de1-ae83-xxxxxxxxxxxxx"
    }
  ]
}
```

vamos a utilizar el archivo `wranfler.jsonc' en cual se crea por defecto con una aplicacion de cloudflare

> [note!] Nota a considerar existe un archivo llamado .dev.vars, donde puedes colocar variables para la aplicacion, todas estas variables son privadas, solo seran vistas por la aplicacion.- Variables de seguridad.

### Local - D1

Genera localmente la base de datos en nuestro cpu

```
pnpm wrangler d1 execute nextdrizzle-d1  --local --file=./drizzle/migrations/0003_faulty_sleepwalker.sql
```

### Remote - D1

Genera en remotamente la base de datos en cloudflare

```
pnpm wrangler d1 execute blogDB  --remote --file=./drizzle/migrations/0000_naive_phil_sheldon.sql
```

### Modificacion variable

Al agregar, cambiar o eliminar alguna variable, en los archivos `wrangler.jsonc` o `dev.vars`, recuerde actualizar el archivo `worker-configuration.d.ts`, mediante el comando

```
pnpm wrangler types
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>();
```

## Guias

- [guia](https://app.studyraid.com/en/read/11303/352724/authentication-middleware-setup)
