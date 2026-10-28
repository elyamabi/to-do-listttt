import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  NavLink,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

const starterGroups = [
  {
    id: "school",
    name: "School Activities",
    description: "Assignments, quizzes, and schoolwork",
  },
  {
    id: "personal",
    name: "Personal Tasks",
    description: "Your personal goals and responsibilities",
  },
  {
    id: "projects",
    name: "Projects",
    description: "Group work and project deadlines",
  },
  {
    id: "daily",
    name: "Daily Tasks",
    description: "Everyday tasks and activities",
  },
];

const starterTasks = [
  {
    id: 1,
    groupId: "school",
    title: "Review Laboratory 3 requirements",
    done: false,
  },
  {
    id: 2,
    groupId: "school",
    title: "Prepare the project demonstration",
    done: true,
  },
  {
    id: 3,
    groupId: "projects",
    title: "Check the website layout",
    done: false,
  },
  {
    id: 4,
    groupId: "daily",
    title: "Plan tomorrow's activities",
    done: false,
  },
];

const members = [
  {
    name: "Altia Shane Sanico",
    role: "React Components and Integration",
  },
  {
    name: "Janelle Andoy",
    role: "UI Design and Layout",
  },
  {
    name: "Aldrich Dave Bitayo",
    role: "Task and Category Management",
  },
  {
    name: "Mary Fortunado",
    role: "Testing and User Guide Documentation",
  },
];

function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [groups, setGroups] = useState(() =>
    loadData("still-groups", starterGroups)
  );

  const [tasks, setTasks] = useState(() =>
    loadData("still-tasks", starterTasks)
  );

  useEffect(() => {
    localStorage.setItem("still-groups", JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem("still-tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addGroup(name, description) {
    const newGroup = {
      id: `${Date.now()}`,
      name,
      description,
    };

    setGroups((previous) => [...previous, newGroup]);
  }

  function addTask(groupId, title) {
    const newTask = {
      id: `${Date.now()}-${Math.random()}`,
      groupId,
      title,
      done: false,
    };

    setTasks((previous) => [newTask, ...previous]);
  }

  function toggleTask(id) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((previous) =>
      previous.filter((task) => task.id !== id)
    );
  }

  function clearCompleted(groupId) {
    setTasks((previous) =>
      previous.filter(
        (task) =>
          task.groupId !== groupId || !task.done
      )
    );
  }

  const counts = {
    total: tasks.length,
    done: tasks.filter((task) => task.done).length,
    pending: tasks.filter((task) => !task.done).length,
  };

  const navigation = [
    { to: "/", label: "Dashboard", icon: "⌂" },
    { to: "/groups", label: "Task Groups", icon: "▤" },
    { to: "/guide", label: "User Guide", icon: "ⓘ" },
    { to: "/developers", label: "Developers", icon: "♙" },
  ];

  return (
    <div className="min-h-screen bg-stone-100 text-neutral-900 md:flex">
      <aside className="flex w-full shrink-0 flex-col border-b border-neutral-200 bg-white p-5 md:fixed md:inset-y-0 md:w-64 md:border-b-0 md:border-r md:p-6">
        <Link to="/" className="mb-7 flex items-center gap-3">
          <span>
            <span className="block text-xl font-black tracking-tight">
              To-DO List
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
              Make room to focus
            </span>
          </span>
        </Link>

        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
          Workspace
        </p>

        <nav className="grid grid-cols-2 gap-2 md:grid-cols-1">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-neutral-950 text-white"
                    : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
                }`
              }
            >
              <span className="w-5 text-center text-lg">
                {item.icon}
              </span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-7 hidden md:block">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
              Task Categories
            </p>
            <Link
              to="/groups"
              className="text-lg text-neutral-500 hover:text-black"
            >
              +
            </Link>
          </div>

          {groups.map((group) => (
            <Link
              key={group.id}
              to={`/groups/${group.id}`}
              className="mb-1 flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-neutral-500 hover:bg-neutral-100 hover:text-black"
            >
              <span className="truncate">{group.name}</span>
              <span className="text-xs">
                {tasks.filter(
                  (task) => task.groupId === group.id
                ).length}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-neutral-950 p-4 text-white md:mt-auto">
          <p className="text-xs font-semibold text-neutral-300">
            KEEP GOING
          </p>

          <p className="mt-2 text-sm leading-6">
            Progress starts with one small task.
          </p>

          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-neutral-700">
            <div
              className="h-full rounded-full bg-white"
              style={{
                width: `${
                  counts.total
                    ? (counts.done / counts.total) * 100
                    : 0
                }%`,
              }}
            />
          </div>

          <p className="mt-2 text-xs text-neutral-400">
            {counts.done} of {counts.total} completed
          </p>
        </div>
      </aside>

      <div className="min-w-0 flex-1 md:ml-64">
        <header className="flex min-h-[68px] items-center justify-between border-b border-neutral-200 bg-stone-100 px-5 py-3 md:px-9">
          <div>
            <p className="text-xs text-neutral-400">
              DCIT 26 / LABORATORY 3
            </p>
            <p className="mt-1 text-sm font-semibold">
              Task Workspace
            </p>
          </div>

          <div className="grid h-10 w-10 place-items-center rounded-full border border-neutral-300 bg-white text-xs font-bold">
            U
          </div>
        </header>

        <main className="mx-auto max-w-6xl p-5 md:p-9">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  counts={counts}
                  groups={groups}
                  tasks={tasks}
                />
              }
            />

            <Route
              path="/groups"
              element={
                <GroupsPage
                  groups={groups}
                  tasks={tasks}
                  addGroup={addGroup}
                />
              }
            />

            <Route
              path="/groups/:groupId"
              element={
                <TaskPage
                  groups={groups}
                  tasks={tasks}
                  addTask={addTask}
                  toggleTask={toggleTask}
                  deleteTask={deleteTask}
                  clearCompleted={clearCompleted}
                />
              }
            />

            <Route path="/guide" element={<Guide />} />

            <Route
              path="/developers"
              element={<Developers />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

      </div>
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
      {children}
    </p>
  );
}

function Dashboard({ counts, groups, tasks }) {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Tasks", value: counts.total },
    { label: "Completed", value: counts.done },
    { label: "Not Done Yet", value: counts.pending },
  ];

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <Eyebrow>YOUR PERSONAL WORKSPACE</Eyebrow>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            A clearer day starts here.
          </h1>

          <p className="mt-3 text-sm leading-6 text-neutral-500">
            Welcome back. Organize your priorities and make
            progress one task at a time.
          </p>
        </div>

        <button
          onClick={() => navigate("/groups")}
          className="rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-700"
        >
          + Open Task Groups
        </button>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-neutral-200 bg-white p-5"
          >
            <p className="text-sm text-neutral-500">
              {stat.label}
            </p>

            <p className="mt-5 text-4xl font-bold">
              {String(stat.value).padStart(2, "0")}
            </p>

            <div className="mt-5 h-1 rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-neutral-950"
                style={{
                  width: `${
                    counts.total
                      ? (stat.value / counts.total) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 md:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <Eyebrow>YOUR WORK</Eyebrow>
              <h2 className="text-lg font-bold">Recent Tasks</h2>
            </div>

            <Link
              to="/groups"
              className="text-xs font-semibold text-neutral-500 hover:text-black"
            >
              View all →
            </Link>
          </div>

          {tasks.length === 0 ? (
            <Empty text="No tasks yet. Open a group to add your first task." />
          ) : (
            <div className="divide-y divide-neutral-100">
              {tasks.slice(0, 5).map((task) => {
                const group = groups.find(
                  (item) => item.id === task.groupId
                );

                return (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 py-4"
                  >
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs ${
                        task.done
                          ? "border-neutral-950 bg-neutral-950 text-white"
                          : "border-neutral-300"
                      }`}
                    >
                      {task.done ? "✓" : ""}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`break-words text-sm font-medium ${
                          task.done
                            ? "text-neutral-400 line-through"
                            : ""
                        }`}
                      >
                        {task.title}
                      </p>

                      <p className="mt-1 text-xs text-neutral-400">
                        {group?.name || "Unassigned"}
                      </p>
                    </div>

                    <span className="text-[10px] font-bold text-neutral-500">
                      {task.done ? "DONE" : "NOT DONE"}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-5 md:p-6">
          <div className="mb-5">
            <Eyebrow>STAY ORGANIZED</Eyebrow>
            <h2 className="text-lg font-bold">Your Groups</h2>
          </div>

          <div className="space-y-3">
            {groups.slice(0, 5).map((group) => {
              const total = tasks.filter(
                (task) => task.groupId === group.id
              ).length;

              return (
                <Link
                  key={group.id}
                  to={`/groups/${group.id}`}
                  className="flex items-center gap-3 rounded-xl border border-neutral-100 p-4 hover:border-neutral-400 hover:bg-neutral-50"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-neutral-100 text-lg">
                    ▤
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">
                      {group.name}
                    </span>

                    <span className="mt-1 block text-xs text-neutral-400">
                      {total} {total === 1 ? "task" : "tasks"}
                    </span>
                  </span>

                  <span className="text-neutral-400">→</span>
                </Link>
              );
            })}
          </div>

          <Link
            to="/groups"
            className="mt-4 block rounded-xl border border-dashed border-neutral-300 p-3 text-center text-sm font-semibold text-neutral-500 hover:border-neutral-900 hover:text-black"
          >
            + Create or Manage Groups
          </Link>
        </div>
      </section>

      <section className="rounded-2xl bg-neutral-950 p-6 text-white md:p-8">
        <Eyebrow>ONE TASK AT A TIME</Eyebrow>

        <h2 className="text-2xl font-bold">Make today count.</h2>

        <p className="mt-2 text-sm text-neutral-400">
          A simple plan can help you focus on what matters.
        </p>

        <Link
          to="/guide"
          className="mt-5 inline-block rounded-xl bg-white px-4 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-200"
        >
          Read the User Guide →
        </Link>
      </section>
    </div>
  );
}

function GroupsPage({ groups, tasks, addGroup }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function submitGroup(event) {
    event.preventDefault();

    if (!name.trim()) {
      setError("Please enter a group name.");
      return;
    }

    const exists = groups.some(
      (group) =>
        group.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (exists) {
      setError("A group with this name already exists.");
      return;
    }

    addGroup(name.trim(), description.trim());
    setName("");
    setDescription("");
    setError("");
    setShowForm(false);
  }

  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Eyebrow>ORGANIZE YOUR WORK</Eyebrow>
          <h1 className="text-3xl font-bold tracking-tight">
            Task Groups.
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Create categories and keep tasks in the right place.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-neutral-950 px-4 py-3 text-sm font-semibold text-white hover:bg-neutral-700"
        >
          {showForm ? "Close Form" : "+ Create a Group"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={submitGroup}
          className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5"
        >
          <label className="block text-sm font-semibold">
            Group Name *
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Example: Exam Review"
              maxLength={50}
              className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 font-normal outline-none focus:border-neutral-900"
            />
          </label>

          <label className="block text-sm font-semibold">
            Description
            <input
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="What tasks belong in this group?"
              maxLength={100}
              className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 font-normal outline-none focus:border-neutral-900"
            />
          </label>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button className="rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-700">
            Save Group
          </button>
        </form>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {groups.map((group) => {
          const ownTasks = tasks.filter(
            (task) => task.groupId === group.id
          );

          return (
            <Link
              key={group.id}
              to={`/groups/${group.id}`}
              className="rounded-2xl border border-neutral-200 bg-white p-5 transition hover:-translate-y-1 hover:border-neutral-400 hover:shadow-sm md:p-6"
            >
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-neutral-100 text-xl">
                  ▤
                </span>

                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold">
                  {ownTasks.length} tasks
                </span>
              </div>

              <h2 className="mt-6 text-lg font-bold">
                {group.name}
              </h2>

              <p className="mt-2 min-h-10 text-sm leading-6 text-neutral-500">
                {group.description || "A space for your tasks."}
              </p>

              <div className="mt-5 border-t border-neutral-100 pt-4">
                <p className="text-xs text-neutral-400">
                  {ownTasks.filter((task) => task.done).length} done
                  {" · "}
                  {ownTasks.filter((task) => !task.done).length} pending
                </p>

                <p className="mt-3 text-sm font-semibold">
                  Open Group →
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function TaskPage({
  groups,
  tasks,
  addTask,
  toggleTask,
  deleteTask,
  clearCompleted,
}) {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const group = groups.find((item) => item.id === groupId);

  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  if (!group) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center">
        <h1 className="text-2xl font-bold">Group not found</h1>
        <p className="mt-3 text-sm text-neutral-500">
          This group does not exist.
        </p>
        <Link
          to="/groups"
          className="mt-5 inline-block rounded-xl bg-neutral-950 px-4 py-3 text-sm font-semibold text-white"
        >
          Back to Groups
        </Link>
      </div>
    );
  }

  const ownTasks = tasks.filter(
    (task) => task.groupId === groupId
  );

  const visibleTasks = ownTasks.filter((task) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "done" && task.done) ||
      (filter === "pending" && !task.done);

    return (
      matchesFilter &&
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  function submitTask(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Please enter a task.");
      return;
    }

    addTask(groupId, title.trim());
    setTitle("");
    setError("");
    setFilter("all");
  }

  return (
    <div className="space-y-7">
      <div>
        <Link
          to="/groups"
          className="mb-5 inline-block text-sm font-semibold text-neutral-500 hover:text-black"
        >
          ← All Groups
        </Link>

        <Eyebrow>YOUR TASK LIST</Eyebrow>

        <h1 className="text-3xl font-bold tracking-tight">
          {group.name}.
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          {group.description}
        </p>
      </div>

      <form
        onSubmit={submitTask}
        className="rounded-2xl border border-neutral-200 bg-white p-5"
      >
        <label
          htmlFor="task-input"
          className="mb-3 block text-xs font-bold uppercase tracking-wider text-neutral-500"
        >
          Add a task to {group.name}
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="task-input"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setError("");
            }}
            placeholder="What do you need to do?"
            maxLength={160}
            className="min-w-0 flex-1 rounded-xl border border-neutral-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:bg-white"
          />

          <button className="rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-700">
            + Add Task
          </button>
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </form>

      <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        <div className="flex flex-wrap gap-2 border-b border-neutral-100 p-4">
          {[
            ["all", "All Tasks"],
            ["pending", "Not Done"],
            ["done", "Done"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                filter === key
                  ? "bg-neutral-950 text-white"
                  : "bg-neutral-100 text-neutral-500 hover:text-black"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="border-b border-neutral-100 p-4">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tasks..."
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-900"
          />
        </div>

        {visibleTasks.length === 0 ? (
          <Empty text="No tasks match this view. Add a task or change your filter." />
        ) : (
          <div className="divide-y divide-neutral-100 px-4 md:px-5">
            {visibleTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 py-4"
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  aria-label={
                    task.done
                      ? "Mark as Not Done"
                      : "Mark as Done"
                  }
                  title={
                    task.done
                      ? "Mark as Not Done"
                      : "Mark as Done"
                  }
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-sm ${
                    task.done
                      ? "border-neutral-950 bg-neutral-950 text-white"
                      : "border-neutral-300 hover:border-neutral-950"
                  }`}
                >
                  {task.done ? "✓" : ""}
                </button>

                <div className="min-w-0 flex-1">
                  <p
                    className={`break-words text-sm font-medium ${
                      task.done
                        ? "text-neutral-400 line-through"
                        : ""
                    }`}
                  >
                    {task.title}
                  </p>

                  <p className="mt-1 text-xs text-neutral-400">
                    {task.done ? "Done" : "Not Done"}
                  </p>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.title}`}
                  title="Delete task"
                  className="rounded-lg px-3 py-2 text-lg text-neutral-400 hover:bg-neutral-100 hover:text-black"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-neutral-100 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-400">
            {ownTasks.filter((task) => !task.done).length} pending ·{" "}
            {ownTasks.filter((task) => task.done).length} completed
          </p>

          <button
            onClick={() => clearCompleted(groupId)}
            disabled={!ownTasks.some((task) => task.done)}
            className="self-start text-xs font-semibold text-neutral-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-40 sm:self-auto"
          >
            Clear Completed Tasks
          </button>
        </div>
      </section>

      <button
        onClick={() => navigate("/groups")}
        className="text-sm font-semibold text-neutral-500 hover:text-black"
      >
        ← Switch Group
      </button>
    </div>
  );
}

function Guide() {
  const steps = [
    {
      title: "Create a task group",
      text: 'Open Task Groups and click "Create a Group." Enter a name, add an optional description, and click "Save Group."',
    },
    {
      title: "Add a task to a selected group",
      text: "Open the group you want. Type a task into the input field and click Add Task. The task will belong to that group only.",
    },
    {
      title: "Mark Done or Not Done",
      text: "Click the circular button beside a task to mark it Done. Click it again to change it back to Not Done.",
    },
    {
      title: "Delete a task",
      text: "Click the × button beside a task to remove it. Use Clear Completed Tasks to remove completed tasks from the selected group.",
    },
    {
      title: "Navigate between pages",
      text: "Use the sidebar to open Dashboard, Task Groups, User Guide, or Developers. Open a group card to see its task list.",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-7">
      <div>
        <Eyebrow>HELP CENTER</Eyebrow>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          User Guide.
        </h1>
      </div>

      <div className="rounded-2xl bg-neutral-950 p-6 text-white md:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
          Getting Started
        </p>
        <h2 className="mt-3 text-xl font-bold">
          Keep your tasks in order.
        </h2>
        <p className="mt-3 text-sm leading-6 text-neutral-400">
          Create groups for different activities, add tasks, and
          update their status as you make progress.
        </p>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <article
            key={step.title}
            className="flex gap-4 rounded-2xl border border-neutral-200 bg-white p-5 md:p-6"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-neutral-100 text-sm font-bold text-neutral-500">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <h2 className="font-bold">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-500">
                {step.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Developers() {
  return (
    <div className="space-y-8">
      <div>
        <Eyebrow>OUR TEAM</Eyebrow>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Meet the Developers.
        </h1>
        <p className="mt-3 text-sm leading-6 text-neutral-500">
          LABORATORY 3
          <br/>
          DCIT 26: Application Development and Emerging Technologies
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {members.map((member, index) => (
          <article
            key={member.name}
            className="rounded-2xl border border-neutral-200 bg-white p-6"
          >
            <div className="flex items-center gap-4">
  <div>
    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
      Team Member 0{index + 1}
    </p>
    <h2 className="mt-1 font-bold">{member.name}</h2>
  </div>
</div>


            <div className="mt-6 border-t border-neutral-100 pt-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                Contribution
              </p>
              <p className="mt-2 text-sm font-semibold text-neutral-700">
                {member.role}
              </p>
            </div>
          </article>
        ))}
      </div>

        </div>
  );
}

function Empty({ text }) {
  return (
    <div className="p-8 text-center">
      <div className="text-3xl text-neutral-300">▤</div>
      <p className="mt-3 text-sm text-neutral-500">{text}</p>
    </div>
  );
}

function NotFound() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center">
      <h1 className="text-2xl font-bold">Page Not Found</h1>
      <p className="mt-3 text-sm text-neutral-500">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-5 inline-block rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}

export default App;