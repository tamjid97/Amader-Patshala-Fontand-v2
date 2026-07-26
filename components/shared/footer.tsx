import Link from "next/link";
import { Dna, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-20 w-full border-t border-emerald-200/40 bg-gradient-to-r from-[#a7f3d0]/40 via-[#ecfdf5]/60 to-[#a7f3d0]/40 backdrop-blur-md transition-colors duration-300 dark:border-emerald-950/50 dark:from-[#05130e]/60 dark:via-[#030a08]/70 dark:to-[#05130e]/60">
      
      <div className="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16">
        
        {/* 🌟 Main Footer Content */}
        <div className="grid grid-cols-1 gap-10 pb-12 md:grid-cols-3 md:gap-8">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-5">
            <Link href="/" className="group flex items-center gap-2.5 w-fit z-10">
              <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-600/90 text-white shadow-sm transition-transform duration-500 group-hover:rotate-180 dark:bg-emerald-600">
                <Dna className="size-5" />
              </span>
              <span className="text-lg font-extrabold tracking-tight text-emerald-950 transition-colors duration-300 group-hover:text-emerald-700 dark:text-emerald-50 dark:group-hover:text-emerald-300">
                Roots Of Biology
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-emerald-900/70 dark:text-emerald-300/70">
              বাংলাদেশের অন্যতম সেরা বায়োলজি লার্নিং প্ল্যাটফর্ম। সহজে, সৃজনশীলভাবে এবং একদম প্র্যাক্টিক্যালি শিখুন আপনার প্রিয় বিষয়গুলো।
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/60 text-emerald-800 shadow-sm transition-all hover:bg-emerald-600 hover:text-white dark:bg-black/20 dark:text-emerald-300 dark:hover:bg-emerald-600 dark:hover:text-white">
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/60 text-emerald-800 shadow-sm transition-all hover:bg-emerald-600 hover:text-white dark:bg-black/20 dark:text-emerald-300 dark:hover:bg-emerald-600 dark:hover:text-white">
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/60 text-emerald-800 shadow-sm transition-all hover:bg-emerald-600 hover:text-white dark:bg-black/20 dark:text-emerald-300 dark:hover:bg-emerald-600 dark:hover:text-white">
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-5 md:px-8">
            <h3 className="text-base font-bold text-emerald-950 dark:text-emerald-50">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "Dashboard", "Analytics", "Projects", "Contact"].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-sm font-medium text-emerald-900/70 transition-colors hover:text-emerald-950 dark:text-emerald-300/70 dark:hover:text-emerald-100"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="space-y-5">
            <h3 className="text-base font-bold text-emerald-950 dark:text-emerald-50">Contact Us</h3>
            <ul className="space-y-4 text-sm font-medium text-emerald-900/70 dark:text-emerald-300/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>Khulna, Khulna Division, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>+880 1XXX-XXXXXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>support@amaderpathshala.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* 🌟 Bottom Bar / Copyright & Creator Credit */}
        <div className="flex flex-col items-center justify-center gap-3 border-t border-emerald-200/40 py-8 text-center dark:border-emerald-950/50">
          
          <p className="text-sm font-semibold text-emerald-900/70 dark:text-emerald-300/70">
            © 2026 আমাদের পাঠশালা. All rights reserved.
          </p>
          
          {/* Creator Credit */}
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-200/40 bg-white/50 px-5 py-1.5 text-xs font-medium shadow-sm backdrop-blur-sm dark:border-emerald-900/40 dark:bg-black/20">
            <span className="text-emerald-900/70 dark:text-emerald-300/70">Website created by</span>
            <Link
              href="https://epickdev.vercel.app" 
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-700 transition-all hover:text-emerald-950 hover:underline dark:text-emerald-400 dark:hover:text-emerald-100"
            >
              S M Tamjid Hossain Epick
            </Link>
          </div>

        </div>
        
      </div>
    </footer>
  );
}