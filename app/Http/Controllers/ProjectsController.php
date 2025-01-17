<?php


namespace App\Http\Controllers;

use App\Project;

class ProjectsController extends Controller
{
    // show the page to create a new project
    public function create()
    {
        return view('projects.create', [
            'projects' => Project::all()
        ]);
    }
    // store a new project in the database
    public function store()
    {
        $this->validate(request(), [
            'name' => 'required',
            'description' => 'required'
        ]);

        Project::forceCreate([
            'name' => request('name'),
            'description' => request('description')
        ]);
        return ['message' => 'Project Created!'];
    }
}
