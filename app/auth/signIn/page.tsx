// 'use client'

// import { signIn } from 'next-auth/react'
// import { useSearchParams } from 'next/navigation'
// import { useState } from 'react'

// export default function SignIn() {
//   const searchParams = useSearchParams()
//   const callbackUrl = searchParams.get('callbackUrl') || '/'
//   const [error, setError] = useState<string | null>(null)

//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signIn('google', { callbackUrl })
//       if (result?.error) {
//         setError(result.error)
//       }
//     } catch (error) {
//       setError('An unexpected error occurred')
//     }
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
//         <h3 className="text-2xl font-bold text-center">Sign in to your account</h3>
//         {error && (
//           <div className="mt-4 p-2 bg-red-100 text-red-600 rounded">
//             {error}
//           </div>
//         )}
//         <div className="mt-4">
//           <button
//             onClick={handleGoogleSignIn}
//             className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
//           >
//             Sign in with Google
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

export default function Testing(){
  return <div>This is in Testing</div>
}