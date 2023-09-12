import React from "react";
import AvatarCard from "@/components/AvatarCard";

const authors = [
    {
        name: "Stacey Roswells",
        role: "Artist | Photographer | Traveler",
        imageUrl: "https://wknd.site/content/experience-fragments/wknd/language-masters/en/contributors/stacey-roswells/master/_jcr_content/root/container/image.coreimg.75.1200.jpeg/1660323785093/stacey-roswells.jpeg"
    },
    {
        name: "Jake Hammer",
        role: "Influencer | Writer",
        imageUrl: "https://wknd.site/content/experience-fragments/wknd/language-masters/en/contributors/jake-hammer/master/_jcr_content/root/container/image.coreimg.75.1200.jpeg/1660323785595/alex-iby-343837.jpeg"
    },
    {
        name: "Ian Provo",
        role: "Photographer",
        imageUrl: "https://wknd.site/content/experience-fragments/wknd/language-masters/en/contributors/ian-provo/master/_jcr_content/root/container/image.coreimg.75.1200.jpeg/1660323783653/ian-provo.jpeg"
    },
    {
        name: "Jacob Wester",
        role: "Skater | Writer",
        imageUrl: "https://wknd.site/content/experience-fragments/wknd/language-masters/en/contributors/jacob-wester/master/_jcr_content/root/container/image.coreimg.75.1200.jpeg/1660323792237/jacob-wester.jpeg"
    },
]

const guides = [
    {
        name: "Sofia Sjöberg",
        role: "Photographer | Youtuber",
        imageUrl: "https://wknd.site/content/experience-fragments/wknd/language-masters/en/contributors/sofia-sjoeberg/master/_jcr_content/root/container/image.coreimg.75.1200.jpeg/1660323785351/ayo-ogunseinde-237739.jpeg"
    },
    {
        name: "Justin Barr",
        role: "Artist | Rock Climber",
        imageUrl: "https://wknd.site/content/experience-fragments/wknd/language-masters/en/contributors/justin-barr/master/_jcr_content/root/container/image.coreimg.75.1200.jpeg/1660323786548/justin-barr.jpeg"
    },
    {
        name: "Kumar Selveraj",
        role: "Photographer | Surfer",
        imageUrl: "https://wknd.site/content/experience-fragments/wknd/language-masters/en/contributors/kumar-selveraj/master/_jcr_content/root/container/image.coreimg.75.1200.jpeg/1660323783843/kumar-selvaraj.jpeg"
    },
]

export default function AboutUs() {
    return (
        <main className="bg-white text-lg">
            <div className="max-w-[1154px] mx-auto p-10 space-y-8">
                <h1 className="border-5 border-b-yellow">About Us</h1>
                <h2 className="border-5 border-b-yellow">Our Contributors</h2>
                <div className="italic text-sm">
                    Meet the outstanding individuals responsible for bringing you the most compelling stories across the
                    globe.
                </div>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {authors.map((author, i) => (
                        <AvatarCard
                            key={i}
                            imageUrl={author.imageUrl}
                            name={author.name}
                            role={author.role}
                            social=""/>
                    ))
                    }
                </div>

                <h2 className="border-5 border-b-yellow">WKND Guides</h2>
                <div className="italic text-sm">
                    Meet our extraordinary travel guides. When you travel with a certified WKND guide you gain access to
                    attractions and perspectives not found on the pages of a guide book.
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    {guides.map((guide, i) => (
                        <AvatarCard
                            key={i}
                            imageUrl={guide.imageUrl}
                            name={guide.name}
                            role={guide.role}
                            social=""/>
                    ))}
                </div>
            </div>
        </main>
    );
};
