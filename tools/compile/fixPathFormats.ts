import * as fs from 'fs'

export default function main({
  INPUT_FILE,
  DIST_FILE,
}: {
  INPUT_FILE: string
  DIST_FILE: string
}) {
  // Step 1: Read the JSON file and parse it
  const openApiData = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'))

  // Function to replace /:<path> with /{path}
  const replaceColonWithBraces = (path: string) => {
    return path.replace(/\/:([a-zA-Z0-9_-]+)/g, '/{$1}')
  }

  // Step 2: Modify the 'in' field if the parameter exists in the path
  const updateParameterInField = (paths: any) => {
    for (const pathKey in paths) {
      const pathItem = paths[pathKey]

      // Replace colon-style parameters in path
      const updatedPathKey = replaceColonWithBraces(pathKey)
      if (updatedPathKey !== pathKey) {
        paths[updatedPathKey] = pathItem
        delete paths[pathKey]
      }

      // Iterate through different operations in the path
      for (const method in pathItem) {
        const operation = pathItem[method]
        if (operation.parameters) {
          operation.parameters.forEach((parameter: any) => {
            if (parameter.in === 'query') {
              const paramName = parameter.name

              // If the parameter name exists in the path, change "in" to "path"
              if (updatedPathKey.includes(`{${paramName}}`)) {
                parameter.in = 'path'
              }
            }
          })
        }
      }
    }
  }

  // Step 3: Apply transformations directly to the object
  updateParameterInField(openApiData.paths)

  // Step 4: Write the modified content back to the input file (replacing the original file)
  fs.writeFileSync(DIST_FILE, JSON.stringify(openApiData, null, 2))

  console.log(`File ${INPUT_FILE} has been updated.`)
}
