'use client'

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Menu } from "lucide-react"
import Image from "next/image"
// import PopoverPage from "./NotiPopover"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Navbar = () => {
  const { user } = useUser()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleNavigation = (path: string) => {
    router.push(path)
    setIsOpen(false)
  }

  return (
    <div className='flex sticky items-center justify-between p-3 px-4 md:px-8'>
      <div className='text-lg cursor-pointer flex items-center gap-3' onClick={() => router.push("/")}>
        BIDNEST
          <Image
            className="text-white"
            src={'/logo.png'}
            height={25}
            width={25}
            alt="Logo"
          />
      </div>
      <div>
        {user ? (
          <>
            <div className="md:flex gap-4 hidden md:gap-5">
              <Button onClick={() => router.push('/all-auctions')} className="transition-all bg-white text-black hover:bg-white px-6 py-2 rounded-lg border-red-500 border-l-2 border-t-2 border-b-[4px] border-r-2 hover:border-r-4 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:translate-y-[2px]">
                All Auctions
              </Button>
              <Button onClick={() => router.push('/my-bids')} className="transition-all bg-white text-black hover:bg-white px-6 py-2 rounded-lg border-red-500 border-l-2 border-t-2 border-b-[4px] border-r-2 hover:border-r-4 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:translate-y-[2px]">
                My Bids
              </Button>
              <Button onClick={() => router.push('/my-auctions')} className="transition-all bg-white text-black hover:bg-white px-6 py-2 rounded-lg border-red-500 border-l-2 border-t-2 border-b-[4px] border-r-2 hover:border-r-4 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:translate-y-[2px]">
                My Auctions
              </Button>
            </div>
          </>
        ) : (
          <div></div>
        )}
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex items-center gap-7">
              <div className="hidden md:flex mt-0.5">
                {/* <PopoverPage /> */}
              </div>
              <UserButton />
            </div>
            <div className="flex md:hidden">
              {/* <PopoverPage /> */}
            </div>
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button>
                    <Menu />
                  </Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col">
                  <SheetTitle>
                    <VisuallyHidden>Menu</VisuallyHidden>
                  </SheetTitle>

                  <Button onClick={() => handleNavigation("/all-auctions")} variant={"link"}>
                    All Auctions
                  </Button>
                  <Button onClick={() => handleNavigation("/my-bids")} variant={"link"}>
                    My Bids
                  </Button>
                  <Button onClick={() => handleNavigation("/my-auctions")} variant={"link"}>
                    My Auctions
                  </Button>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 md:gap-4">
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button variant={"ghost"}>Sign Up</Button>
            </SignUpButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
