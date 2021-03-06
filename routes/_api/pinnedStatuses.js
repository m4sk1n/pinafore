import { getWithTimeout, paramsString } from '../_utils/ajax'
import { auth, basename } from './utils'

export async function getPinnedStatuses (instanceName, accessToken, accountId) {
  let url = `${basename(instanceName)}/api/v1/accounts/${accountId}/statuses`
  url += '?' + paramsString({
    limit: 40,
    pinned: true
  })
  return getWithTimeout(url, auth(accessToken))
}
