# ngrx\_tests\_tutorial\_examples

Angular 21 application + Angular Material + Bootstrap 5

Showcase of NgRX examples - when returning back to a page it keeps it's state.

\- Counter example.

\- Book list example.

\- Show even or odd numbers.

\- Show users example.

\- Show users with pagination.

\- Show animals.

See the root of this project for example images.

## Installation + run app

**Angular 21** needs a **Node.js** version of at least _20.19.0_

**Command to install**

_npm install_

or shorter:

_npm i_

**Command to run the application:**

_ng serve --open_

or shorter:

_ng s --o_

### **Changelog:**

_December 2025_

\- Upgrade to _Angular 21_ and upgraded other packages.

*   Removed deprecated _Karma_ and installed _Vitest._
*   Migrated _Jasmine_ tests to _Vitest_ tests for future use (command: **ng generate refactor-jasmine-vitest**).

_August 2025_

\- Upgrade to Angular 20.

\- Removed unnecessary package _@angular/platform-browser-dynamic_.

\- Removed deprecated package _@angular/animations_.

\- Using the keyword **protected** for properties that are only accessible in the template.

\- Using the keyword **readonly** for properties initialized by Angular (input(), output(), model()).

\- Other changes: Variables to _signals_, removed _standalone: true_ from components.

\- Replaced **deprecated** ngrx code in select function (where strings are deprecated and a selector function is needed) - example:

`this._paginationData$ = this.store.select('pagination');`

To:

`this._paginationData$ = this.store.select(state => state.pagination);`

\- Suppressing deprecation warnings of _Bootstrap_ in _angular.json_ with the code:

`"stylePreprocessorOptions": {`  
`"sass": {`  
`"silenceDeprecations": ["mixed-decls", "color-functions", "global-builtin", "import"]`  
`}`  
`},`

\- Various small changes.