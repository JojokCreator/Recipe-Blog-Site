import React, { useContext, useState, useEffect } from 'react';
import Link from "next/link"
import { getCategories } from '../services';
import { FaYoutube, FaInstagram, FaFacebookF } from 'react-icons/fa/';

interface Categories {
    name: string;
    slug: string;
}

const Header = () => {
    const [categories, setCategories] = useState<Categories[]>([])

    useEffect(() => {
        getCategories()
            .then((newCategories) => setCategories(newCategories))
    }, []);

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="border-b w-full flex justify-between border-blue-400 py-8 ">
                <div className="md:float-left flex">
                    <Link href="/">
                        <span className="flex cursor-pointer font-bold text-4xl text-white">Barefoot Chef Blog </span>
                    </Link>
                    </div>
                    <div className="flex text-4xl text-white ml-4">
                        <Link href="/youtube.com">
                            <div className="hover:cursor-pointer hover:opacity-80 ml-2"><FaYoutube /></div>
                        </Link>
                        <Link href="/instagram.com">
                        <div className="hover:cursor-pointer hover:opacity-80 ml-2"><FaInstagram /></div>
                        </Link>
                        <Link href="/facebook.com">
                        <div className="hover:cursor-pointer hover:opacity-80 ml-2"><FaFacebookF /></div>
                        </Link>
                </div>
                <div className="hidden md:float-left md:contents">
                    {categories.map((category) => (
                        <Link key={category.slug} href={`/category/${category.slug}`}>
                            <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Header