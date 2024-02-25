# My TypeScript Journey: Earned Badges 🏆

## Badges Overview

Here is a collection of badges I earned from completing Microsoft Learn's TypeScript modules:

1. **Get Started with TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/marblehands-1714/YVH7TL3R?sharingId=A6472D01C26EF99E)
2. **Declare Variable Types in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/marblehands-1714/24Y8ECUV?sharingId=A6472D01C26EF99E)
3. **Implement Interfaces in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/marblehands-1714/K5MAH28B?sharingId=A6472D01C26EF99E)
4. **Develop Typed Functions in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/marblehands-1714/J6P22BMT?sharingId=A6472D01C26EF99E)
5. **Declare and Instantiate Classes in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/marblehands-1714/HY6LNSD8?sharingId=A6472D01C26EF99E)
6. **Generics in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/marblehands-1714/HY6L7S98?sharingId=A6472D01C26EF99E)
7. **Work with External Libraries in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/marblehands-1714/QD7R5Q3E?sharingId=A6472D01C26EF99E)
8. **Organize Code with Namespaces in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/marblehands-1714/24YFT27V?sharingId=A6472D01C26EF99E)

## Reflections

### Table of Content

1. **Get Started with TypeScript**: [Reflection](https://rolling-scopes-school.github.io/marblehands-JSFE2023Q4/typescript-essentials/#declare-variable-types-in-typescript-module-reflection)
2. **Declare Variable Types in TypeScript**: [Reflection](https://rolling-scopes-school.github.io/marblehands-JSFE2023Q4/typescript-essentials/#implement-interfaces-in-typescript-module-reflection)
3. **Implement Interfaces in TypeScript**: [Reflection](https://rolling-scopes-school.github.io/marblehands-JSFE2023Q4/typescript-essentials/#implement-interfaces-in-typescript-module-reflection)
4. **Develop Typed Functions in TypeScript**: [Reflection](https://rolling-scopes-school.github.io/marblehands-JSFE2023Q4/typescript-essentials/#develop-typed-functions-in-typescript-module-reflection)
5. **Declare and Instantiate Classes in TypeScript**: [Reflection](https://rolling-scopes-school.github.io/marblehands-JSFE2023Q4/typescript-essentials/#declare-and-instantiate-classes-in-typescript-module-reflection)
6. **Generics in TypeScript**: [Reflection](https://rolling-scopes-school.github.io/marblehands-JSFE2023Q4/typescript-essentials/#generics-in-typescript-module-reflection)
7. **Work with External Libraries in TypeScript**: [Reflection](https://rolling-scopes-school.github.io/marblehands-JSFE2023Q4/typescript-essentials/#work-with-external-libraries-in-typescript-module-reflection)
8. **Organize Code with Namespaces in TypeScript**: [Reflection](https://rolling-scopes-school.github.io/marblehands-JSFE2023Q4/typescript-essentials/#organize-code-with-namespaces-in-typescript-module-reflection)


### "Get Started with TypeScript Module" Reflection

#### 💡 Key Insights

- TypeScript is a strict superset of ES6. That is why all JavaScript code is also TypeScript code, and a TypeScript program can seamlessly consume JavaScript.
- TypeScript was developed by MicroSoft, it is an open-source technology.
- Browsers do not understand TypeScript code. It is needed to be compiled and transformed into Javascript code by using the TypeScript compiler.
- The main feature of TypeScript are types, which can be defined explicitly by themselves or automatically according to the type of data assigned to variables, also there are many other features (interfaces, generics, abstract classes and much more).
- Modern web development is performed using TypeScript, so knowing and using this technology is a must.

#### 🎓 Key Learnings

- Learned TypeScript Basics: definition, key concepts, purpose, key features, pros and cons.
- Learned such concepts as \*type hits and type inference
- Learned how to set up a TypeScript project in VS Code
- Learned how to control TypeScript compilation through setting up `tsconfig.json` file with _compile options_

#### 👩‍💻 Skills Gained

- Installation of TypeScript in a working project or globally in VS Code.
- Creating and editing a `tsconfig.json` file.
- Compiling a `.ts` file into a `.js` file in a given directory.

#### 🛠 Practiсal Usage in Real-World Application

- Allows to detect errors before code is executed in the browser due to strict data typing.
- Provides convenient hints and highlights errors while coding in real-time mode.
- Simplifies code documentation.
- Simplifies collaboration in a large team.
- Eases development of complex applications with a large code base.
- Great for OOP style programming.

[Back to Table of Content](https://rolling-scopes-school.github.io/marblehands-JSFE2023Q4/typescript-essentials/#table-of-content)


### "Declare Variable Types in TypeScript" Module Reflection

#### 💡 Key Insights

- All types in TypeScript are subtypes of a single top type called the any type. All of them are categorized as primitive types, object types, or type parameters.
- The `any` type is the one type that can represent any JavaScript value with no constraints, while `unknown` type does not allow to access any properties of it, call or construct it.
- We can associate types with variables through *explicit type annotations* or through *implicit type inference*.
- Enums are used to create sets of constants for use with variables and properties.

#### 🎓 Key Learnings

- The primitive types and syntax: `boolean`, `number`, `string`, `void`, `null`, `undefined`, and `enum` types.
- The object types and syntax: `class`, `interface`, `array`, and `literal` types.
- The union and intersection types and syntax.

#### 👩‍💻 Skills Gained

- Declare variables using primitive types.
- Declare variables using object types.
- Declare variables using union and intersection types.

#### 🛠 Practiсal Usage in Real-World Application

In real-world applications, TypeScript's variable declaration capabilities offer clarity, reliability, and maintainability. By explicitly specifying types or relying on type inference, developers ensure code robustness. Declaring variables with primitive types like boolean, number, or string minimizes runtime errors, while object types such as class or interface enforce clear data structures. Union and intersection types enable modeling complex data scenarios accurately. Leveraging TypeScript enhances code safety and scalability, meeting real-world application needs efficiently.

[Back to Table of Content](https://rolling-scopes-school.github.io/marblehands-JSFE2023Q4/typescript-essentials/#table-of-content)


### "Implement Interfaces in TypeScript" Module Reflection

#### 💡 Key Insights

- Interfaces are used to describe an object, naming and parameterizing the object's types, and to compose existing named object types into new ones.
- Interfaces have no run-time representation. They are purely a compile-time construct.
- Interfaces are often the key point of contact between any two pieces of TypeScript code.
- Type aliases can act like interfaces, however there are some differences. Type alias cannot be reopened to add new properties whereas an interface is always extendable.

#### 🎓 Key Learnings

- The reasons for using an interface in TypeScript.
- Syntax of an interface.
  - Interface names are in PascalCase.
  - The guidelines do not recommend to start a name of the interface with the letter "I".
  - Properties can be required by default (`firstName: string;`), optional (`firstName?: string;`), or read only (`readonly firstName: string;`).
- Extending the interface.
  - All the required properties from all interfaces should be implemented.
  - Two interfaces can have the same property if the property has the exact same name and type, otherwise a new property should be declared.
- We can implement indexable types using interfaces.

#### 👩‍💻 Skills Gained

- Declare an interface.
- Define required, optional and read-only properties.
- Extend an interface.
- Use interfaces in a function.

#### 🛠 Practiсal Usage in Real-World Application

- Interfaces are particularly useful for documenting and validating the required shape of properties, objects passed as parameters, and objects returned from functions. This enables to catch errors and make sure that the right parameters were passed at compile time, rather than waiting to find out about them at runtime.
- Interfaces are used to describe existing JavaScript APIs and clarify function parameters and return types.

[Back to Table of Content](https://rolling-scopes-school.github.io/marblehands-JSFE2023Q4/typescript-essentials/#table-of-content)


### "Develop Typed Functions in TypeScript" Module Reflection

#### 💡 Key Insights

- In TypeScript there are named functions (function declarations), anonymous functions (function expressions) and arrow functions as in JavaScript. The difference is that we can provide clear types for parameters and return values of the function.
- The TypeScript compiler assumes, by default, that all parameters defined in a function are required.
- We can define functions with optional, default, and rest parameters, as well as deconstructed object parameters.
- Function parameters are positional, that means that parameters should be passed in the order in which they're defined in the function.

#### 🎓 Key Learnings

- Behavior and syntax of named, anonymous and arrow functions.
- Defining functions' parameters:
  - Optional parameters are defined by appending a question mark (?) to the end of the parameter name.
  - The optional or default parameter must come after any required parameters in the parameter list.
  - Use rest parameters if we do not know how many parameters will be passed or if we want to work with parameters as with an array.
  - We can use a technique called deconstructed object parameters. This technique enables to use an interface to define named, rather than positional, parameters in the functions.
  - We can use typed functions for defining types to another functions.

#### 👩‍💻 Skills Gained

- Define typed function with required, optional, default and rest parameters.
- Define typed function using type aliases, interfaces and other functions as a type signature.

#### 🛠 Practiсal Usage in Real-World Application

TypeScript simplifies the development of functions and makes them easier to troubleshoot by enabling to type parameters and return values. TypeScript also adds new options for parameters. For example, while all parameters are optional in JavaScript functions, you can choose to make parameters required or optional in TypeScript.

Adding types to functions helps prevent from passing values that shouldn't be passed to the functions. Typed functions are especially important working with larger code bases or functions developed by others developers.

[Back to Table of Content](https://rolling-scopes-school.github.io/marblehands-JSFE2023Q4/typescript-essentials/#table-of-content)


### "Declare and Instantiate Classes in TypeScript" Module Reflection

#### 💡 Key Insights

- With TypeScript, we can implement an object-oriented approach because TypeScript has full support for classes. A class provides the pattern by which an object is created, contains methods that can be called on the class instance or on the class constructor.
- Typically a class contains properties, a constructor function, accessors (get and set) and methods. Fields must be typed. Constructor parameters must also be typed.
- By default, properties and methods have the `public` access property, that is, they can be accessed from anywhere in the program. There are also `private`, or `protected` access types. Private members cannot be accessed outside the class. Protected members can be accessed from derived classes only. In addition, properties can be made readonly by using the `readonly` modifier.
- Methods and properties can be `static`, which means that they can be accessed only on the base class constructor.
- We can use an interface to establish a "code contract" that describe the required properties of an object and their types.
- An interface can only describe the public-facing side of the class and may not include private members.

#### 🎓 Key Learnings

- What is class and how to declare it.
- Key structure of a class: properties, constructor, accessors and methods.
- Classes can be extended from other classes.
- We can describe the shape of the instance of a class by using an interface.

#### 👩‍💻 Skills Gained

- Declare, instantiate, extend a class.
- Apply access modifiers to a class.
- Define static properties in a class.
- Declare an interface to ensure class shape.

#### 🛠 Practiсal Usage in Real-World Application

Classes in TypeScript, as in other object-oriented languages, provide a way to create reusable and structured code. For example, frontend frameworks like Angular, React, and Vue use classes to create reusable UI components. Each component can be defined as a class, define its behavior and logic. This approach promotes code organization, reusability, and maintainability.

[Back to Table of Content](https://rolling-scopes-school.github.io/marblehands-JSFE2023Q4/typescript-essentials/#table-of-content)


### "Generics in TypeScript" Module Reflection

#### 💡 Key Insights

- Create generic functions when your code is a function or class that:
  - Works with a variety of data types.
  - Uses that data type in several places
- `<T>`is a type variable, or generic parameter. It is common name, but we can use any other name.
- We can use multiple generic parameters.
- `typeof`parameter can be used in a *type guards* to help identify the exact type of type variable.
Example:

```ts
function identity<T extends ValidTypes, U> (value: T, message: U) {

let typeValue: string = typeof value;

if (typeof value === 'number') {}

}
```

#### 🎓 Key Learnings

- Generics are code templates that you can define and reuse throughout your codebase.
- Generics define one or more *type variables* to identify the type or types that will be passed to the component, enclosed in angle brackets `< >`. 
- To call the function and pass a type to it, append `<type>` to the function name. For example, `getArray<number>`.
- *Generic constraint* limit possible types which could be passed.
- `keyof` operator takes an object type and produces a string or numeric literal union of its keys. Example: `getPets<T, K extends keyof T>(pet: T, key: K)`.
- `typeof` type guard is for primitive types, and `instanceOf` type guard – for objects and classes.
- We can also declare a generic interface as a function type. Example:
```ts
interface ProcessIdentity<T, U> {
    (value: T, message: U): T;
}
```
- We can declare a generic interface and implement it in a class.
Example:
```ts
interface ProcessIdentity<T, U> {
    value: T;
    message: U;
    process(): T;
}
```
- We can also declare a generic class without an interface.

#### 👩‍💻 Skills Gained

- Define a generic function.
- Declare a generic interface.
- Declare a generic class.
- Implement generic constraints.

#### 🛠 Practiсal Usage in Real-World Application

Generics can:
- Provide more flexibility when working with types.
- Enable code reuse.
- Reduce the need to use the any type.

[Back to Table of Content](https://rolling-scopes-school.github.io/marblehands-JSFE2023Q4/typescript-essentials/#table-of-content)


### "Work with External Libraries in TypeScript" Module Reflection

#### 💡 Key Insights

- We can export any declaration (such as a variable, function, class, type alias, or interface) by adding the `export` keyword or import it by using the import keyword. Any file containing a top-level `import` or `export` statement is considered a module.

#### 🎓 Key Learnings

- To export a module component, use the `export` keyword. To use the exported components from a module, use the `import` statement.
- Several forms of import:
  - Single import `import { <component name> } from '<module name>'`
  - Rename import with `as` keyword: `import { <component name> as <new name> } from '<module name>'``
  - Entire module import `import * as <variable name> from '<module name>'`

#### 👩‍💻 Skills Gained

- Organize code using modules.
- Import an external type library.

#### 🛠 Practiсal Usage in Real-World Application

- TypeScript allows developers to organize their code into modules, which helps in breaking down large codebases into smaller, more manageable pieces. This facilitates better code organization and improves readability.
- External libraries often include reusable components or modules that can be easily integrated into TypeScript projects. This promotes code reusability and reduces duplication across projects.
- We compile a single file namespace the same way that compile any other TypeScript file, because namespaces are a TypeScript-only construct.


### "Organize Code with Namespaces in TypeScript" Module Reflection

#### 💡 Key Insights

- Namespaces are a TypeScript-specific way to organize code.
- Code inside a namespace is pulled from the global scope and into the scope of the namespace. 
- If we want to make a function or class available to code outside of the namespace, we cab add the `export` keyword before its name. If omit it, the component is only available inside the namespace.
- Namespaces can be nested for more options for organizing code.
- It is not recommended to combine namespaces and modules in the same project.

#### 🎓 Key Learnings

- Namespace syntax is `namespace <namespace-name> {}`
- To use a class or function within a namespace, prefix the component name with the namespace name. Example: `Greetings.returnGreeting('Bonjour'); ` where `Greetings` is the name of the namespace and `returnGreeting` is the function, defined within it.
- To define *namespace alias* use keyword `import`. Example: `import greet = AllGreetings.Greetings;` We need it for convenience when chains of nested namespace become too long.
- To inform TypeScript of the relationship between `interfaces.ts` and `functions.ts`, we add a `reference` to `interfaces.ts` using the triple slash `///` syntax to the top of `functions.ts`. Example: `/// <reference path ='interfaces.ts>`
- Comparison between modules and namespaces.

#### 👩‍💻 Skills Gained

- Implement single-file namespaces.
- Implement multi-file namespaces.

#### 🛠 Practiсal Usage in Real-World Application

Namespaces allow to group variables, functions, interfaces, or classes related to business rules in one namespace and security in another. This placement can help avoid naming conflicts between components in the global namespace and can be beneficial when working with distributed development teams that may use similar component names.

[Back to Table of Content](https://rolling-scopes-school.github.io/marblehands-JSFE2023Q4/typescript-essentials/#table-of-content)
