const replaceAll = (str: string, find: string, replace: string): string => {
  return str.split(find).join(replace)
}

export const convertToFileName = (url: string): string => {
  // Replace "/" with "#" and keep "{" and "}" unchanged
  let fileName = replaceAll(url, '/', '#')

  // Optionally, remove leading/trailing "#" if present
  fileName = fileName.replace(/^#|#$/g, '')

  return fileName
}

export const convertToUrlSchema = (fileName: string): string => {
  // Replace "#" back with "/"
  return replaceAll(fileName, '#', '/')
}
