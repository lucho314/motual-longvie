import { FC, useState, ChangeEvent } from "react";
import { Modal, Button, Label, FileInput } from "flowbite-react";

interface UploadExcelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

const UploadExcelModal: FC<UploadExcelModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      onClose();
      setSelectedFile(null);
    }
  };

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
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="primary" onClick={handleUpload} disabled={!selectedFile}>
          Subir
        </Button>
        <Button color="gray" onClick={onClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadExcelModal;
