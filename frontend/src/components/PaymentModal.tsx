type Props = {
  open: boolean;
  onClose: () => void;
};

export const PaymentModal = ({ open, onClose }: Props) => {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 12, padding: 16, marginTop: 80 }}>
        <h3>Upgrade options</h3>
        <p>HD export: 100 Stars</p>
        <p>Pro monthly: 500 Stars</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
