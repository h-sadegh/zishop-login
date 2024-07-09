# Input Component

## List of Props

all of the html `<input>` props, plus:

- ltr `number`: right/left direction

- useref `number`: wheter define ref for the input tag or not

- subtext `string`: the helper text to show at the bottom of the input

- error `string`: error message to show at the bottom of the input (higher priority than `subtext`)

- style `CSSProperties`: 

- label `string`: label on the top of the input

- inputclassname `string`: custom classnames for input

- inputstyle `CSSProperties`: custom styles for input

- labelstyle `CSSProperties`: custom style for label of the input

- handleChange `Function`: function which gives value of the input

- clearButton `boolean` (default = `true`): whether show clear button or not
