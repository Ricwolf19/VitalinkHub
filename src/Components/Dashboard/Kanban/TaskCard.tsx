import { TrashIcon } from "lucide-react"
import { Id, Task } from "./Types"
import { useState } from "react";

interface Props {
    task: Task;
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void
}


export function TaskCard({ task, deleteTask, updateTask }: Props) {
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(false)

    const toggleEditMode = () => {
        setEditMode((prev) => !prev);
        setMouseIsOver(false)
    }

    if (editMode) {
        return (
            <div
                className="
    bg-main 
    p-2.5 
    h-[100px] 
    min-h-[100px] 
    items-center 
    flex 
    text-left 
    rounded-xl
    hover:ring-2
    hover:ring-inset
    hover:ring-blue-500
    cursor-grab
    relative
    ">
                <textarea
                    value={task.content}
                    autoFocus
                    placeholder="Task content here"
                    onBlur={toggleEditMode}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && e.shiftKey) {
                            toggleEditMode()
                        }
                    }}
                    onChange={e => updateTask(task.id, e.target.value)}
                    className="
                h-[90%]
                w-full
                resize-none
                rounded
                bg-transparent
                text-white
                focus:outline-none                 
                ">

                </textarea>
            </div>
        )

    }

    return (
        <div
            onClick={toggleEditMode}
            onMouseEnter={() => {
                setMouseIsOver(true)
            }}
            onMouseLeave={() => {
                setMouseIsOver(false)
            }}
            className="
    bg-main 
    p-2.5 
    h-[100px] 
    min-h-[100px] 
    items-center 
    flex 
    text-left 
    rounded-xl
    hover:ring-2
    hover:ring-inset
    hover:ring-blue-500
    cursor-grab
    relative
    task
    ">
        <p
        className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap"
        >{task.content}</p>
        
            {mouseIsOver && <button onClick={() => {
                deleteTask(task.id)
            }} className="
    stroke-white
    absolute
    right-4
    top-1/2
    -translate-y-1/2
    bg-column
    p-2
    rounded
    opacity-60
    hover:opacity-100
    ">
                <TrashIcon />
            </button>}
        </div>
    )
}
