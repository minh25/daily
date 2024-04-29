'use client'

import {supabase} from "@/external/supabase/client";
import {QueryData} from "@supabase/supabase-js";
import {useEffect, useState} from "react";


export default function Page() {
  const getTodosQuery =
    supabase.from('todo').select('id, content, order').order('order', { ascending: false });
  type Todos = QueryData<typeof getTodosQuery>
  const [todos, setTodos] = useState<Todos>();
  useEffect(() => {
    const fetchTodos = async () => {
      const { data: todos, error } = await getTodosQuery;

      if (error) console.log('error', error)
      else setTodos(todos)
    }
    fetchTodos()
  }, [supabase])
  return (
    <div>
      <h1 className="font-bold">Todo</h1>
      <ul className="font-bold">
        {todos?.map(todo => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
    </div>
  );
}