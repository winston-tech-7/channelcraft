export const Settings = () => {
  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        padding: "18px 16px",
        borderRadius: 18,
        background: "rgba(255, 255, 255, 0.06)",
        border: "1px solid rgba(255, 255, 255, 0.1)"
      }}
    >
      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#f8fafc" }}>Settings</h2>
      <p style={{ margin: 0, color: "rgba(248, 250, 252, 0.8)" }}>Subscription: Free</p>
      <p style={{ margin: 0, color: "rgba(248, 250, 252, 0.8)" }}>Daily usage: 0 / 3 free generations</p>
      <p style={{ margin: 0, color: "rgba(248, 250, 252, 0.65)", fontSize: 14, lineHeight: 1.5 }}>
        Payment history is available in bot receipts.
      </p>
    </div>
  );
};
