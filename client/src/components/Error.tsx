export default function Error({ message }: { message: string }) {
  return (
    <p className="text-red-600 bg-red-100 py-2 px-4 rounded-md text-center mt-4">
      {message}
    </p>
  );
}
