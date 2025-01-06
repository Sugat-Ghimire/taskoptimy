export default function DashboardLoading() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-b from-blue-300 to-blue-500">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-blue-200 border-blue-400 border-solid rounded-full animate-spin mb-4 mx-auto"></div>
        <h2 className="text-3xl font-semibold text-white">
          Loading TaskOptimy...
        </h2>
        <p className="mt-2 text-blue-200">Preparing your dashboard</p>
      </div>
    </div>
  );
}
