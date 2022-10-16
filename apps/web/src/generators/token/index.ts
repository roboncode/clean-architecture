import { EnumToken, parseEnum } from './enumTokenizer'
import { ModelToken, parseModel } from './modelTokenizer'
import { isComment, isEnum, isModel } from './helpers'

import { Iterator } from './iterator'

export const generateTokens = (input: string) => {
  const lines = input.split('\n')
  const linesIter = new Iterator(lines)
  const enumTokens: EnumToken[] = []
  const modelTokens: ModelToken[] = []

  while (linesIter.hasNext()) {
    const line = linesIter.next().value
    if (isComment(line)) {
      continue
    }
    if (isEnum(line)) {
      const token = parseEnum(line, linesIter)
      enumTokens.push(token)
    }
    if (isModel(line)) {
      const token = parseModel(line, linesIter)
      modelTokens.push(token)
    }
  }
  return JSON.parse(JSON.stringify({ enumTokens, modelTokens }))
}

// @id @unique @@index @@unique
// type deleteProject_id = string
// type deleteProject_fbAccountId_fbClientId_fbBidId = { fbAccountId: string, fbClientId: string, fbBidId: string }
// type deleteProject_orgId_id = { orgId: string, id: string }
// const deleteProject = (opts: deleteProject_id | deleteProject_fbAccountId_fbClientId_fbBidId | deleteProject_orgId_id) => {
//   if (typeof opts === 'string') {
//   }
//   if (typeof opts === 'object') {
//     if ('fbAccountId' in opts && 'fbClientId' in opts && 'fbBidId' in opts) {
//       return {
//         fbAccountId: opts.fbAccountId,
//         fbClientId: opts.fbClientId,
//         fbBidId: opts.fbBidId,
//       }
//     }
//     if ('orgId' in opts && 'id' in opts) {
//       return {
//         fbAccount: opts.orgId,
//         fbClientId: opts.id,
//       }
//     }
//   }
//   return opts
// }
