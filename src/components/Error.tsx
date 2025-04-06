export default function Error({children}: {children: React.ReactNode}) {
    return (
        <p className="text-center bg-red-500 border border-red-600 text-red-700 px-2 py-1 rounded relative mb-2 mt-2 text-white uppercase">
            {children}
        </p>
    )
}