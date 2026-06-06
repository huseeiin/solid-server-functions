import { Router } from "@solidjs/router";

const test = (a) => {
  "use server";
  console.log({ a });

  return crypto.randomUUID();
};

export function Home() {
  return (
    <>
      <div>Hello World</div>
      <button
        onClick={async () => {
          console.log(await test(1));
        }}
      >
        Test
      </button>
    </>
  );
}

export function App() {
  return <Router root={Home} />;
}
