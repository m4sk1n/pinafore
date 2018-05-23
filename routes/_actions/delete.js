import { store } from '../_store/store'
import { deleteStatus } from '../_api/delete'
import { toast } from '../_utils/toast'

export async function doDeleteStatus (statusId) {
  let { currentInstance, accessToken } = store.get()
  try {
    await deleteStatus(currentInstance, accessToken, statusId)
    toast.say('Usunięto wpis.')
  } catch (e) {
    console.error(e)
    toast.say('Nie udało się usunąć wpisu: ' + (e.message || ''))
  }
}
