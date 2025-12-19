---
title: "API integrations in React"
desc: "Given the rise of SPAs, front-end and back-end systems are now completely decoupled. This means the front-end must make API calls to the back-end to fetch necessary data. This article walks through some ways to do it."
category: "Javascript"
tags: ["Front-end", "React", "Typescript"]
---

## Option 1: Custom Hook (Recommended)

```ts
import { useState } from "react";

type APIRequestState<T> = {
	loading: boolean;
	data?: T;
	error?: Error;
};

export function useAPI<T, E>(fetcher: (params: T) => Promise<E>) {
	const [state, setState] = useState<APIRequestState<E>>({
		loading: false,
		data: undefined,
		error: undefined,
	});
	const call = (callParams: T) => {
		setState({ loading: true, data: undefined, error: undefined });
		return new Promise<E>((resolve, reject) => {
			fetcher(callParams)
				.then((res) => {
					setState({ loading: false, data: res, error: undefined });
					resolve(res);
				})
				.catch((err) => {
					setState({ loading: false, error: err, data: undefined });
					reject(err);
				});
		});
	};

	return {
		call,
		loading: state.loading,
		data: state.data,
		error: state.error,
	};
}
```

## Option 2: Tan-stack Query

Tan-stack query is an external dependency which needs to be installed.

```bash
$ npm i react-query
```

### Basic setup

```ts
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
```

### Simple GET Request

```tsx
import { useQuery } from "react-query";
import { Todo } from "@/lib/types";
import { TodosAPI } from "@/lib/api/todos";
import { TodoItem } from "@/components/TodoItem";

export function TodoList() {
	// execute request at component mount
	const todos = useQuery<Todo[], Error>("todos", TodosAPI.getAllTodos);

	return (
		<div>
			<h3>Todos</h3>
			{todos.isLoading && <span>Loading...</span>}
			{todos.isError && <span>{todos.error.message}</span>}
			{todos.data &&
				todos.data.map((todo) => (
					<TodoItem todo={todo} key={todo.id} />
				))}
		</div>
	);
}
```

```tsx
import { FC } from "react";
import { Todo } from "@/lib/types";

type Props = {
	todo: Todo;
};

export const TodoItem: FC<Props> = ({ todo }) => {
	return (
		<div className="p-3 flex flex-col space-y-1 bg-gray-200 my-2">
			<span>ID: {todo.id}</span>
			<span>Title: {todo.title}</span>
			<span>Completed: {todo.completed}</span>
		</div>
	);
};
```

```ts
export type Todo = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
};
```

```ts
import { Todo } from "@/lib/types";

export const TodosAPI = {
	async getAllTodos(): Promise<Todo[]> {
		const res = await fetch("https://jsonplaceholder.typicode.com/todos");
		if (!res.ok) {
			throw new Error("Failed to fetch todos");
		}

		// TODO: use ajv / zod to validate json data shape
		return (await res.json()) as Todo[];
	},
};
```
