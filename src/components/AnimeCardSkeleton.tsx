export default function AnimeCardSkeleton() {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        margin: "5px",
        padding: "10px",
        width: "150px",
      }}
    >
      <div
        style={{
          backgroundColor: "#eee",
          width: "100%",
          height: "200px",
          marginBottom: "10px",
        }}
      />
      <div
        style={{
          backgroundColor: "#eee",
          height: "20px",
          marginBottom: "5px",
        }}
      />
      <div
        style={{
          backgroundColor: "#eee",
          height: "20px",
          width: "50%",
        }}
      />
    </div>
  );
}
