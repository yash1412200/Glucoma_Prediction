interface Props {
  status: "Normal" | "Detected";
}

export function StatusBadge({ status }: Props) {
  const isNormal = status === "Normal";

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${
        isNormal
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {status}
    </span>
  );
}