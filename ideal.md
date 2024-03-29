# Attributes of an ideal react component.

In the ever-evolving world of web development, React has emerged as a powerful and flexible JavaScript library for building user interfaces. React's unopinionated nature grants app developers the freedom to enter the ecosystem seamlessly, while providing library authors the flexibility to drive innovation.

The downside is developers are quickly overwhelmed with choices and suffer [JavaScript fatigue](https://auth0.com/blog/how-to-manage-javascript-fatigue/). The abundance of choices can overwhelm developers, causing them to focus on immediate needs without considering the long-term consequences. Many developers lack the confidence or political capitol to advocate for coding standards, paving the way for inconsistency and accumulating technical debt within the React application. What begins as a greenfield project can swiftly morph into a legacy burdened by soul-crushing technical debt.

Building software is hard, anyone who tells you different is trying to sell you something. The establishment and strict adherence to coding standards act as a safeguard against the [technical debt trap](https://www.youtube.com/watch?v=S2pS9hN2Fws), empowering developers to consistently provide value on a large scale, with agility and accuracy.

Effective standards should not merely impose constraints; they should also serve as a compass, offering guidance on the art of crafting software correctly. Here is that compass.

## Attributes of an ideal react component:

- ### [An ideal react component is too small to fail](https://github.com/afrievalt/best-practices-react/blob/main/ideal.md#an-ideal-component-has-minimal-surface-area)

- ### [An ideal react component has a minimal surface area.](https://github.com/afrievalt/best-practices-react/blob/main/ideal.md#an-ideal-component-has-minimal-surface-area)

- ### [An ideal react component has minimal logic.](https://github.com/afrievalt/best-practices-react/blob/main/ideal.md#an-ideal-react-component-has-minimal-logic)

- ### An ideal react component has a clear separation between JavaScript and JSX.

[Mise en place your code](https://www.notion.so/Mise-en-place-your-code-and-make-fewer-mistakes-eeee1afc6dc64438a6cf39e70cc09b5f?pvs=21)
Learn more coming soon.

- ### An ideal react component has jsx that resembles simple html.

- ### An ideal component is adaptable.

- ### An ideal component is composable.

- ### It is fine to pragmatically violate the above rules a few times.

# An Ideal React Component is too small to fail.

Break down complex user interfaces into smaller, more manageable components.

### Detecting Large Components:

It is easy to detect large component. If the file is over 120 lines, its too big. If the component is over 60 lines, pragmatically make it smaller. If describing the component requires the word “and” you are likely violating the Single Responsibility Principle (SRP).

### Tips for Achieving Small React Components:

#### 1. **Discipline:**

Stick to the routine and discipline of keeping your components small. During the discovery phase, do whatever it takes to accomplishing the task, but before publishing, take the time and make is smaller. Make this part of your code reviews. It is much easier to remove 20 lines from a component than removing 800 lines.

> I apologize for such a long letter - I didn't have time to write a short one.
>
> ― **Mark Twain**

> I have made this longer than usual because I have not the time to make it shorter.
>
> ― **Blaise Pascal**

#### 2. **Decomposition:**

Break down larger components into smaller ones by identifying discrete functionalities and UI sections. If a component goes over the 60 lines, consider whether it can be decomposed into smaller, more manageable parts. See [atomic design](https://atomicdesign.bradfrost.com/) and and [thinking in react.](https://react.dev/learn/thinking-in-react#step-1-break-the-ui-into-a-component-hierarchy) Composition is key attribute of both functional programming and React.

#### 3. **Don’t repeat yourself (DRY):**

```jsx
// ⛔ Don't repeat yourself
function Footer() {
  const [count, setCount] = useState();
  return (
    <ButtonList>
      <Button
        type="Large"
        icon="plus"
        iconPosition="left"
        className="btn btn--secondary btn--secondary--warn"
        onClick={() => setCount(count + 100)}
      >
        Add 100
      </Button>
      <Button
        type="Large"
        icon="plus"
        iconPosition="left"
        className="btn btn--secondary btn--secondary--warn"
        onClick={() => setCount(count + 10)}
      >
        Add 10
      </Button>
      <Button
        type="Large"
        icon="plus"
        iconPosition="left"
        className="btn btn--secondary btn--secondary--warn"
        onClick={() => setCount(count + 1)}
      >
        Add 1
      </Button>
    </ButtonList>
  );
}
```

```jsx
function AddButton({ valueToAdd, onClick }) {
  const handleClick = () => {
    onClick(valueToAdd);
  };
  return (
    <Button
      type="Large"
      icon="plus"
      iconPosition="left"
      className="btn btn--secondary btn--secondary--warn"
      onClick={handleClick}
    >
      Add {valueToAdd}
    </Button>
  );
}

// ✅ DRY code example
function Footer() {
  const [count, setCount] = useState();
  const handleClickAdd = (addValue) => {
    setCount((old) => old + addValue);
  };
  return (
    <ButtonList>
      <AddButton valueToAdd={100} onClick={handleClickAdd} />
      <AddButton valueToAdd={10} onClick={handleClickAdd} />
      <AddButton valueToAdd={1} onClick={handleClickAdd} />
    </ButtonList>
  );
}
```

#### 4. **Jettison Code**

Anything that can be removed from a component, should be removed from a component. This includes static values, unreachable code, and functions that don’t use closure.

```jsx
// ⛔ remove static values, unreachable code, and
//   functions without closure
function Strange({ headCount }) {
  const MAX_CAPACITY = 250; // ⛔ static value
  const getIsOverCapacity = (count) => {
    // ⛔ function without closure
    MAX_CAPACITY > count;
  };
  const isOverCapacity = getIsOverCapacity(headCount);
  if (isOverCapacity && headCount === 7) {
    return <div>strange</div>; // ⛔ unreachable code
  }

  return <NumberDisplay value={headCount} error={isOverCapacity} />;
}
```

```jsx
const MAX_CAPACITY = 250; //  ✅ static value
const getIsOverCapacity = (count) => {
  //  ✅ function without closure
  MAX_CAPACITY > count;
};

// ✅
function Strange({ headCount }) {
  const isOverCapacity = getIsOverCapacity(headCount);

  return <NumberDisplay value={headCount} error={isOverCapacity} />;
}
```

#### 5. **Remove Logic from components:**

This will be expounded on in a future post.

#### 6. **Build custom hooks**

Hooks are a powerful feature, but can easily bloat component size. Solution: move the bloated code into a custom hook. This habit has a secondary benefit of discovering opportunities for code reuse.

#### 7. **Remove Features**

Not always an option, but very effective. Many concepts in building an ideal component can be summarized in the concept “optimize for deletion”. Be very comfortable in removing code swiftly.

> Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.
>
> ― **Antoine de Saint-Exupéry**

#### 8. **Avoid cut and past coding.**

We are all guilty of if, but avoid copying sections of your code base and pasting it elsewhere. A better options is to use tools like [snippet generator](https://snippet-generator.app/?description=&tabtrigger=&snippet=&mode=vscode) or [plop](https://plopjs.com/documentation/) to create starter boiler plate code. These tools make it easy to do the right thing.  
When copying code from Stack Overflow you completely understand it. Code generated by Figma or your favorite AI tool should be refactored to fit your coding standards.

Advantages of Small React Components:

1. **Modularity and Reusability:**
   Breaking down your UI into small, self-contained components promotes modularity and reusability. Each component can be thought of as a building block, capable of being reused across different parts of your application or even in other projects. This not only saves time but also improves the maintainability of your codebase.
2. **Readability and Maintainability:**
   Small components are inherently easier to read and understand. When your components are focused on specific tasks, it becomes simpler to comprehend their functionality. This readability, in turn, enhances the maintainability of your codebase, making it easier for you and your team to collaborate and make updates.
3. **Testability:**
   Small components are more straightforward to test. Unit testing becomes more manageable when each component has a well-defined purpose, as it's easier to isolate and verify specific functionalities. This leads to a more robust testing strategy, resulting in a higher level of confidence in the reliability of your application.
4. **Scalability:**
   The "too small to fail" approach inherently supports scalability. As your application grows, small components can be easily extended, modified, or replaced without causing a domino effect of changes throughout the entire codebase. This flexibility is crucial for adapting to evolving requirements and ensuring that your application remains agile.
5. **Collaboration and Codebase Understanding:**
   When your codebase is composed of small, focused components, it becomes more accessible for new developers to onboard. The learning curve is reduced, and developers can quickly grasp the structure and functionality of the application. This facilitates collaboration within development teams, allowing for smoother knowledge transfer and teamwork.
6. **Reliability:**
   One of the often-overlooked advantages of small React components is enhanced reliability. Code that doesn't exist can't fail. When components are small and focused, the potential for bugs and errors is significantly reduced. Each component operates within its well-defined scope, minimizing the chances of unexpected interactions or side effects. This leads to a more reliable and stable application, as issues can be isolated and addressed swiftly, ensuring a smoother user experience.

Disadvantage of Large Components:

1. **Requires you to keep a lot in your head:**
   Large components demand a comprehensive mental model, making it challenging to understand and maintain the intricate logic within them.
2. **Force you to choose between multiple poor options.**  
   Grokking large components is both time consuming and exhausting. Once you figure out how to make a change, your are now left with two bad choices. Either add to the problem and grow the component or spend a significant amount of time and risk breaking the component into smaller parts.
3. **Large Components tend to get larger over time:**
   Larger components have a tendency to accumulate additional functionality and complexity over time, making them harder to manage and increasing the risk of bugs. From Kevlin Henry’s talk “[Small Is Beautiful](https://youtu.be/B3b4tremI5o?t=1005)”: “There are classes out there that have their own gravitational field…… things are drawn towards it because of the gravitational field and it becomes larger and larger until you’ve got one hot Jupiter of a legacy system.”
4. **Hides useless code:**
   Large components may contain sections of code that are unreachable, unused, or useless. These issues occur when making hasty changes without considering the code holistically. The also occur when the developer lack of fundamental concepts. Unreachable code is often caused by logical errors. Unused code is often caused by copy pasta coding and unmaintained CSS.
5. **Make collaboration difficult:**
   Large components are more likely to have merge conflicts. Large components are more likely to create coding bottle necks.

Trade-offs, Disadvantages, and Exceptions:

While the advantages of small React components are numerous, it's essential to acknowledge that there are trade-offs and exceptions to the "too small to fail" rule. Some considerations include:

1. **Increased File Count:**
   Breaking down components into smaller units can lead to an increased number of files in your project. While this enhances modularity, it may also result in a more extensive file structure that requires careful organization.
2. **Potential Overhead:**
   Over-fragmentation of components can introduce a level of overhead, especially in terms of managing state and props between numerous small components. Striking the right balance is crucial to avoid unnecessary complexity.
3. **Context Switching:**
   Developers might face challenges if they constantly need to switch between numerous small components. In some cases, a larger component with a well-organized structure might be more straightforward for certain functionalities.
4. **Performance Concerns:**
   Although the impact is generally minimal, having an excessive number of small components could lead to a slight performance hit. It's crucial to measure and assess the performance implications in the context of your specific application.

# An ideal component has minimal surface area

Surface area is what you need to know to effectively use the component.

### How to detect large surface area:

Detecting components with a large surface is not that difficult, but defining a rule is. Its not as simple as setting an upper limit on required properties. First, not all properties add to the surface area equally. See [use simple types](https://github.com/afrievalt/best-practices-react/blob/main/ideal.md#an-ideal-component-has-minimal-surface-area). Also, some components like forms and tables demand a ton of properties. Our objective is to minimize them.

### Tips for reducing surface area:

#### 1. **Avoid prop drilling:**

There is a plethora of [blogs on this topic](https://www.freecodecamp.org/news/avoid-prop-drilling-in-react/), if you don’t know how to avoid this, please review some of them.

#### 2. **Use composition and the children prop:**

```jsx
// ⛔ icon, iconPosition, and label are
// increasing surface area
function Button({ icon, iconPosition, label, ...rest }) {
  return (
    <StyledButton {...rest}>
      {iconPosition === "left" && <Icon type={icon} />}
      {label}
      {iconPosition === "right" && <Icon type={icon} />}
    </StyledButton>
  ); // ⛔ iconPosition is also adding logic
}

function Footer() {
  const [count, setCount] = useState();
  const handleClick = () => setCount((old) => old + 100);
  return (
    <Button
      icon="plus"
      iconPosition="left"
      onClick={handleClick}
      label="Add 100"
    />
  );
}
```

```jsx
// ✅ use children and composition
function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

function Footer() {
  const [count, setCount] = useState();
  const handleClick = () => setCount((old) => old + 100);
  return (
    <Button onClick={handleClick}>
      <Icon type="plus" /> Add 100
    </Button>
  );
}
```

#### 3. **Have a good naming convention:**

Have a good naming convention. Poorly named props can unexpectedly increase the surface area. Avoid ambiguous names like "data", "list", "items", or single letters. Use conventions like booleans beginning with "is" and user action callbacks beginning with "on".

#### 4. **Inject values:**

Inject values with useSelector (Redux), useContext, useParams (React-Router) or other hooks.

#### 5. **Use simple values:**

Prefer props with simple, primitive values. Avoid parsing. It is easier to compose simple values than parse strings that contain data structures.

```jsx
function Size(props) {
  const { dimensions } = props;
  // dimensions = 12"x18" or 1'x1.5'
  // 🚫 Avoid Parsing
  const [width, height] = dimensions.split("x");
  const unitSymbol = width.at(-1);
  const unit = unitLookup[unitSymbol];
```

```jsx
function Size(props) {
  // ✅ pass in simple values
  const { width, height, unit } = props;
  const display = `${width}${unit}x${height}${unit}`;
```

If you need to parse you might need to [identified the minimal state](https://legacy.reactjs.org/docs/thinking-in-react.html#step-3-identify-the-minimal-but-complete-representation-of-ui-state). See
[Value of Values](https://www.infoq.com/presentations/Value-Values/) for a deeper dive.

#### 6. **Use Default values:**

Default values allow you to increase flexibility without increasing the surface area. Default values can nudge developers to do the right thing. They also allow developers to experiment with faster feedback.

## An ideal react component has minimal logic.

Many component are littered with unnecessary logic. 

Please note, many tips listed don’t reduce cyclomatic complexity, but reduce cognitive complexity in the component.

### Tips for removing component logic.

#### 1. **Avoid empty checks:**

Many checks for empty strings or empty arrays are unnecessary because they have no effect on  what the end user will see. 

#### 2. **Use lookup tables:***

Many “if then else” and “switch” statements can be replaced with lookup tables.  A lookup table is  simply an object literal

#### 3. **Move the logic outside the component.**

Build a library of utility functions.  

##### 4. **Use selectors:**
[Selectors](https://redux.js.org/usage/deriving-data-selectors) can transform the data you have into the data you need.  Selectors are most often associated with Redux but don’t require it. 

##### 5. ***Use CSS***

A deep understating of CSS can eliminate JavaScript logic. 

#### 6. **Avoid parsing**

[Use simple values](https://github.com/afrievalt/best-practices-react/blob/main/ideal.md#5-use-simple-values) that don't require parsing.  

## An ideal react component has a clear separation between JavaScript and JSX.

Values should be gathered and assembled at the beginning of a component.  JSX should be returned at the end of the component using the assembled values.  No JSX should appear above the return statement. Any JavaScript that can be extracted from JSX should be extracted. With less intermingling of JSX and JavaScript, you can now benefit from a "Squint Test" and detect issues faster. Refer to "Simple Made Easy" for a deeper understanding of the benefits of simplifying your code.