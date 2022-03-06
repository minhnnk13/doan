import Button from '../components/button'
import TextField from '../components/text-field'
import BaseForm from '../components/form'
const components = [
  Button,
  TextField,
  BaseForm
]

export default (app) => {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}
