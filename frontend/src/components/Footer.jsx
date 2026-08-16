import { FaGithub } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";

const footerLinks = [
    { label: "Command Home", href: "#" },
    { label: "Fleet", href: "#fleet" },
    { label: "Imperatives", href: "#imperatives" },
    { label: "Login", href: "#" },
];

const Footer = () => {
    return (
        <footer className="relative w-[75%] mx-auto bg-transparent border-t border-white/10 font-sans">

            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent opacity-40" />


            <div className="px-6 md:px-16 lg:px-24 py-14">
                <div className="flex flex-col md:flex-row justify-between gap-12">


                    <div className="max-w-xs">

                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-md flex items-center justify-center text-sm font-bold bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] tracking-wider">
                                HAL
                            </div>
                            <span className="text-white font-semibold text-sm tracking-wide">
                                Hindustan Aeronautics
                            </span>
                        </div>
                        <p className="text-xs leading-relaxed text-gray-400">
                            Design, manufacture and lifecycle support of combat aircraft,
                            rotary platforms and aero-engines — engineered in India.
                        </p>


                        <span className="inline-block mt-5 text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1 rounded-full border border-[#00D4FF]/25 text-[#00D4FF] bg-[#00D4FF]/5">
                            Atmanirbhar Bharat
                        </span>
                    </div>


                    <div>
                        <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-5 text-white/30">
                            Navigation
                        </p>
                        <ul className="flex flex-col gap-3">
                            {footerLinks.map((l) => (
                                <li key={l.label}>
                                    <a
                                        href={l.href}
                                        className="text-sm flex items-center gap-1.5 group text-gray-400 hover:text-[#00D4FF] transition-colors duration-200 ease-in-out"
                                    >
                                        {l.label}
                                        <HiArrowUpRight
                                            size={11}
                                            className="opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100"
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-4">
                        <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/30">
                            Developed by
                        </p>
                        <p className="text-sm font-semibold text-white tracking-wide">
                            Nitin Kumar Yadav
                        </p>
                        <a
                            href="https://github.com/Nitin-kumar-yadav"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-gray-300 transition-all duration-200 ease-in-out hover:bg-[#00D4FF]/10 hover:border-[#00D4FF]/30 hover:text-[#00D4FF]"
                        >
                            <FaGithub size={15} />
                            GitHub
                        </a>
                    </div>
                </div>
            </div>


            <div className="px-6 md:px-16 lg:px-24 py-4 flex flex-col md:flex-row items-center justify-between gap-2 border-t border-white/5">
                <p className="text-xs text-white/25">
                    © 2026 Hindustan Aeronautics Limited. All rights reserved.
                </p>
                <p className="text-xs text-white/20">
                    Sector 01 · Aerospace Command · India
                </p>
            </div>
        </footer>
    );
};

export default Footer;