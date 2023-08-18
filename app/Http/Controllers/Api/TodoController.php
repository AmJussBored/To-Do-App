<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Http\Resources\TodoResource;
use Illuminate\Support\Facades\Auth;
use Ramsey\Uuid\Uuid;


class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
       /* $todos = Todo::query()->where("user_id", Auth::user()->id)->get();

        return response($todos, 200);

        return TodoResource::collection(
            Todo::query()->where("user_id", Auth::user()->id)->get()
        );*/

        try {
            return TodoResource::collection(
                Todo::query()->where("user_id", Auth::user()->id)->get()
            );
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTodoRequest $request)
    {
        $data = $request->validated();

        $user = Auth::user()->id;
        $todo = Todo::create([
            "id" => Uuid::uuid4(),
            "user_id" => $user,
            "title" => $data["title"],
            "description" => $data["description"],
            "finished" => 0
        ]);;
        return response()->json([
            'message' => 'To Do successfully added',
            'data' => new TodoResource($todo)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        return new TodoResource($todo);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTodoRequest $request, Todo $todo)
    {
        $data = $request->validated();
        $todo->update($data);

        return response()->json([
            'message' => 'To Do item updated Successfully',
            'data' => new TodoResource($todo)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        /*$todo->delete();

        return response("", 204);*/

        $todo = Todo::find($id);

        if (!$todo) {
            return response()->json(['message' => 'To Do item not found'], 404);
        }

        $todo->delete();

        return response()->json(['message' => 'To Do item deleted successfully']);
    }


    public function markFinished($id)
    {
        $todo = Todo::find($id);
        if ($todo) {
            $todo->finished = !$todo->finished;

            $todo->save();

            return response($todo, 200);
        } else {
            return response(['message' => 'To Do item not found'], 404);
        }
    }
}
