# My TypeScript Journey: Earned Badges 🏆

## Badges Overview

Here is a collection of badges I earned from completing Microsoft Learn's TypeScript modules:

1. **Get Started with TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/marblehands-1714/YVH7TL3R?sharingId=A6472D01C26EF99E)
2. **Declare Variable Types in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/marblehands-1714/24Y8ECUV?sharingId=A6472D01C26EF99E)
3. **Implement Interfaces in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/marblehands-1714/K5MAH28B?sharingId=A6472D01C26EF99E)
4. **Develop Typed Functions in TypeScript**: [Badge](badge-link)
5. **Declare and Instantiate Classes in TypeScript**: [Badge](badge-link)
6. **Generics in TypeScript**: [Badge](badge-link)
7. **Work with External Libraries in TypeScript**: [Badge](badge-link)
8. **Organize Code with Namespaces in TypeScript**: [Badge](badge-link)

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

#### 📝 Description

In this module I got a brief overview of TypeScript and its most basic key concepts. Personal reflections were written down based on the material covered.

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

### "Declare Variable Types in TypeScript" Module Reflection

#### 📝 Description

In this module I got a brief overview of types classification and their syntax in TypeScript and its most basic usage cases. Personal reflections were written down based on the material covered.

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

### "Implement Interfaces in TypeScript" Module Reflection

#### 📝 Description

In this module I got a brief overview of interfaces in TypeScript. Personal reflections were written down based on the material covered.

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

### "Develop Typed Functions in TypeScript" Module Reflection

#### 📝 Description

In this module I got a brief overview of ... Personal reflections were written down based on the material covered.

#### 💡 Key Insights

- 
-
-

#### 🎓 Key Learnings

- 
-
-

#### 👩‍💻 Skills Gained

- 
-
-

#### 🛠 Practiсal Usage in Real-World Application

...

### "Declare and Instantiate Classes in TypeScript" Module Reflection

#### 📝 Description

In this module I got a brief overview of ... Personal reflections were written down based on the material covered.

#### 💡 Key Insights

- 
-
-

#### 🎓 Key Learnings

- 
-
-

#### 👩‍💻 Skills Gained

- 
-
-

#### 🛠 Practiсal Usage in Real-World Application

...

### "Generics in TypeScript" Module Reflection

#### 📝 Description

In this module I got a brief overview of ... Personal reflections were written down based on the material covered.

#### 💡 Key Insights

- 
-
-

#### 🎓 Key Learnings

- 
-
-

#### 👩‍💻 Skills Gained

- 
-
-

#### 🛠 Practiсal Usage in Real-World Application

...

### "Work with External Libraries in TypeScript" Module Reflection

#### 📝 Description

In this module I got a brief overview of ... Personal reflections were written down based on the material covered.

#### 💡 Key Insights

- 
-
-

#### 🎓 Key Learnings

- 
-
-

#### 👩‍💻 Skills Gained

- 
-
-

#### 🛠 Practiсal Usage in Real-World Application

...

### "Organize Code with Namespaces in TypeScript" Module Reflection

#### 📝 Description

In this module I got a brief overview of ... Personal reflections were written down based on the material covered.

#### 💡 Key Insights

- 
-
-

#### 🎓 Key Learnings

- 
-
-

#### 👩‍💻 Skills Gained

- 
-
-

#### 🛠 Practiсal Usage in Real-World Application

...
