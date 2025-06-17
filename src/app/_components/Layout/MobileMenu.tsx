"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"


const MovileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 p-2 flex flex-col justify-center items-center w-12 h-12 rounded-lg hover:bg-white/5"
        aria-label="Toggle menu"
      >
        <div className="flex flex-col gap-1.5 items-center">
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-[#080063]/95 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#080063] z-40 shadow-xl border-l border-white/10"
            >
              <div className="flex flex-col pt-24 px-6">
                <div className="flex flex-col gap-8">
                  <a 
                    href="#" 
                    className="text-xl font-medium hover:text-blue-400 transition-colors flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    SALT
                  </a>
                  <a 
                    href="#" 
                    className="text-xl font-medium hover:text-blue-400 transition-colors flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Ecosystem
                  </a>
                  <a 
                    href="#" 
                    className="text-xl font-medium hover:text-blue-400 transition-colors flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Resources
                  </a>
                  <a 
                    href="#" 
                    className="text-xl font-medium hover:text-blue-400 transition-colors flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Milestone
                  </a>
                  <a 
                    href="#" 
                    className="text-xl font-medium hover:text-blue-400 transition-colors flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default MovileMenu;
