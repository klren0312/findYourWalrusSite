import { createRoot } from 'react-dom/client'
import { Main } from './main'
import './assets/css/basic.less'
import './assets/css/tailwind.css'


const container = document.querySelector('#root') as Element
const root = createRoot(container)

root.render(<Main />)
