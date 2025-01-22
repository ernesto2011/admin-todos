import prisma from "@/lib/prisma";
import { TodosGrid } from "@/todos";
import { NewTodo } from "@/todos/components/NewTodo";


export const metadata = {
 title: 'Listado de todos',
 description: 'Listado de todos',
};
export default async function ServerTodosPage() {
    const todos = await prisma.todo.findMany({ orderBy:{description:'asc'} })
  return (
    <>
    <span className="text-3xl ">Server actions</span>
        <div className="w-full px-3 mx-5 mb-5 mt-2">
            <NewTodo/>
        </div>
      <TodosGrid todos={todos} />
    </>
  );
}