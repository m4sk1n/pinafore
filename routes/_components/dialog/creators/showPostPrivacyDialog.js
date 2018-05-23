import PostPrivacyDialog from '../components/PostPrivacyDialog.html'
import { createDialogElement } from '../helpers/createDialogElement'
import { createDialogId } from '../helpers/createDialogId'

export default function showPostPrivacyDialog (realm) {
  let dialog = new PostPrivacyDialog({
    target: createDialogElement(),
    data: {
      id: createDialogId(),
      label: 'Dialog prywatności wpisu',
      title: 'Post privacy',
      realm: realm
    }
  })
  dialog.show()
}
