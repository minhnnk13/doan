const getLinkToApp = (app) => `${window.location.origin}/${app}`

const redirectToApp = (app, path) => {
  let href = getLinkToApp(app)

  if (path) {
    href += `${path}`
  }
  window.location.href = href
}

const focusFirstControl = (container) => {
  const controls = container.querySelectorAll(
    'input[type="text"]:not([disabled]):not([readonly])'
  )

  for (let index = 0; index < controls.length; index++) {
    const element = controls[index]
    const elementStyle = window.getComputedStyle(element)

    const isVisible = elementStyle.visibility !== 'hiddent' && elementStyle.display !== 'none'
    if (isVisible) {
      element.focus()
      break
    }
  }
}
class CommonFn {

}
export default new CommonFn()

export {
  focusFirstControl,
  redirectToApp
}
