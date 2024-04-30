import { supabase } from '@/external/supabase/client';
import { useEffect, useState } from 'react';
import { Todo as TodoModel } from '@/external/supabase';
import { Alert } from '@/component/Alert';
import { Task } from '@/component/Task';

export default function TodoList() {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const { data: todos, error } = await supabase
        .from('todo')
        .select('*')
        .order('id', { ascending: true });

      if (error) console.log('error', error);
      else setTodos(todos);
    };

    fetchTodos();
  }, [supabase]);

  const addTodo = async (contentText: string) => {
    let content = contentText.trim();
    if (content.length) {
      const { data: todo, error } = await supabase
        .from('todo')
        .insert({ content })
        .select()
        .single();

      if (error) {
        setErrorText(error.message);
      } else {
        setTodos([...todos, todo]);
        setNewTaskText('');
      }
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await supabase.from('todo').delete().eq('id', id).throwOnError();
      setTodos(todos.filter((x) => x.id != id));
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className="w-full">
      <h1 className="mb-12">Task List.</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo(newTaskText);
        }}
        className="flex gap-2 my-2"
      >
        <input
          className="rounded w-full p-2"
          type="text"
          placeholder="make coffee"
          value={newTaskText}
          onChange={(e) => {
            setErrorText('');
            setNewTaskText(e.target.value);
          }}
        />
        <button className="btn-black" type="submit">
          Add
        </button>
      </form>
      {!!errorText && <Alert text={errorText} />}
      <div className="bg-white shadow overflow-hidden rounded-md">
        <ul>
          {todos.map((todo) => (
            <Task
              key={todo.id}
              task={todo}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
