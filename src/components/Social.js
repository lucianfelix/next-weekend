/* buttons for twitter, facebook, instagram, and youtube */
import Link from "next/link";

export default async function Social() {
    return (
        <div className="">
            <Link href="#facebookwknd"
                  className="inline-block w-10 h-10 bg-black hover:bg-yellow text-amber-50 pt-1">f</Link>
            <Link href="#twitter"
                  className="inline-block w-10 h-10 bg-black hover:bg-yellow text-amber-50 pt-1">X</Link>
            <Link href="#instagram"
                  className="inline-block w-10 h-10 bg-black hover:bg-yellow text-amber-50 pt-1">Ins</Link>
        </div>
    )
}
