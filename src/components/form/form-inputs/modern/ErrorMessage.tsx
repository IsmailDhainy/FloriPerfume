export const ErrorMessage: React.FC<{
  error?: boolean | { message?: string };
}> = ({ error }) => {
  if (!error) return null;
  if (typeof error === "boolean") return null; // If error is a boolean, no message to display
  return (
    <p className="mt-1 text-sm font-medium text-red-500">{error.message}</p>
  );
};
