/* 
  Before running, require this file from within App.vue and uncomment the console.log 
  Then, move the log response into `generated.json`
*/

import source from './source'
import { jobStats } from '../utils'

const formattedData = {}

Object.keys(source).forEach(key => {
  formattedData[key] = jobStats(source[key])
})

// console.log(formattedData)
