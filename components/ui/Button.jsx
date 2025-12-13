export default function Button({ children, variant = 'primary' }) {
  const styles = variant === 'primary' 
    ? 'bg-blue-600 text-white' 
    : 'bg-gray-200 text-gray-800'
  
  return (
    <button className={`${styles} px-6 py-2 rounded-lg hover:opacity-90`}>
      {children}
    </button>
  )
}