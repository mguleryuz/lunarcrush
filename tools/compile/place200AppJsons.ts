import path from 'path'
import fs from 'fs'
import readPath from '../readPath'
import { convertToUrlSchema } from './pathNameFormats'

type PATH = {
  get: {
    description: string
    responses: {
      [statusCode: string]: {
        description: string
        content: {
          [contentType: string]: any
        }
      }
    }
    parameters: any[]
  }
}

export default async function main({
  RESPONSES_200_DIR,
  DIST_FILE,
}: {
  DIST_FILE: string
  RESPONSES_200_DIR: string
}) {
  // Step 1: Read the JSON file and parse it
  const DIST_FILE_DATA = JSON.parse(fs.readFileSync(DIST_FILE, 'utf-8'))

  // Step 2: Iterate over the files in the responses/200 directory
  await readPath(
    {
      startPath: RESPONSES_200_DIR,
      extName: 'json',
    },
    (itemPath) => {
      const RESPONSES_200_DATA = JSON.parse(fs.readFileSync(itemPath, 'utf-8'))

      const fileBaseName = path.basename(itemPath, '.json')
      const fileUrlSchemaName = `/public/${convertToUrlSchema(fileBaseName)}`

      // Step 3: Locate the json block for fileUrlSchemaName and add the-
      // RESPONSES_200_DATA to the DIST_FILE_DATA

      // Find the json block
      const jsonBlock: PATH = DIST_FILE_DATA.paths[fileUrlSchemaName]

      // If the json block exists, add the RESPONSES_200_DATA to it
      if (jsonBlock) {
        // Add the RESPONSES_200_DATA to the json block
        jsonBlock.get.responses['200'].content = RESPONSES_200_DATA
      }

      return
    }
  )

  // Step 4: Write the modified content back to the input file (replacing the original file)
  fs.writeFileSync(DIST_FILE, JSON.stringify(DIST_FILE_DATA, null, 2))
}
