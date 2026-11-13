export default function Feedback({ children, error = false }) {
  return <p role={error ? "alert" : "status"}>{children}</p>;
}
