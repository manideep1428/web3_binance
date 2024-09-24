"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { Button } from "@/components/ui/button"

export default function GoogleSignIn() {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <motion.div
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex justify-center mb-8"
          variants={itemVariants}
        >
          <FcGoogle className="w-16 h-16" />
        </motion.div>
        <motion.h1 
          className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white"
          variants={itemVariants}
        >
          Sign in with Google
        </motion.h1>
        <motion.p 
          className="text-center text-gray-600 dark:text-gray-400 mb-8"
          variants={itemVariants}
        >
          Use your Google account to sign in securely and quickly.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Button 
            variant="default"
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={async () => await signIn('google')}
          >
            <FcGoogle className="w-5 h-5 bg-white rounded-full" />
            <span>Continue with Google</span>
          </Button>
        </motion.div>
        <motion.p 
          variants={itemVariants}
          className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400"
        >
          By continuing, you agree to our 
          <a href="#" className="text-blue-500 hover:underline ml-1">Terms of Service</a> and 
          <a href="#" className="text-blue-500 hover:underline ml-1">Privacy Policy</a>.
        </motion.p>
      </motion.div>
    </div>
  )
}