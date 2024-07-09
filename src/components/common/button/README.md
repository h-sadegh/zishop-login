# Button Component

## List of Props

all of the html `<button>` props, plus:

- title `string`: text of button

- icon `string`: path of the svg icon in `public` folder

- iconPosition `"right" | "left"` (default = `"left"`): position of icon in the button

- loading `boolean` (default = `false`): display loading indicator

- variant `ButtonTypes` (default = `ButtonTypes.CONTAINED`): 3 types of button including `ButtonTypes.CONTAINED`, `ButtonTypes.OUTLINED`, and `ButtonTypes.TEXT`

- color `ButtonColorTypes` (default = `ButtonColorTypes.PRIMARY`): 2 types of button color including `ButtonColorTypes.PRIMARY` and `ButtonColorTypes.SECONDARY`

- contentStyle `CSSProperties` (default = `{}`): custom styles for button tag

- iconStyle `CSSProperties` (default = `{}`): custom styles for icon of the button
