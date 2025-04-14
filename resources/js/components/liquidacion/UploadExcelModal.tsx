import { FC, useState, ChangeEvent, useRef } from 'react'
import { Modal, Button, Label, FileInput } from 'flowbite-react'

interface UploadExcelModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (file: File) => void
}

const UploadExcelModal: FC<UploadExcelModalProps> = ({
  isOpen,
  onClose,
  onUpload
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    setSelectedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    if (selectedFile) {
      onUpload(selectedFile)
      onClose()
      setSelectedFile(null)
    }
  }

  const handleCancel = () => {
    setSelectedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    onClose()
  }

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
        <strong>Subir archivo de Liquidación</strong>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <div>
            <Label htmlFor="excelFile">Archivo Excel</Label>
            <FileInput
              id="excelFile"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              className="mt-2"
              ref={fileInputRef}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="primary" onClick={handleUpload} disabled={!selectedFile}>
          Subir
        </Button>
        <Button color="gray" onClick={handleCancel}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UploadExcelModal
