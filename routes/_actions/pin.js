import { store } from '../_store/store'
import { toast } from '../_utils/toast'
import { pinStatus, unpinStatus } from '../_api/pin'
import { setStatusPinned as setStatusPinnedInDatabase } from '../_database/timelines/updateStatus'
import { emit } from '../_utils/eventBus'

export async function setStatusPinnedOrUnpinned (statusId, pinned, toastOnSuccess) {
  let { currentInstance, accessToken } = store.get()
  try {
    if (pinned) {
      await pinStatus(currentInstance, accessToken, statusId)
    } else {
      await unpinStatus(currentInstance, accessToken, statusId)
    }
    if (toastOnSuccess) {
      if (pinned) {
        toast.say('Przypięto wpis')
      } else {
        toast.say('Cofnięto przypięcie wpisu')
      }
    }
    await setStatusPinnedInDatabase(currentInstance, statusId, pinned)
    emit('updatePinnedStatuses')
  } catch (e) {
    console.error(e)
    toast.say(`Nie udało się${pinned ? 'przypiąć' : 'cofnąć przypięcia'} wpisu: ` + (e.message || ''))
  }
}
