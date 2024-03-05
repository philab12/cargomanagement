import { Link } from "react-router-dom"
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa6"

export default function AdminFooter(){
    return (
        <>
            <section className="flex justify-between my-8 p-10 bg-white rounded-md">
                <div className="flex flex-col lg:flex-row gap-10">
                    <Link to="/">Terms and conditions</Link>
                    <Link to="/">Privacy Policy</Link>
                    <Link to="/">Licensing</Link>
                    <Link to="/">Cookie Policy</Link>
                    <Link to="/">Contact</Link>
                </div>
                <div className="flex flex-row gap-4 text-xl text-gray900">
                    <Link className="hover:text-blue-800">
                        <FaFacebook/>
                    </Link>
                    <Link className="hover:text-red-700">
                        <FaInstagram/>
                    </Link>
                    <Link className="hover:text-blue-500">
                        <FaTwitter/>
                    </Link>
                    <Link className="hover:text-passionBlack">
                        <FaGithub/>
                    </Link>
                </div>
            </section>
        </>
    )
}