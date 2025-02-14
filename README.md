# Portfolio Assignment - 5

## project create

```
1. npm init -y
2. npm install express --save
3. npm install -D typescript
4. npm install -D typescript@next
5. npm install mongoose --save
6. npm i cors
7. npm i @types/cors
8. npm i dotenv
9. tsc --init
```

## eslint add

```
1. npm i -D eslint@9.14.0 @eslint/js @types/eslint__js typescript typescript-eslint
2. npx eslint --init
```

At this point you may see that your version of eslint: "^9.14.0" has been changed to eslint: "^9.15.0"

```
1. npm remove eslint
2. npm i -D eslint@9.14.0
```

## Adding Prettier

```
1.npm i -D --exact prettier
```

Now create .prettierrc and .prettierignore file in the root of your project. Include basic configurations for prettier in the .prettierrc file.

.prettierrc

```
{
  "semi": true,
  "singleQuote": true
}
```

.prettierignore

```
dist
coverage
```

Finally we can add scripts for prettier as well in the package.json file.

```
"format": "prettier . --write"
```

## Project Details

1. I create src folder then i include app.ts and server.ts file
2. I create module folder in src folder
3. I create 2 folder in module. 2 folder name user and blog
4. Then I create 5files in this 2 folder such as Interface.ts--->Model.ts--->Service.ts--->Controller.ts--->Routes.ts
5. I create auth module for authentication

## post method to create link for registration

https://blogging-assignment3.vercel.app/api/auth/register

## post method to log in link

https://blogging-assignment3.vercel.app/api/auth/login

## post method to create blog by user

https://blogging-assignment3.vercel.app/api/blogs

## patch method for update blog by user id

https://blogging-assignment3.vercel.app/api/blogs/:id

## delete method for delete blog by users id

https://blogging-assignment3.vercel.app/api/blogs/:id

## patch method for update user block status

https://blogging-assignment3.vercel.app/api/admin/users/:id/block

## blog delete by admin

https://blogging-assignment3.vercel.app/api/admin/blogs/:id

## vercel set up by installing vercel cli and add vercel.json file add

1. I use vercel for creating for backend live server

vercel.json

```
{
  "version": 2,
  "builds": [
    {
      "src": "dist/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/server.js"
    }
  ]
}

```
