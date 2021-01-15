// For syntax highlighting, please use the VScode extension "tobermory.es6-string-html"

export const Button = (content: string, href: string) => /* html */ `
  <mj-button background-color="rgb(96, 165, 250)" font-weight="bold" href="${href}" font-size="16px" >
    ${content}
  </mj-button>
`
