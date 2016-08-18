# Contributing

The aim of this project is to *emulate visual imparity, color blindness and inability to use a pointer*.
This should help designers, developers and others without these impairments to experience what it's like. So they'll create better web apps and web sites for those who do.

Contributions should be aimed towards this goal and / or improve the development workflow.

## Guidelines

### Pull Requests

For new additions or changes to the a11y-viewer, create a branch and submit a Pull Request.
Keep changes as small as possible. Only add/change 1 feature/fix per Pull Request.


### Commit message format

Each commit message must have a *header* and optionally a *body*. The header has a special format that includes a type, a scope and a summary:

```
<type>(<scope>): <summary>
<BLANK LINE>
<body>
```

Note: you can use `npm run commit`, prompting you to fill out the git commit message step-by-step.

#### Type
Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **test**: Adding missing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

#### Scope
The scope could be anything specifying place of the commit change. The scope is optional.

In case of a feature or fix, it would typically be the name of the file/module, e.g. `fix(imparity-selector):`.

#### Summary
The summary contains succinct description of the change. Keep it clear, but short. Put the rest in the body.

#### Body
The body should include the motivation for the change and contrast this with previous behavior.

Note: the commit message format guidelines are based on [Angular's Git Commit Guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines).


## Scripts

Development requires [Node.js](http://nodejs.org/) and [npm](https://npmjs.org/).

After installing dependencies (run `npm install`) the following scripts are available:

`npm run ...` | Description
---|---
`build` | Compile HTML, CSS and JS and output to `dist/`.
`start` | Starts local server to use a11y-viewer on `http://localhost:1119` ("a11y" in T9).
`watch` | Recompile (build) HTML, CSS and JS on file changes.
