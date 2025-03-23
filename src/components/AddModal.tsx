interface AddModalProps {
  onClose: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ onClose }) => {
  return (
    <div>
      AddModal
      <button onClick={onClose}>Отмена</button>
    </div>
  );
};

export default AddModal;
