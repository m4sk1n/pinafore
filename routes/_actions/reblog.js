import { store } from '../_store/store'
import { toast } from '../_utils/toast'
import { reblogStatus, unreblogStatus } from '../_api/reblog'
import { setStatusReblogged as setStatusRebloggedInDatabase } from '../_database/timelines/updateStatus'

export async function setReblogged (statusId, reblogged) {
  let online = store.get()
  if (!online) {
    toast.say(`Nie możesz ${reblogged ? 'podbić' : 'cofnąć podbicia'}, kiedy jesteś offline.`)
    return
  }
  let { currentInstance, accessToken } = store.get()
  let networkPromise = reblogged
    ? reblogStatus(currentInstance, accessToken, statusId)
    : unreblogStatus(currentInstance, accessToken, statusId)
  store.setStatusReblogged(currentInstance, statusId, reblogged) // optimistic update
  try {
    await networkPromise
    await setStatusRebloggedInDatabase(currentInstance, statusId, reblogged)
  } catch (e) {
    console.error(e)
    toast.say(`Nie udało się ${reblogged ? 'podbić' : 'cofnąć podbicia'}. ` + (e.message || ''))
    store.setStatusReblogged(currentInstance, statusId, !reblogged) // undo optimistic update
  }
}
