import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/hello", () => "Hello World")

  // get and params
  .get("/hello/:name", ({ params }) => `Hello ${params.name}`)

  // get and many params
  .get(
    "/hello/:name/:age",
    ({ params }) => `Hello ${params.name}, you are ${params.age} years old`
  )

  .get("/customers", () => {
    const customers = [
      { name: "John", age: 25 },
      { name: "Jane", age: 22 },
      { name: "Doe", age: 30 },
      { name: "Smith", age: 35 },
    ];
    return customers;
  })
  .get("/customers/:id", ({ params }) => {
    const customers = [
      { id: 1, name: "John", age: 25 },
      { id: 2, name: "Jane", age: 22 },
      { id: 3, name: "Doe", age: 30 },
      { id: 4, name: "Smith", age: 35 },
    ];
    const customer = customers.find(
      (customers) => customers.id === Number(params.id)
    );
    if (!customer) {
      return "Customer not found";
    }
    return customer;
  })
  // example http://localhost:3000/customers/query?name=John&age=25
  .get("/customers/query", ({ query }) => {
    const name = query.name;
    const age = query.age;
    return `Name: ${name}, Age: ${age}`;
  })

  .get("/customers/status", () => {
    return new Response("Hello World", { status: 500 });
  })
  .post("/customers/create", ({ body }: { body: any }) => {
    const name = body.name;
    const age = body.age;
    return `Name: ${name}, Age: ${age}`;
  })

  .put(
    "/customers/update/:id",
    ({ params, body }: { params: any; body: any }) => {
      const id = params.id;
      const name = body.name;
      const age = body.age;
      return `ID: ${id}, Name: ${name}, Age: ${age}`;
    }
  )

  .put(
    "/customers/updateAll/:id",
    ({
      params,
      body,
    }: {
      params: { id: string };
      body: { name: string; age: number };
    }) => {
      const id = params.id;
      const name = body.name;
      const age = body.age;
      return `ID: ${id}, Name: ${name}, Age: ${age}`;
    }
  )

  .delete("/customers/delete/:id", ({ params }: { params: any }) => {
    const id = params.id;
    return `ID: ${id} has been deleted`;
  })

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
