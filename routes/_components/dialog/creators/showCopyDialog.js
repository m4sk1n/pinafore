import CopyDialog from '../components/CopyDialog.html'
import { createDialogElement } from '../helpers/createDialogElement'
import { createDialogId } from '../helpers/createDialogId'

export default function showCopyDialog (text) {
  let dialog = new CopyDialog({
    target: createDialogElement(),
    data: {
      id: createDialogId(),
      label: 'Dialog kopiowania',
      title: 'Skopiuj odnośnik',
      text
    }
  })
  dialog.show()
}
