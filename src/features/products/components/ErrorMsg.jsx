export default function ErrorMsg({ message }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">¡Ocurrió un error! </strong>
      <span className="block sm:inline">{message || "No se pudieron cargar los datos."}</span>
    </div>
  );
}