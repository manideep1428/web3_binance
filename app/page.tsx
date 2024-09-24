"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Bitcoin, LineChart, LockKeyholeOpen , BrainCircuit} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function CryptoLanding() {
  const controls = useAnimationControls();
  const router = useRouter();
  const session = useSession();

  if(session.status === "authenticated") {
    router.push("/markets");
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  useEffect(() => {
    controls.start({
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "linear",
      },
    });
  }, [controls]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-200 dark:border-gray-800"
      >
        <Link className="flex items-center justify-center" href="#">
          <Bitcoin className="h-6 w-6 text-yellow-500" />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="ml-2 font-bold"
          >
            WebCrypto.ai
          </motion.span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {["Features", "Pricing", "About", "Contact"].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="#"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-white">
          <div className="container px-4 md:px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center space-y-4 text-center"
            >
              <motion.div variants={itemVariants} className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  <motion.span
                    animate={controls}
                    className="inline-block bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent bg-300% relative"
                  >
                    {" WebCrypto.ai".split("").map((char, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>
                </h1>
                <motion.p
                  variants={itemVariants}
                  className="mx-auto max-w-[700px] text-gray-400 md:text-xl"
                >
                  Your gateway to learn cryptocurrencies. Trade, invest, and
                  grow your digital assets with help of AI.
                </motion.p>
              </motion.div>
              <motion.div variants={itemVariants} className="space-x-4">
                <Button
                  onClick={() => router.push("/auth/signin")}
                  className="bg-yellow-500 text-black hover:bg-yellow-600"
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-black"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
            >
              Our Features
            </motion.h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid gap-6 lg:grid-cols-3 lg:gap-12"
            >
              {[
                {
                  icon: LineChart,
                  title: "Real-time Trading ",
                  description:
                    "Trade with Dummy cash to learn about crypto and trading.",
                },
                {
                  icon: LockKeyholeOpen,
                  title: "Open Source",
                  description:
                    "It's is an OpenSource Project . So ,You have full control over your data and assets",
                },
                {
                  icon: BrainCircuit,
                  title: "AI-powered",
                  description:
                    "It AI powered you can track the trading stratergies and train the model with that data",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex flex-col items-center space-y-4 text-center"
                >
                  <feature.icon className="h-12 w-12 text-yellow-500" />
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
            >
              <motion.div variants={itemVariants} className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Start Your Crypto Journey
                </h2>
                <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of traders and investors who trust CryptoHub
                  for their cryptocurrency needs. Get started in minutes.
                </p>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex flex-col space-y-4"
              >
                <Button
                  onClick={() => router.push("/auth/signin")}
                  className="bg-yellow-500 text-black hover:bg-yellow-600 max-w-lg"
                >
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 dark:border-gray-800"
      >
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 WebCrypto.ai. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </motion.footer>
    </div>
  );
}
