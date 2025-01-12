// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Input } from "@/components/ui/input";
// import { Search, UserPlus, Bell } from "lucide-react";
// import { ModeToggle } from "./mode-toggle";
// import { Button } from "@/components/ui/button";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// export function Header({ activeSection }: { activeSection: string }) {
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const router = useRouter();
//   const { data: session, status } = useSession();
//   console.log(session?.user?.name);
//   console.log(session?.user?.image);
//   console.log(status);

//   const handleSignUpClick = () => {
//     router.push("/dashboard/profile");
//   };
//   return (
//     <header className="flex items-center justify-between border-b bg-card p-4">
//       <div className="flex items-center space-x-4">
//         {activeSection === "dashboard" && (
//           <motion.h2
//             className="text-2xl font-semibold text-primary"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             Welcome to TaskOptimy!
//           </motion.h2>
//         )}
//         {activeSection !== "dashboard" && (
//           <h2 className="text-2xl font-semibold capitalize">{activeSection}</h2>
//         )}
//       </div>
//       <div className="flex items-center space-x-4">
//         <motion.div
//           className="relative"
//           initial={false}
//           animate={{ width: isSearchOpen ? "auto" : 0 }}
//         >
//           <Input
//             type="search"
//             placeholder="Search..."
//             className={`w-full ${isSearchOpen ? "opacity-100" : "opacity-0"}`}
//           />
//         </motion.div>
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={() => setIsSearchOpen(!isSearchOpen)}
//         >
//           <Search className="h-5 w-5" />
//         </Button>
//         <Button variant="ghost" size="icon">
//           <Bell className="h-5 w-5" />
//         </Button>
//         {status === "authenticated" ? (
//           <div>
//             <Image
//               src={session?.user?.image || "/vercel.svg"}
//               alt="image of the user"
//               width={50}
//               height={30}
//             />
//             <span>{session?.user?.name}</span>
//           </div>
//         ) : (
//           <Button variant="outline" size="sm" onClick={handleSignUpClick}>
//             <UserPlus className="h-4 w-4 mr-2" />
//             Sign Up
//           </Button>
//         )}
//         <ModeToggle />
//       </div>
//     </header>
//   );
// }
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Bell } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function Header({ activeSection }: { activeSection: string }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleProfileClick = () => {
    router.push("/dashboard/profile");
  };

  return (
    <header className="flex items-center justify-between border-b bg-card p-4">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {activeSection === "dashboard" ? (
          <motion.h2
            className="text-2xl font-semibold text-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to TaskOptimy!
          </motion.h2>
        ) : (
          <h2 className="text-2xl font-semibold capitalize">{activeSection}</h2>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <motion.div
          className="relative"
          initial={false}
          animate={{ width: isSearchOpen ? "auto" : 0 }}
        >
          <Input
            type="search"
            placeholder="Search..."
            className={`transition-all ${
              isSearchOpen ? "opacity-100 w-full" : "opacity-0 w-0"
            }`}
          />
        </motion.div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <Search className="h-5 w-5" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        {/* Authentication Section */}
        {status === "authenticated" ? (
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={handleProfileClick}
          >
            <Image
              src={session?.user?.image || "/vercel.svg"}
              alt={`${session?.user?.name}'s profile picture`}
              width={35}
              height={35}
              className="rounded-full"
            />
            <span className="font-medium">
              {" "}
              {session?.user?.name?.split(" ")[0]}
            </span>
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={handleProfileClick}>
            <UserPlus className="h-4 w-4 mr-2" />
            Sign Up
          </Button>
        )}

        {/* Mode Toggle */}
        <ModeToggle />
      </div>
    </header>
  );
}
