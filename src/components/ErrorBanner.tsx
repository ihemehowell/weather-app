interface Props { message: string }

export default function ErrorBanner({ message }: Props) {
  return (
    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
      {message}
    </div>
  );
}
