import { promises as fs } from 'fs'

export default async function main({ DIST_FILE }: { DIST_FILE: string }) {
  try {
    // Step 1: Read the file as a raw string asynchronously
    let fileContent = await fs.readFile(DIST_FILE, 'utf-8')

    // Step 2: Define unwanted types and their replacements
    const unwantedTypes = [{ value: 'timestamp', replacement: 'string' }]

    // Step 3: Loop through each unwanted type and apply the replacement in the string
    unwantedTypes.forEach(({ value, replacement }) => {
      // Enhanced regex: Only replace occurrences where "type": "<unwanted>"
      const regex = new RegExp(`"type"\\s*:\\s*"(?:${value})"`, 'g')

      const matches = fileContent.match(regex)
      if (matches) {
        console.log(
          `Found ${matches.length} occurrences of "type": "${value}".`
        )
      } else {
        console.log(`No occurrences of "type": "${value}" found.`)
      }

      // Perform the replacement only for "type": "unwanted"
      fileContent = fileContent.replace(regex, `"type": "${replacement}"`)
    })

    // Step 4: Write the modified content back to the file asynchronously
    await fs.writeFile(DIST_FILE, fileContent)

    console.log(`Replacements made and written to ${DIST_FILE}`)
  } catch (error: any) {
    console.error(`Error processing file: ${error.message}`)
  }
}
