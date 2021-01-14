// For syntax highlighting, please use the VScode extension "tobermory.es6-string-html"

export const Layout = (content: string) => /* html */ `
  <mjml>
    <mj-body>
      <mj-section padding="30px" >
      </mj-section>

      <mj-section background-color="#fafafa" padding="30px" >
        <mj-column >
          ${content}
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
`
